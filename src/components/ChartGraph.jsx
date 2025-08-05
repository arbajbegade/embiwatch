import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useSocketContext } from '../contexts/SocketContext';

export default function ChartGraph({ heightval, widthval }) {
  const { socket, isConnected } = useSocketContext();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const dataRef = useRef([]);

  const [graphsettings, setGraphsettings] = useState({
    x_axis: "displacement",
    y_axis: "load",
    min: 0,
    max: 2000,
    x_resolution: 10,
    y_resolution: 100,
  });


  /** Fetch graph settings on mount */
  useEffect(() => {
    socket.emit("getgraphsettings", JSON.stringify({ request: "getgraphsettings" }));

    const handleGraphSettings = (data) => {
      try {
        const parsedData = JSON.parse(data);
        console.log("Received graph settings:", parsedData);
        setGraphsettings((prev) => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error("Error parsing graph settings:", error);
      }
    };

    socket.on("getgraphsettings", handleGraphSettings);
    return () => socket.off("getgraphsettings", handleGraphSettings);
  }, []);

  /** Initialize the chart */
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous chart before reinitializing
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: graphsettings.y_axis,
            data: [],
            borderColor: "blue",
            borderWidth: 2,
            backgroundColor: "transparent",
            pointRadius: 2,
          },
          {
            label: 'min',
            data: [],
            borderColor: "green",
            borderWidth: 2,
            backgroundColor: "transparent",
            pointRadius: 2,           
            borderDash: [5, 5],
            pointRadius: 0,
            pointHoverRadius: 0,
          },
          {
            label: 'max',
            data: [],
            borderColor: "green",
            borderWidth: 2,
            backgroundColor: "transparent",
            pointRadius: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            pointHoverRadius: 0,
          },
          // { label: "Min", data: [], borderColor: "green", borderDash: [5, 5], pointRadius: 0 },
          // { label: "Avg", data: [], borderColor: "orange", borderDash: [5, 5], pointRadius: 0 },
          // { label: "Max", data: [], borderColor: "red", borderDash: [5, 5], pointRadius: 0 },
        ],
      },
      options: {
        // responsive: true,
        scales: {
          x: {
            type: "category",
            display: true,
            title: {
              display: true,
              text: graphsettings.x_axis || "X Axis",
            },
            maxTicksLimit: graphsettings.x_resolution || 100,
            autoSkip: false,
          },
          y: {
            display: true,
            min: graphsettings.min || 0,
            max: graphsettings.max || 20000,
            ticks: {
              stepSize: graphsettings.y_resolution || 500, // Explicit step size
              precision: 0, // Disable fractional rounding
              callback: function (value) {
                return value.toLocaleString(); // Format numbers with commas
              },
            },
            title: {
              display: true,
              text: graphsettings.y_axis || "Y Axis",
            },
          },
        },
        animation: false,      
      },
    });

    return () => chartInstanceRef.current?.destroy();
  }, [graphsettings]);

  /** Handle clear graph event */
  useEffect(() => {
    const handleClearGraph = () => {
      console.log("Clear graph command received.");
      dataRef.current = [];
      

      if (chartInstanceRef.current) {
        chartInstanceRef.current.data.labels = [];
        chartInstanceRef.current.data.datasets.forEach((dataset) => (dataset.data = []));
        chartInstanceRef.current.update();
      }
    };

    socket.on("cleargraph", handleClearGraph);
    return () => socket.off("cleargraph", handleClearGraph);
  }, []);

  /** Handle real-time data updates */
  useEffect(() => {
    const handleTestData = (data) => {
      try {
        const parsedData = JSON.parse(data);
        console.log("Received test data:", parsedData);

        // dataRef.current.push({
        //   log_time: parsedData.x_axis, // Corrected mapping
        //   weight: parsedData.y_axis,
        // });

        const newEntry = {
          log_time: parsedData.x_axis, // Corrected mapping
          weight: parsedData.y_axis,
          min: parsedData.min,
          max: parsedData.max
        };
        
        // Check if the last entry has the same x_axis value
        if (
          dataRef.current.length > 0 &&
          dataRef.current[dataRef.current.length - 1].log_time === newEntry.log_time           
        ) {
          if(dataRef.current[dataRef.current.length - 1].weight < newEntry.y_axis){
            dataRef.current.pop(); // Remove last entry
            dataRef.current.push(newEntry); // Push new entry
          }         
        }else{
          dataRef.current.push(newEntry); // Push new entry
        }
        
        
        

        if (dataRef.current.length > 200) {
          dataRef.current.splice(0, dataRef.current.length - 200);
        }
      

        if (chartInstanceRef.current) {
          chartInstanceRef.current.data.labels = dataRef.current.map((entry) => entry.log_time);
          chartInstanceRef.current.data.datasets[0].data = dataRef.current.map((entry) => entry.weight);
          chartInstanceRef.current.data.datasets[1].data = dataRef.current.map((entry) => entry.min);
          chartInstanceRef.current.data.datasets[2].data = dataRef.current.map((entry) => entry.max);

          chartInstanceRef.current.update();
        }
      } catch (error) {
        console.error("Error parsing test data:", error);
      }
    };

    socket.on("gettestdata", handleTestData);
    return () => socket.off("gettestdata", handleTestData);
  }, []);

  return (
    <div className="bg-violet-80 w-full">
      <canvas ref={chartRef} style={{ height: heightval, width: widthval }} />
      
    </div>
  );
}

