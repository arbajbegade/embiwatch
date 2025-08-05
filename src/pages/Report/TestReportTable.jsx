import React from "react";

const TestReportTable = ({ data }) => {
  // Extract keys from the first data entry
  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  // Function to format header text to all uppercase
  const formatHeaderText = (header) => {
    // Replace underscores with spaces and convert to uppercase
    return header.replace(/_/g, " ").toUpperCase();
  };

  return (
    <div className="w-full p-10 mt-4">
      <table className="min-w-full border divide-y divide-gray-200">
        <thead className="bg-blue-500 text-black">
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="border px-6 py-3 text-left text-sm font-semibold"
              >
                {formatHeaderText(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr
              key={index}
              className={`${
                entry.result === 'PASS' ? "bg-green-700" : "bg-red-700"
              } hover:bg-blue-100 cursor-pointer transition-colors duration-300`}
            >
            {tableHeaders.map((header, headerIndex) => (
              <td key={headerIndex} className="border px-6 py-4">
                {entry[header]}
              </td>
            ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestReportTable;
