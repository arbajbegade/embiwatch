const ReportDetails = ({ reportData, loading }) => {
  return (
    <div className="p-3">
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          {reportData && reportData.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-900 rounded-lg shadow-md">
              <thead>
                <tr>
                  {Object.keys(reportData[0]).map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 border text-left text-gray-700 font-semibold"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {Object.keys(row).map((colKey) => (
                      <td
                        key={colKey}
                        className="px-4 py-2 border text-gray-600"
                      >
                        {row[colKey] !== null ? row[colKey] : "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportDetails;
