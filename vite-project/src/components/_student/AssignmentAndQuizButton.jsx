import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetAssignmentQuery,
  useSubmitAssignmentMutation,
} from '../../features/student/assignment/assignmentApi';

import { useFindUserInQuizMarkQuery } from '../../../../../Learning-Portal-Application/vite-project/src/features/student/quiz/quizApi';
import Error from '../../ui/Error';

function AssignmentAndQuizButton({ initialVideo }) {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = initialVideo || {};
  const finalId = params?.id === undefined ? Number(id) : Number(params?.id);

  //   auth user info
  const { user } = useSelector((state) => state.auth);
  const { id: loggedInUserId, name: loggedInUserName } = user || {};

  //   state for assignment
  const [isAssignemnt, setIsAssignment] = useState(false);

  //   for repository (assignment submission local state)
  const [repo, setRepo] = useState('');
  const [error, setError] = useState('');

  // for assignment modal
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

  // local state for participate in quiz or not
  const [isParticipate, setIsParticipate] = useState(false);
  const [participateUserInfo, setParticipateUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // check the user is submitted the quiz or not
  const { data: isParticipateInQuiz, isSuccess: isSuccessFullyFetchQuiz } =
    useFindUserInQuizMarkQuery({
      studentId: loggedInUserId,
      videoId: finalId,
    });

  const {
    student_name,
    video_title,
    totalCorrect,
    totalMark,
    totalQuiz,
    mark,
    totalWrong,
  } = participateUserInfo || {};

  // response from the participate user
  useEffect(() => {
    if (isSuccessFullyFetchQuiz) {
      if (isParticipateInQuiz.length > 0) {
        const participateUser = isParticipateInQuiz[0];
        setParticipateUserInfo(participateUser);
        setIsParticipate(true);
      }
    }
  }, [isSuccessFullyFetchQuiz]);

  //  check if assignmenta available for this video
  const { data: assignment } = useGetAssignmentQuery(finalId);

  const [assignmentVideoTitle, setAssignmentVideoTitle] = useState('');

  //   use effect for assignment submission
  useEffect(() => {
    if (assignment && assignment?.length > 0) {
      setAssignmentVideoTitle(assignment[0]?.title);
      setIsAssignment(true);
    }
  }, [assignment, finalId]);

  // submit the assignment
  const [
    submitAssignment,
    { data: response, isLoading, isError, isSuccess, error: resError },
  ] = useSubmitAssignmentMutation();

  // assignment submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    submitAssignment({
      id: loggedInUserId,
      data: {
        repo_link: repo,
        student_name: loggedInUserName,
        title: assignmentVideoTitle,
      },
    });
  };

  // for assignment modal open/close
  useEffect(() => {
    if (isSuccess) {
      setShowAssignmentModal(false);
    }
    if (isError) {
      setError(resError?.data);
    }
  }, [isError, isSuccess]);

  // for navigate to quiz page
  const handleNavigateToQuizPage = (id) => {
    navigate('/quizzes', {
      state: {
        data: id,
      },
    });
  };

  return (
    <div className="flex gap-4">
      {/* assignment modal start from here */}
      {showAssignmentModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto border border-slate-600/50 rounded">
              {/*content*/}
              <div className="shadow-lg relative flex flex-col w-full  bg-primary outline-none focus:outline-none">
                {/*header*/}
                <div className="flex justify-between p-5 items-start border-solid px-5 bg-primary">
                  <h3 className="text-xl font-semibold">Submit Assignment</h3>
                  <button
                    className="p-1 ml-auto text-white float-right leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowAssignmentModal(false)}
                  >
                    <div className="text-white  h-8 w-8 text-xl border border-slate-500/50 rounded -mt-1 hover:text-red-500 transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                      x
                    </div>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="repository_link" className="text-xl">
                      Repository link
                    </label>
                    <input
                      type="text"
                      name="repository_link"
                      id="repository_link"
                      required
                      className="w-full p-2 mt-2 border border-slate-600/50 bg-transparent rounded-full"
                      placeholder="repository link"
                      value={repo}
                      onChange={(e) => setRepo(e.target.value)}
                    />

                    <button
                      className="rounded bg-primary px-8 py-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-full mt-4 ml-auto active:scale-95 block active:opacity-100"
                      type="submit"
                      disabled={isLoading}
                    >
                      Submit
                    </button>

                    {error !== '' && <Error error={error} />}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* assignment modal end from here */}

      {/* assignment button start from here */}
      {isAssignemnt ? (
        <button
          className="rounded bg-primary px-8 py-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-full"
          onClick={() => setShowAssignmentModal(true)}
        >
          এসাইনমেন্ট
        </button>
      ) : (
        <button
          className="rounded bg-primary px-8 py-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-full"
          // onClick={() => setShowAssignmentModal(true)}
        >
          No Assignment
        </button>
      )}

      {/* assignment button end from here */}

      {/* quiz result modal start*/}
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-primary">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-slate-600/50 rounded-t">
                    <h3 className="text-xl font-semibold">কুইজের ফলাফল</h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto text-lg">
                    <ul>
                      <li className="border-b border-slate-600/50 p-2 hover:bg-[#0f172a]">
                        {' '}
                        <strong>You Obtained : </strong> {mark}
                      </li>
                      <li className="border-b border-slate-600/50 p-2 hover:bg-[#0f172a]">
                        <strong>Video Title : </strong> {video_title}
                      </li>
                      <li className="border-b border-slate-600/50 p-2 hover:bg-[#0f172a]">
                        <strong>Your Name : </strong>
                        {student_name}
                      </li>
                      <li className="border-b border-slate-600/50 p-2 hover:bg-[#0f172a]">
                        {' '}
                        <strong>Total Quiz : </strong> {totalQuiz}
                      </li>
                      <li className="border-b border-slate-600/50 p-2 hover:bg-[#0f172a]">
                        {' '}
                        <strong>Total Marks : </strong> {totalMark}
                      </li>
                      <li className="border-b border-slate-600/50 p-2 hover:bg-[#0f172a]">
                        {' '}
                        <strong>No of correct answers : </strong> {totalCorrect}
                      </li>
                      <li className="border-b border-slate-600/50 p-2 hover:bg-[#0f172a]">
                        <strong>No of wrong answers : </strong> {totalWrong}
                      </li>
                    </ul>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-3 border-t border-slate-600/50">
                    <button
                      className="rounded bg-primary text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-full px-10 py-2 m-3"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
      {/* quiz modal end */}

      {/* quiz result button start from here */}
      {isParticipate ? (
        <button
          className="rounded bg-primary px-8 py-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-full"
          onClick={() => setShowModal(true)}
        >
          কুইজের ফলাফল
        </button>
      ) : (
        <button
          onClick={() => handleNavigateToQuizPage(finalId)}
          className="rounded bg-primary px-8 py-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-full"
        >
          কুইজে অংশগ্রহণ করুন
        </button>
      )}

      {/* quiz result button end from here */}
    </div>
  );
}

export default AssignmentAndQuizButton;
