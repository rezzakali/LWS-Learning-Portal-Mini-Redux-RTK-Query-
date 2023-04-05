import { useEffect } from 'react';
import { useGetAssignmentMarksQuery } from '../../features/student/assignmentMark/assignmentMarkApi';
import { useGetAllUsersQuizMarkQuery } from '../../features/student/quiz/quizApi';

function TopResult({ user, demoFunc }) {
  const { name, id } = user || {};
  // fetch quiz marks by id
  const { data: quizMarks } = useGetAllUsersQuizMarkQuery(id);

  // fetch assignment marks by id
  const { data: assignmentMarks } = useGetAssignmentMarksQuery({
    studentId: id,
  });

  // find the total assignment marks of logged in user's
  const totalAssignmentMarks = assignmentMarks
    ?.map((assignmentMark) => assignmentMark.mark)
    .reduce((total, mark) => total + mark, 0);

  // find the user's total quiz mark
  const totalQuizMark = quizMarks
    ?.map((qMark) => qMark.mark)
    .reduce((total, mark) => total + mark, 0);

  // total marks
  const totalMark = totalQuizMark + totalAssignmentMarks;

  useEffect(() => {
    demoFunc(id, {
      id,
      name,
      totalQuizMark,
      totalAssignmentMarks,
      totalMark,
    });
  }, [id, totalMark]);

  return null;
}

export default TopResult;
