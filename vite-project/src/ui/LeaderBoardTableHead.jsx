import React from 'react';

function LeaderBoardTableHead() {
  return (
    <thead className="border border-slate-600/50">
      <tr>
        <th className="table-th !text-center">Rank</th>
        <th className="table-th !text-center">Name</th>
        <th className="table-th !text-center">Quiz Mark</th>
        <th className="table-th !text-center">Assignment Mark</th>
        <th className="table-th !text-center">Total</th>
      </tr>
    </thead>
  );
}

export default LeaderBoardTableHead;
