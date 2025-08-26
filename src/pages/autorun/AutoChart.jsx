import React, { useEffect, useState, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';

const tempKeys = ['temp1', 'temp2', 'temp3', 'temp4'];
const colors = ['#FF4560', '#00E396', '#008FFB', '#FEB019', '#775DD0']; // humidity is last

const AutoChart = ({ liveData, graphSettings }) => {
  const [seriesData, setSeriesData] = useState({
    temp1: [],
    temp2: [],
    temp3: [],
    temp4: [],
    humidity: [],
  });

  const [categories, setCategories] = useState([]);
  const maxPoints = useRef(graphSettings?.x_axis?.ticks || 25);

  useEffect(() => {
    if (!liveData || !graphSettings) return;

    maxPoints.current = graphSettings.x_axis.ticks;

    setSeriesData(prev => {
      const updated = { ...prev };
      [...tempKeys, 'humidity'].forEach(key => {
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

  const generateTempOptions = (label, color) => ({
    chart: {
      id: `${label}-chart`,
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
      title: { text: graphSettings.x_axis.title }
    },
    yaxis: {
      min: graphSettings.y_axis.min,
      max: graphSettings.y_axis.max,
      tickAmount: graphSettings.y_axis.ticks,
      title: { text: graphSettings.y_axis.title }
    },
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: {
      enabled: true,
      formatter: (val, { dataPointIndex, w }) => {
        const lastIndex = w.globals.series[0].length - 1;
        return dataPointIndex === lastIndex ? val : '';
      },
      style: { fontSize: '12px', fontWeight: 'bold' },
      background: { enabled: true, foreColor: '#fff', borderRadius: 2 }
    },
    title: { text: `${label.toUpperCase()} Graph`, align: 'center' },
    legend: { show: false }
  });

  const generateHumidityOptions = (color) => ({
    chart: {
      id: `humidity-chart`,
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
      title: { text: 'Time' }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      title: { text: 'Humidity (%)' }
    },
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: {
      enabled: true,
      formatter: (val, { dataPointIndex, w }) => {
        const lastIndex = w.globals.series[0].length - 1;
        return dataPointIndex === lastIndex ? val : '';
      },
      style: { fontSize: '12px', fontWeight: 'bold' },
      background: { enabled: true, foreColor: '#fff', borderRadius: 2 }
    },
    title: { text: 'HUMIDITY Graph', align: 'center' },
    legend: { show: false }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full px-6">
      {graphSettings ? (
        <>
          {tempKeys.map((key, index) => (
            <div key={key} className="bg-white shadow rounded p-4 w-full">
              <ReactApexChart
                options={generateTempOptions(key, colors[index])}
                series={[{ name: key.toUpperCase(), data: seriesData[key] }]}
                type="area"
                height={300}
                width="100%"
              />
            </div>
          ))}
          {/* Separate Humidity Graph */}
          <div className="bg-white shadow rounded p-4 w-full">
            <ReactApexChart
              options={generateHumidityOptions(colors[4])}
              series={[{ name: 'HUMIDITY', data: seriesData.humidity }]}
              type="area"
              height={300}
              width="100%"
            />
          </div>
        </>
      ) : (
        <p>Loading graph settings...</p>
      )}
    </div>
  );
};

export default AutoChart;
