import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuizRow from '../../components/_admin/QuizRow';
import { useGetQuizzesQuery } from '../../features/admin/quiz/quizApi';
import CommonError from '../../ui/CommonError';
import DashLoading from '../../ui/DashLoading';
import setPageTitle from '../../utils/setPageTitle';

function Quizzes() {
  setPageTitle('Admin Quizzes');
  const navigate = useNavigate();

  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

  let content = null;

  if (isLoading) content = <DashLoading />;

  if (!isLoading && isError) content = <CommonError error={error} />;

  if (!isLoading && !isError && quizzes?.length === 0)
    content = <div>No quiz found!</div>;

  if (!isLoading && !isError && quizzes?.length > 0)
    content = quizzes.map((quiz) => <QuizRow key={quiz.id} quiz={quiz} />);

  const handleQuizAdd = () => {
    navigate('/admin/addquiz');
  };

  return (
    <div className="mx-auto max-w-full px-5 lg:px-20">
      <div className="px-3 py-20 bg-opacity-10">
        <div className="w-full flex">
          <button
            className="rounded bg-primary text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative w-auto ml-auto flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-full text-white mb-3"
            onClick={handleQuizAdd}
          >
            Add Quiz
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
              <tr>
                <th className="table-th">Question</th>
                <th className="table-th">Video</th>
                <th className="table-th justify-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Quizzes;
