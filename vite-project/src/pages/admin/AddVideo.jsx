import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useAddVideoMutation,
  useEditVideoMutation,
} from '../../features/admin/videos/videosApi';
import Error from '../../ui/Error';

function AddVideo() {
  const location = useLocation();
  const { data } = location?.state || {};
  const {
    id: idToEdit,
    title: titleToEdit,
    description: descriptionToEdit,
    url: urlToEdit,
    views: viewsToEdit,
    duration: durationToEdit,
  } = data || {};

  const [title, setTitle] = useState(titleToEdit ? titleToEdit : '');
  const [description, setDescription] = useState(
    descriptionToEdit ? descriptionToEdit : ''
  );
  const [url, setUrl] = useState(urlToEdit ? urlToEdit : '');
  const [views, setViews] = useState(viewsToEdit ? viewsToEdit : '');
  const [duration, setDuration] = useState(
    durationToEdit ? durationToEdit : ''
  );
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const [addVideo, { isLoading, isError, error: resError, isSuccess }] =
    useAddVideoMutation();

  const [
    editVideo,
    {
      data: editedData,
      isLoading: editIsLoading,
      isError: editIsError,
      isSuccess: editIsSuccess,
    },
  ] = useEditVideoMutation();

  const handleEdit = (e) => {
    e.preventDefault();
    setError('');
    editVideo({
      id: idToEdit,
      data: { title, description, url, views, duration },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    addVideo({
      title,
      description,
      url,
      views,
      duration,
    });
  };

  useEffect(() => {
    if (isSuccess || editIsSuccess) {
      navigate('/admin/videos');
    }
    if (isError || editIsError) {
      setError(resError?.data);
    }
  }, [isSuccess, isError, editIsError, editIsSuccess]);

  return (
    <div className="m-10">
      <h3 className="text-center text-3xl">
        {' '}
        {idToEdit ? 'Edit Video' : 'Add Video'}
      </h3>
      <form
        className="w-[70%] mx-auto border border-slate-600/50 p-5 my-10"
        onSubmit={idToEdit ? handleEdit : handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 ">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-video-title"
            >
              Video Title
            </label>
            <input
              className="rounded-full appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded"
              id="grid-video-title"
              type="text"
              placeholder="video title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-video-description"
            >
              Video Description
            </label>
            <input
              className="rounded-full appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded"
              id="grid-video-description"
              type="text"
              placeholder="video description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-video-url"
            >
              URL
            </label>
            <input
              className="rounded-full appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded"
              id="grid-video-url"
              type="text"
              placeholder="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-video-views"
            >
              Views
            </label>

            <input
              className="rounded-full appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded"
              id="grid-video-views"
              type="text"
              placeholder="views"
              required
              value={views}
              onChange={(e) => setViews(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-video-duration"
            >
              Duration
            </label>

            <input
              className="rounded-full appearance-none block w-full bg-gray-200 text-white  border-gray-200  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 p-2 mt-2 border border-slate-600/50 bg-transparent rounded"
              id="grid-video-duration"
              type="text"
              placeholder="duration"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-auto ml-auto rounded bg-primary px-8 py-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-full text-white mb-3"
          disabled={isLoading || editIsLoading}
        >
          Submit
        </button>
        {error !== '' && <Error error={error} />}
      </form>
    </div>
  );
}

export default AddVideo;
