import React from 'react';

function Error({ error }) {
  return (
    <div className="text-center border border-slate-600/50 py-2 bg-red-800 rounded text-white">
      {error}
    </div>
  );
}

export default Error;
