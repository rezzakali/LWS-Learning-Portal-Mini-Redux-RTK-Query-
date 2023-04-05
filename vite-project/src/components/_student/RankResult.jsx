import React from 'react';

function RankResult({ user, rank }) {
  const { name, totalAssignmentMarks, totalMark, totalQuizMark } = user || {};

  return (
    <tr className="border-b border-slate-600/50 hover:bg-[#0f172a]">
      <td className="table-td text-center">{rank === 1 ? '🏆' : rank}</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">{totalQuizMark}</td>
      <td className="table-td text-center">{totalAssignmentMarks}</td>
      <td className="table-td text-center">{totalMark.toString()}</td>
    </tr>
  );
}

export default RankResult;
