import React from 'react';

function VideoDescription({ description }) {
  return (
    <p className="mt-4 text-sm text-slate-400 leading-6 border-t border-slate-600/50 pt-4">
      {description}
    </p>
  );
}

export default VideoDescription;
