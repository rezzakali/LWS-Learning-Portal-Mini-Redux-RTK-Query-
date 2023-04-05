import React from 'react';

function AssignmentStatus({ pending, published, length }) {
  return (
    <ul className="assignment-status">
      <li className="rounded bg-primary text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative w-auto flex justify-center py-1 px-8 border border-transparent text-sm font-medium rounded-full text-white mb-3">
        Total{' '}
        <span className="w-auto h-4 w-4 mx-auto items-center justify-center flex">
          {length}
        </span>
      </li>
      <li className="rounded bg-primary text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative w-auto  flex justify-center py-1 px-8 border border-transparent text-sm font-medium rounded-full text-white mb-3">
        Pending{' '}
        <span className="w-auto h-4 w-4 mx-auto items-center justify-center flex">
          {pending?.length}
        </span>
      </li>
      <li className="rounded bg-primary text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative w-auto flex justify-center py-1 px-8 border border-transparent text-sm font-medium rounded-full text-white mb-3">
        Mark Sent{' '}
        <span className="w-auto h-4 w-4 mx-auto items-center justify-center flex">
          {published?.length}
        </span>
      </li>
    </ul>
  );
}

export default AssignmentStatus;
