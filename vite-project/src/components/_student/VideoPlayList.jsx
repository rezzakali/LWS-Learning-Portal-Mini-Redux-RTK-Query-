import React from 'react';
import { Link } from 'react-router-dom';
import { useGetVideosQuery } from '../../features/student/videos/videosApi';

function VideoPlayList() {
  const {
    data: videos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVideosQuery();
  let content = null;
  if (!isLoading && !isError && videos?.length > 0)
    content = videos?.map((video) => (
      <div
        className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2"
        key={video.id}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 stroke-cyan-500 stroke-1 hover:stroke-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
          />
        </svg>
        <div clas="flex flex-col w-full">
          <Link to={`/courseplayer/video/${video.id}`}>
            <p className="text-slate-50 text-sm font-medium">{video.title}</p>
          </Link>
          <div>
            <span className="text-gray-400 text-xs mt-1">34.5 Mins</span>
            <span className="text-gray-400 text-xs mt-1"> | </span>
            <span className="text-gray-400 text-xs mt-1">241K views</span>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}

export default VideoPlayList;
