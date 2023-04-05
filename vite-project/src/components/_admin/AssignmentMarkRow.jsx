import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useEditAssignmentMarkMutation } from '../../features/admin/assignment_mark/assignmentMarkApi';

function AssignmentMarkRow({ assignmentMark }) {
  const [input, setInput] = useState('');

  const { title, mark, createdAt, repo_link, student_name, id } =
    assignmentMark;
  const date = new Date(createdAt);
  const formatStr = 'DD MMM YYYY hh:mm:ss A';

  const assignmentSubmittedDate = moment(date).format(formatStr);

  const [editAssignmentMark, { data, isSuccess }] =
    useEditAssignmentMarkMutation();

  const handleClick = (id) => {
    const parsedMark = parseInt(input);
    if (input !== '') {
      editAssignmentMark({
        id,
        data: { parsedMark },
      });
    } else {
      toast('Mark Required!');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast('mark added successfully!');
    }
  }, [isSuccess]);

  return (
    <tr className="hover:bg-[#0f172a]">
      <td className="table-td">{title}</td>
      <td className="table-td">{assignmentSubmittedDate}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      <td className="table-td input-mark">
        {mark ? (
          <span className="mx-auto">{mark}</span>
        ) : (
          <>
            <input
              type="text"
              max="100"
              defaultValue="0"
              required
              values={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              onClick={() => handleClick(id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </>
        )}
      </td>
      <td>
        <ToastContainer autoClose={500} />
      </td>
    </tr>
  );
}

export default AssignmentMarkRow;
