import React from 'react';

function CommonError({ error }) {
  return (
    <tr>
      <td>
        <div className="text-center">{error}</div>
      </td>
    </tr>
  );
}

export default CommonError;
