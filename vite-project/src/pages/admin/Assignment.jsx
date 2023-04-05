import React from 'react';
import { useNavigate } from 'react-router-dom';
import AssignmentRow from '../../components/_admin/AssignmentRow';
import { useGetAssignmentsQuery } from '../../features/admin/assignment/assignmentApi';
import CommonError from '../../ui/CommonError';
import DashLoading from '../../ui/DashLoading';
import setPageTitle from '../../utils/setPageTitle';

function Assignment() {
  setPageTitle('Admin Assignment');
  const navigate = useNavigate();

  const {
    data: assignments,
    isError,
    error,
    isLoading,
  } = useGetAssignmentsQuery();

  let content = null;

  if (isLoading) content = <DashLoading />;

  if (!isLoading && isError) content = <CommonError error={error} />;

  if (!isLoading && !isError && assignments?.length === 0)
    content = <div>No assignments found!</div>;

  if (!isLoading && !isError && assignments?.length > 0)
    content = assignments.map((assignment) => (
      <AssignmentRow key={assignment.id} assignment={assignment} />
    ));

  const handleVideoAdd = () => {
    navigate('/admin/add_assignment');
  };

  return (
    <div className="mx-auto max-w-full px-5 lg:px-20">
      <div className="px-3 py-20 bg-opacity-10">
        <div className="w-full flex">
          <button
            className="rounded bg-primary px-8 py-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative w-auto ml-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white mb-3"
            onClick={handleVideoAdd}
          >
            Add Assignment
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="divide-y-1 text-base divide-gray-600 w-full">
            {assignments?.length > 0 && (
              <thead>
                <tr>
                  <th className="table-th">Title</th>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Mark</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>
            )}

            <tbody className="divide-y divide-slate-600/50">{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Assignment;
