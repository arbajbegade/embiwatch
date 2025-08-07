import React, { useEffect, useState, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';

const tempKeys = ['temp1', 'temp2', 'temp3', 'temp4'];
const tempColors = ['#FF4560', '#00E396', '#008FFB', '#FEB019']; // Unique colors per chart

const AutoChart = ({ liveData, graphSettings }) => {
  const [seriesData, setSeriesData] = useState({
    temp1: [],
    temp2: [],
    temp3: [],
    temp4: []
  });

  const [categories, setCategories] = useState([]);
  const maxPoints = useRef(graphSettings?.x_axis?.ticks || 25);

  useEffect(() => {
    if (!liveData || !graphSettings) return;

    maxPoints.current = graphSettings.x_axis.ticks;

    setSeriesData(prev => {
      const updated = { ...prev };
      tempKeys.forEach(key => {
        updated[key] = [...(prev[key] || []), liveData[key]];
        if (updated[key].length > maxPoints.current) updated[key].shift();
      });
      return updated;
    });

    setCategories(prev => {
      const updated = [...prev, liveData.time];
      if (updated.length > maxPoints.current) updated.shift();
      return updated;
    });
  }, [liveData, graphSettings]);

  const generateChartOptions = (tempLabel, color) => ({
    chart: {
      id: `${tempLabel}-chart`,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: { speed: 500 }
      },
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: [color],
    xaxis: {
      categories: categories,
      title: {
        text: graphSettings.x_axis.title
      }
    },
    yaxis: {
      min: graphSettings.y_axis.min,
      max: graphSettings.y_axis.max,
      tickAmount: graphSettings.y_axis.ticks,
      title: {
        text: graphSettings.y_axis.title
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    },
    title: {
      text: `${tempLabel.toUpperCase()} Graph`,
      align: 'center',
      style: { fontSize: '16px' }
    },
    legend: {
      show: false
    }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-6">
      {graphSettings ? (
        tempKeys.map((key, index) => (
          <div key={key} className="bg-white shadow rounded p-4 w-full">
            <ReactApexChart
              options={generateChartOptions(key, tempColors[index])}
              series={[
                {
                  name: key.toUpperCase(),
                  data: seriesData[key]
                }
              ]}
              type="line"
              height={300}
              width="100%"
            />
          </div>
        ))
      ) : (
        <p>Loading graph settings...</p>
      )}
    </div>
  );
};

export default AutoChart;
