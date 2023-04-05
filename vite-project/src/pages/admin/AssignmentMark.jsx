import React from 'react';
import AssignmentMarkRow from '../../components/_admin/AssignmentMarkRow';
import AssignmentStatus from '../../components/_admin/AssignmentStatus';
import { useGetAssignmentMarkQuery } from '../../features/admin/assignment_mark/assignmentMarkApi';
import CommonError from '../../ui/CommonError';
import DashLoading from '../../ui/DashLoading';
import setPageTitle from '../../utils/setPageTitle';

function AssignmentMark() {
  setPageTitle('Admin Assignment Mark');

  const {
    data: assignmentMarks,
    isError,
    error,
    isLoading,
  } = useGetAssignmentMarkQuery();

  let content = null;

  if (isLoading) content = <DashLoading />;

  if (!isLoading && isError) content = <CommonError error={error} />;

  if (!isLoading && !isError && assignmentMarks?.length === 0)
    content = <div>No assignment marks found!</div>;

  let pending = [];
  let published = [];

  if (!isLoading && !isError && assignmentMarks?.length > 0)
    content = assignmentMarks.map((assignmentMark) => {
      if (assignmentMark.status === 'pending') {
        pending.push(assignmentMark.status);
      }
      if (assignmentMark.status === 'published') {
        published.push(assignmentMark.status);
      }
      return (
        <AssignmentMarkRow
          key={assignmentMark.id}
          assignmentMark={assignmentMark}
        />
      );
    });

  return (
    <div className="mx-auto max-w-full px-5 lg:px-20">
      <div className="px-3 py-20 bg-opacity-10">
        <AssignmentStatus
          pending={pending}
          published={published}
          length={assignmentMarks?.length}
        />
        <div className="overflow-x-auto mt-4">
          <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
              <tr>
                <th className="table-th">Assignment</th>
                <th className="table-th">Date</th>
                <th className="table-th">Student Name</th>
                <th className="table-th">Repo Link</th>
                <th className="table-th">Mark</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignmentMark;
