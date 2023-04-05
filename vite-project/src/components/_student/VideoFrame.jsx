import React from 'react';

function VideoFrame({ singleVideo, initialVideo }) {
  return (
    <iframe
      width="100%"
      className="aspect-video border border-slate-600/50"
      src={singleVideo ? singleVideo.url : initialVideo?.url}
      title={singleVideo ? singleVideo.title : initialVideo?.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

export default VideoFrame;
