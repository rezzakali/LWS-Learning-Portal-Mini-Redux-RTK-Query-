import React from 'react';
import { useParams } from 'react-router-dom';
import AssignmentAndQuizButton from '../../components/_student/AssignmentAndQuizButton';
import VideoDescription from '../../components/_student/VideoDescription';
import VideoFrame from '../../components/_student/VideoFrame';
import VideoPlayList from '../../components/_student/VideoPlayList';
import VideoPublishdedInfo from '../../components/_student/VideoPublishdedInfo';
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from '../../features/student/videos/videosApi';

function CoursePlayer() {
  const params = useParams();

  // fetch videos
  const {
    data: videos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVideosQuery();

  // initialize the first video when user redirect to course player page after logging
  let initialVideo = null;
  if (!isLoading && !isError && videos?.length > 0) initialVideo = videos[0];

  // fetch single video by using params id
  const { data: singleVideo } = useGetVideoQuery(params?.id);

  return (
    <section className="py-6 bg-primary mt-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <VideoFrame singleVideo={singleVideo} initialVideo={initialVideo} />
            <div>
              {/* video published info component start from here */}
              <VideoPublishdedInfo
                title={singleVideo ? singleVideo.title : initialVideo?.title}
                date={
                  singleVideo ? singleVideo.createdAt : initialVideo?.createdAt
                }
              />
              {/* video published info component end from here */}

              <AssignmentAndQuizButton initialVideo={initialVideo} />

              <VideoDescription
                description={
                  singleVideo
                    ? singleVideo.description
                    : initialVideo?.description
                }
              />
            </div>
          </div>
          <div className="rounded bg-primary font-medium text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] col-span-full lg:col-auto max-h-[530px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30 h-auto">
            <VideoPlayList />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoursePlayer;
