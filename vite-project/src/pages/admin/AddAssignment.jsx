import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentsQuery,
} from '../../features/admin/assignment/assignmentApi';
import { useGetVideosQuery } from '../../features/admin/videos/videosApi';
import CommonError from '../../ui/CommonError';
import setPageTitle from '../../utils/setPageTitle';

function AddAssignment() {
  setPageTitle('Add Assignment');
  const location = useLocation();

  const {
    id: editToId,
    title: titleToEdit,
    video_title: video_title_to_edit,
    totalMark: totalMarkToEdit,
    video_id: video_id_to_edit,
  } = location?.state?.data || {};

  const { data: videos } = useGetVideosQuery();

  const videoToEdit = videos?.find((v) => v.id === video_id_to_edit);
  const videoToEditTitle = videoToEdit?.title;

  const [title, setTitle] = useState(titleToEdit ? titleToEdit : '');
  const [videoTitle, setVideoTitle] = useState(
    video_title_to_edit ? video_title_to_edit : ''
  );
  const [total, setTotal] = useState(totalMarkToEdit ? totalMarkToEdit : '');
  const [relatedVideo, setRelatedVideo] = useState(
    videoToEditTitle ? videoToEditTitle : ''
  );
  const [error, setError] = useState('');

  const { data: assignments } = useGetAssignmentsQuery();

  const [addAssignment, { isSuccess, isError, isLoading, error: resError }] =
    useAddAssignmentMutation();

  const [
    editAssignment,
    { isSuccess: isEditSuccess, isError: isEditError, error: resEditError },
  ] = useEditAssignmentMutation();

  const navigate = useNavigate();

  const assignmentLength = assignments?.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = videos.find((v) => v.title === relatedVideo);

    const videoId = result?.id;

    addAssignment({
      title,
      videoTitle,
      total: Number(total),
      videoId,
      length: assignmentLength,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setError('');
    const result = videos.find((v) => v.title === relatedVideo);

    const videoId = result?.id;

    editAssignment({
      id: editToId,
      data: {
        title,
        videoTitle,
        total,
        videoId,
      },
    });
  };

  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      navigate('/admin/assignment');
    }
    if (isError || isEditError) {
      setError(resError?.data);
    }
  }, [isSuccess, isError, isEditSuccess, isEditError]);

  return (
    <div className="m-8">
      <h3 className="text-center text-3xl mt-4">
        {location?.state?.data?.id ? 'Edit Assignment' : 'Add Assignment'}
      </h3>
      <form
        className="w-[70%] mx-auto border border-slate-600/50 p-5 my-10"
        onSubmit={location?.state?.data?.id ? handleEdit : handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-first-assignment-title"
            >
              Assignment Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded-full"
              id="grid-first-assignment-title"
              type="text"
              placeholder="assignment title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-video-title"
            >
              Video Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded-full"
              id="grid-video-title"
              type="text"
              placeholder="video title"
              required
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-total-mark"
            >
              Total Mark
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded-full"
              id="grid-city"
              type="number"
              placeholder="total mark"
              required
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-related-video"
            >
              Related Video
            </label>
            <div className="relative">
              <select
                className="bg-transparent text-gray-200 rounded block w-full p-2.5 dark:bg-[#080e1b] border border-slate-600/50 rounded-full"
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
        </div>
        <button
          className="rounded bg-primary text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative w-auto ml-auto flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-full text-white mb-3"
          disabled={isLoading}
        >
          Submit
        </button>
        {error !== '' && <CommonError error={error} />}
      </form>
    </div>
  );
}

export default AddAssignment;
