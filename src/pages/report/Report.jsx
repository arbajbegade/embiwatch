import React, { useState } from 'react'
import Navbar from '../../component/navbar/Navbar'
import ReportDetails from './ReportDetails'
import apiFetch from '../../services/apiFetch';
import { FaSearch, FaFileExcel, FaFileDownload } from "react-icons/fa";
import toast from 'react-hot-toast';

function Report() {
    const today = new Date().toISOString().split("T")[0];
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);

        apiFetch(`/reports?from_date=${fromDate}&to_date=${toDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setReportData(data.data);
            })
            .catch((error) => {
                console.error("Report fetch error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDownloadCSV = () => {
        if (!reportData || reportData.length === 0) {
            alert("No data to download");
            return;
        }

        // Convert JSON to CSV manually
        const headers = Object.keys(reportData[0]).join(","); // First row
        const rows = reportData.map(obj => Object.values(obj).join(","));
        const csvContent = [headers, ...rows].join("\n");

        // Create Blob and download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `reports_${fromDate}_to_${toDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Download completed successfully!');
    };

    return (
        <div>
            <Navbar />
            <div className="">
                <div className="p-6 w-full flex justify-center">
                    <div className="flex gap-4">
                        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-white border border-gray-300 rounded p-2 w-xs" />
                        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-white border border-gray-300 rounded p-2 w-xs" />

                        <button onClick={handleSubmit} disabled={loading} className="btn">
                            <FaSearch />
                            {loading ? "Loading..." : "Get Reports"}
                        </button>
                        <button onClick={handleDownloadCSV} disabled={loading || !reportData || reportData.length === 0} className="btn">
                            {(loading || !reportData || reportData.length === 0) ? (
                                <FaFileExcel />
                            ) : (
                                <FaFileDownload />)}
                            Download Excel
                        </button>

                    </div>
                </div>
            </div>
            <ReportDetails reportData={reportData} loading={loading} />
        </div>
    )
}

export default Report