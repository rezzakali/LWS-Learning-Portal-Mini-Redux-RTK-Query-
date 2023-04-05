import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useAddQuizMutation,
  useEditQuizMutation,
} from '../../features/admin/quiz/quizApi';
import { useGetVideosQuery } from '../../features/admin/videos/videosApi';
import CommonError from '../../ui/CommonError';
import setPageTitle from '../../utils/setPageTitle';

function AddQuiz() {
  setPageTitle('Admin Add Quiz');

  const location = useLocation();
  const { data } = location?.state || {};
  const {
    id: id_to_edit,
    question: questionToEdit,
    video_title: video_title_to_edit,
    video_id: video_id_to_edit,
    options: options_to_edit,
  } = data || {};

  const { data: videos } = useGetVideosQuery();

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [question, setQuestion] = useState(
    questionToEdit ? questionToEdit : ''
  );

  const [relatedVideo, setRelatedVideo] = useState(
    video_title_to_edit ? video_title_to_edit : ''
  );

  let res1 = null;
  let res2 = null;
  let res3 = null;
  let res4 = null;

  let sOption1 = null;
  let sOption2 = null;
  let sOption3 = null;
  let sOption4 = null;

  options_to_edit?.map((o) => {
    if (o.id === 1) {
      res1 = o.option;
      sOption1 = o.isCorrect;
    }
    if (o.id === 2) {
      res2 = o.option;
      sOption2 = o.isCorrect;
    }
    if (o.id === 3) {
      res3 = o.option;
      sOption3 = o.isCorrect;
    }
    if (o.id === 4) {
      res4 = o.option;
      sOption4 = o.isCorrect;
    }
  });

  const [option1, setOption1] = useState(res1 ? res1 : '');
  const [option2, setOption2] = useState(res2 ? res2 : '');
  const [option3, setOption3] = useState(res3 ? res3 : '');
  const [option4, setOption4] = useState(res4 ? res4 : '');

  const [selectedOption1, setSelectedOption1] = useState(
    sOption1 ? sOption1 : false
  );
  const [selectedOption2, setSelectedOption2] = useState(
    sOption2 ? sOption2 : false
  );
  const [selectedOption3, setSelectedOption3] = useState(
    sOption3 ? sOption3 : false
  );
  const [selectedOption4, setSelectedOption4] = useState(
    sOption4 ? sOption4 : false
  );

  const [addQuiz, { isLoading, isError, error: resError, isSuccess }] =
    useAddQuizMutation();

  const [
    editQuiz,
    {
      data: editedData,
      isLoading: isEditLoading,
      isError: isEditError,
      error: EditResError,
      isSuccess: isEditSuccess,
    },
  ] = useEditQuizMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = videos?.find((v) => v.title === relatedVideo);
    const findRelatedVideoId = result?.id;

    addQuiz({
      question,
      findRelatedVideoId,
      relatedVideo,
      options: [
        {
          option1,
          isCorrect: selectedOption1,
        },
        {
          option2,
          isCorrect: selectedOption2,
        },
        {
          option3,
          isCorrect: selectedOption3,
        },
        {
          option4,
          isCorrect: selectedOption4,
        },
      ],
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setError('');
    const result = videos?.find((v) => v.title === relatedVideo);
    const findRelatedVideoId = result?.id;

    editQuiz({
      id: id_to_edit,
      data: {
        question,
        findRelatedVideoId,
        relatedVideo,
        options: [
          {
            option1,
            isCorrect: selectedOption1,
          },
          {
            option2,
            isCorrect: selectedOption2,
          },
          {
            option3,
            isCorrect: selectedOption3,
          },
          {
            option4,
            isCorrect: selectedOption4,
          },
        ],
      },
    });
  };

  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      navigate('/admin/quizzes');
    }
    if (isError || isEditError) {
      setError(resError?.data || EditResError?.data);
    }
  }, [isSuccess, isError, isEditError, isEditSuccess]);

  return (
    <div className="m-5">
      <h3 className="text-center text-3xl mt-6">
        {id_to_edit ? 'Edit Quiz' : 'Add Quiz'}
      </h3>
      <form
        className="w-[70%] mx-auto border border-slate-600/50 p-5 my-10"
        onSubmit={id_to_edit ? handleEdit : handleSubmit}
      >
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
              htmlFor="grid-quiz-question"
            >
              Question
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded-full"
              id="grid-first-name"
              type="text"
              placeholder="Enter the question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        </div>
        <div className="flex mx-3">
          <div className="px-3 w-1/2">
            <label
              htmlFor="option1"
              className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            >
              Option 1:
            </label>
            <input
              type="text"
              id="option1"
              name="option1"
              className="appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded-full"
              placeholder="Option 1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
            <label htmlFor="option1"> isCorrect : </label>
            <input
              type="checkbox"
              id="option1"
              name="checkbox"
              value={selectedOption1}
              checked={selectedOption1}
              onChange={() => setSelectedOption1(!selectedOption1)}
            />
          </div>
          <div className="px-3 w-1/2">
            <label
              htmlFor="option2"
              className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            >
              Option 2:
            </label>
            <input
              type="text"
              id="option2"
              name="option2"
              className="appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded-full"
              placeholder="Option 2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
            <label htmlFor="option2"> isCorrect : </label>
            <input
              type="checkbox"
              id="option2"
              name="checkbox"
              value={selectedOption2}
              checked={selectedOption2}
              onChange={() => setSelectedOption2(!selectedOption2)}
            />
          </div>
        </div>
        <br />
        <div className="flex mx-3">
          <div className="px-3 w-1/2">
            <label
              htmlFor="option3"
              className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            >
              Option 3:
            </label>
            <input
              type="text"
              id="option3"
              name="option3"
              className="appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded-full"
              placeholder="Option 3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />
            <label htmlFor="option3"> isCorrect : </label>
            <input
              type="checkbox"
              id="option3"
              name="checkbox"
              value={selectedOption3}
              checked={selectedOption3}
              onChange={() => setSelectedOption3(!selectedOption3)}
            />
          </div>
          <div className="px-3 w-1/2">
            <label
              htmlFor="option4"
              className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            >
              Option 4:
            </label>
            <input
              type="text"
              id="option4"
              name="option4"
              className="appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded-full"
              placeholder="Option 4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
            />
            <label htmlFor="option4"> isCorrect : </label>
            <input
              type="checkbox"
              id="option4"
              name="checkbox"
              value={selectedOption4}
              checked={selectedOption4}
              onChange={() => setSelectedOption4(!selectedOption4)}
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6 mt-6">
          <label
            className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
            htmlFor="grid-related-video"
          >
            Related Video
          </label>
          <div className="relative">
            <select
              className="bg-transparent text-gray-500 block w-full p-3  border border-slate-600/50 rounded-full"
              id="grid-related-video"
              value={relatedVideo}
              onChange={(e) => setRelatedVideo(e.target.value)}
            >
              <option value="" hidden defaultValue>
                Select related video
              </option>
              {videos?.map((v) => (
                <option key={v.id}>{v.title}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="rounded bg-primary text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative w-auto ml-auto flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-full text-white mb-3"
          disabled={isLoading || isEditLoading}
        >
          {id_to_edit ? 'Save Changes' : 'Create Quiz'}
        </button>
        {error !== '' && <CommonError error={error} />}
      </form>
    </div>
  );
}

export default AddQuiz;
