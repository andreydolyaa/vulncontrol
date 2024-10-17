import React from "react";

export const ScansTable = ({ scans }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Target</th>
          <th>Scan Type</th>
          <th>Duration</th>
          <th>Open Ports</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {scans.map((scan) => {
          return <tr key={scan._id}>
            <td></td>
          </tr>;
        })}
      </tbody>
    </table>
  );
};
