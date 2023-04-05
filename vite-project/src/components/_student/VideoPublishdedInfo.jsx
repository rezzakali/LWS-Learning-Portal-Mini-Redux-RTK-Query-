import moment from 'moment';
import React from 'react';

function VideoPublishdedInfo({ title, date }) {
  const uploadedDate = moment(date).format('D MMMM YYYY');

  return (
    <>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        {uploadedDate}
      </h2>
    </>
  );
}

export default VideoPublishdedInfo;
