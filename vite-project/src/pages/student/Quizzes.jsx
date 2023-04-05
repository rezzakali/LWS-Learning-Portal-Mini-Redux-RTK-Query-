import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizForm from '../../components/_student/QuizForm';
import {
  useGetQuizQuery,
  useSubmitQuizMutation,
} from '../../features/student/quiz/quizApi';
import { useGetVideoQuery } from '../../features/student/videos/videosApi';
import CommonError from '../../ui/CommonError';
import setPageTitle from '../../utils/setPageTitle';

function Quizzes() {
  setPageTitle('Quizzes');
  const location = useLocation();
  const { data: id } = location.state;
  const { myArr } = useSelector((state) => state.quiz);
  const [error, setError] = useState('');

  console.log(location);

  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { name: loggedInUserName, id: loggedInUserId } = loggedInUser || {};

  const { data: singleVideo } = useGetVideoQuery(id);
  // console.log(singleVideo);

  const [submitQuiz, { data, isError, isLoading, isSuccess, error: resError }] =
    useSubmitQuizMutation();

  const navigate = useNavigate();

  // submit the quiz
  const handleQuizSubmit = () => {
    setError('');
    // total quiz (quiz length)
    const totalQuiz = myArr?.length;

    // total quiz mark that user obtained
    let totalMark = 0;

    // length of true quiz mark
    let totalCorrectedQuiz = 0;

    if (myArr.length > 0) {
      const trueValues = myArr.filter((obj) =>
        Object.values(obj).includes(true)
      );
      const lengthOfTrueValues = trueValues.length;
      totalCorrectedQuiz = lengthOfTrueValues;

      totalMark = lengthOfTrueValues * 5;
    }

    // for false quiz
    let totalFalseQuiz = 0;

    if (myArr.length > 0) {
      const falseValues = myArr.filter((obj) =>
        Object.values(obj).includes(false)
      );
      const lengthOfFalseValues = falseValues.length;
      totalFalseQuiz = lengthOfFalseValues;
    }

    // total quiz mark
    let totalQuizMark = 0;
    if (myArr.length > 0) {
      const quizLength = myArr.length;
      totalQuizMark = quizLength * 5;
    }

    // finally submit the quiz to the endpoint
    submitQuiz({
      id: loggedInUserId,
      name: loggedInUserName,
      videoId: singleVideo?.id,
      videoTitle: singleVideo?.title,
      totalQuiz: totalQuiz,
      totalCorrect: totalCorrectedQuiz,
      totalWrong: totalFalseQuiz,
      totalMark: totalQuizMark,
      mark: totalMark,
    });
  };

  // catch the response after the quiz submission
  useEffect(() => {
    if (isSuccess) {
      navigate('/leaderboard');
    }
    if (isError) {
      setError(resError?.data);
    }
  }, [isSuccess, isError]);

  const { data: quizzes } = useGetQuizQuery(id);

  const content = quizzes?.map((quiz, index) => (
    <QuizForm key={quiz.id} quiz={quiz} index={index + 1} />
  ));

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0 mt-20">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            {quizzes?.length && quizzes[0].video_title}
          </h1>

          <p className="text-sm text-slate-200">
            Each question contains 5 Mark
          </p>
          {error !== '' && <CommonError error={error} />}
        </div>
        <div className="space-y-8 ">{content}</div>

        <button
          className="rounded bg-primary px-8 py-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative ml-auto mt-4 w-auto flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-full text-white mb-3"
          onClick={handleQuizSubmit}
          disabled={isLoading}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default Quizzes;
