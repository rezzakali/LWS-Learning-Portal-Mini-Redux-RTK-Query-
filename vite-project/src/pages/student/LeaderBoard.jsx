import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RankResult from '../../components/_student/RankResult';
import TopResult from '../../components/_student/TopResult';
import { useGetAssignmentMarksQuery } from '../../features/student/assignmentMark/assignmentMarkApi';
import { useGetLoggedInUserQuizMarkQuery } from '../../features/student/quiz/quizApi';
import { useGetUsersQuery } from '../../features/student/users/usersApi';
import LeaderBoardTableHead from '../../ui/LeaderBoardTableHead';
import setPageTitle from '../../utils/setPageTitle';

function LeaderBoard() {
  setPageTitle('Leaderboard');
  const [allUser, setAllUser] = useState([]);
  // logged in user
  const { user: loggedInUser } = useSelector((state) => state.auth);

  // fetch users based on role
  const { data: allUsers } = useGetUsersQuery({ role: 'student' });

  // find the logged in user in allUsers
  const findUser = allUsers?.find((user) => user.id === loggedInUser?.id);

  // destructure properties
  const { name, id } = findUser || {};

  // api request to the quizMark endpoint by using findUser id
  const { data: userQuizMark } = useGetLoggedInUserQuizMarkQuery({
    studentId: id,
  });

  // find the logged in user's total quiz mark
  const totalQuizMark = userQuizMark
    ?.map((quizMark) => quizMark.mark)
    .reduce((total, mark) => total + mark, 0);

  // api request to the assignment mark endpoint
  const { data: assignmentMarks } = useGetAssignmentMarksQuery({
    studentId: id,
  });

  // find the total assignment marks of logged in user's
  const totalAssignmentMarks = assignmentMarks
    ?.map((assignmentMark) => assignmentMark.mark)
    .reduce((total, mark) => total + mark, 0);

  // total marks
  const totalMark = totalQuizMark + totalAssignmentMarks;

  function demoFunc(id, getData) {
    setAllUser((previousData) => {
      const previousDataArray = [...previousData];
      const index = previousDataArray.findIndex(
        (prevData) => prevData.id === id
      );

      if (index !== -1) {
        previousDataArray[index] = getData;
      } else {
        previousDataArray.push(getData);
      }

      return previousDataArray;
    });
  }

  // sort the users based on their totalMark
  const sortedUsers = allUser?.sort((a, b) => b.totalMark - a.totalMark);

  // assign a rank to each user based on their totalMark
  let rank = 1;
  sortedUsers.forEach((user, index) => {
    if (index > 0 && user.totalMark !== sortedUsers[index - 1].totalMark) {
      rank++;
    }
    user.rank = rank;
  });

  // find the logged in user in sorted user
  const findLoggedInUserInSortedUser = sortedUsers?.find(
    (user) => user.name === loggedInUser?.name
  );
  const { rank: loggedInUserRank } = findLoggedInUserInSortedUser || {};

  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mt-16">
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <LeaderBoardTableHead />
              {/* logged in user position */}
              {loggedInUser && (
                <tbody>
                  <tr className="border-2 border-cyan hover:bg-[#0f172a]">
                    <td className="table-td text-center font-bold">
                      {loggedInUserRank === 1 ? '🏆' : loggedInUserRank}
                    </td>
                    <td className="table-td text-center font-bold">{name}</td>
                    <td className="table-td text-center font-bold">
                      {totalQuizMark !== '' ? totalQuizMark : 0}
                    </td>
                    <td className="table-td text-center font-bold">
                      {totalAssignmentMarks !== '' ? totalAssignmentMarks : 0}
                    </td>
                    <td className="table-td text-center font-bold">
                      {totalMark.toString()}
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <LeaderBoardTableHead />
              {/* others position */}
              <tbody>
                {allUsers?.map((user) => (
                  <TopResult key={user.id} user={user} demoFunc={demoFunc} />
                ))}

                {sortedUsers?.splice(0, 20)?.map((user, index) => (
                  <RankResult key={index} user={user} rank={user.rank} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default LeaderBoard;
