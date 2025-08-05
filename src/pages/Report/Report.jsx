import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AppBar from "../../components/AppBar";
import { theme } from "../../theme/colors";
import { useSocketContext } from '../../contexts/SocketContext';
import { useDeviceStatus } from '../../hooks/useDeviceStatus';
import { formatFullDate } from "../../utils/formatFullDate";

import TestReportTable from "./TestReportTable";
function Report() {
  const { socket } = useSocketContext();
  const [fromDate, setFromDate] = useState(getTodayDate());
  const [toDate, setToDate] = useState(getTodayDate());
  const [report, setReport] = useState([]);
  const { deviceStatus } = useDeviceStatus();
  // Effect to manage socket listeners for fetching reports and batches

  const shift = '';
  const dateString = formatFullDate(new Date().toLocaleDateString());
  useEffect(() => {
    const handleGetReport = (data) => {
      console.log("Received details getreport:", JSON.parse(data));
      setReport(JSON.parse(data));
    };   

    const handleGetResultReport = (data) => {
      const parsedData = JSON.parse(data);
      console.log("Received details getresultreport:", parsedData);
      saveCSV(parsedData, fromDate, toDate); // Call the CSV saving function
    };

    socket.on("getreport", handleGetReport);
    socket.on("getresultreport", handleGetResultReport);

    // Cleanup function to remove socket listeners
    return () => {
      socket.off("getreport", handleGetReport);
      socket.off("getresultreport", handleGetResultReport);
    };
  }, [fromDate, toDate]); // Empty dependency array ensures this runs only once

  const handleFromDateChange = (event) => {
    console.log(event.target.value);
    setFromDate(event.target.value);
    console.log(fromDate);
  };

  const handleToDateChange = (event) => {
    console.log(event.target.value);
    setToDate(event.target.value);
  };
    
  

  const handleSubmit = () => {
    console.log({ from_date: fromDate, to_date: toDate });
    console.log(socket);
    socket.emit(
      "getreport",
      JSON.stringify({
        request: "getreport",
        data: { from_date: fromDate, to_date: toDate },
      })
    );
  };

   const saveReportAsCSV = () => {
    console.log('saveReportAsCSV');
    
    socket.emit(
      "getresultreport",
      JSON.stringify({
        request: "getresultreport",
        data: { from_date: fromDate, to_date: toDate },
      })
    );
  };

  const saveCSV = (data, from, to) => {
    // Create CSV content
    console.log('savecsv');
    console.log('From:',from);
    console.log('To:',to);
    const csvRows = [];
    // Get headers from the data
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(",")); // Add headers

    // Add data rows
    for (const row of data) {
      // csvRows.push(headers.map((header) => row[header]).join(",")); // Add each row
      csvRows.push(headers.map((header) => `"${String(row[header]).replace(/"/g, '""')}"`).join(","));

    }

    // Create a blob from the CSV content
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link to download the CSV file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report_${fromDate}_${toDate}.csv`); // Set file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  

  return (
    <div className={`min-h-screen ${theme.text} ${theme.background}`}>
      <AppBar shift={shift} dateString={dateString} deviceStatus={deviceStatus}/>
      <div className="flex flex-row items-center gap-1 justify-around">
        {/* <div className="mt-6 flex items-center px-8 text-black font-semibold space-x-6 w-full"> */}
          <label htmlFor="fromDate" className="text-white">
            From Date:
          </label>
          <input
            id="fromDate"
            className="input appearance-none text-white ${theme.background} border border-gray-300 rounded-md p-2 w-32 focus:outline-none focus:border-blue-300"
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
          />

          <label htmlFor="toDate" className="text-white">
            To Date:
          </label>
          <input
            id="toDate"
            className="input appearance-none ${theme.background} border border-gray-300 rounded-md p-2 w-32 focus:outline-none focus:border-blue-300"
            type="date"
            value={toDate}
            onChange={handleToDateChange}
          />

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        

        
          <Button variant="contained" color="primary" onClick={saveReportAsCSV}>
            Save Report
          </Button>
        
        {/* </div>      */}
      </div>
      <TestReportTable data={report} />
    </div>
  );


// Helper function to get today's date in "YYYY-MM-DD" format
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
}

export default Report;
