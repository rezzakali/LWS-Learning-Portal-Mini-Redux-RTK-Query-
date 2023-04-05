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
          <VideoPlayList />
        </div>
      </div>
    </section>
  );
}

export default CoursePlayer;
