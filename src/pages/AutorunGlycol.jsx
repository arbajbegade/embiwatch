import React, { useState, useEffect } from "react";
import socket from "../../Socket/socket";

const Autorun = () => {
  const [blockData, setBlockData] = useState([
    { title: "Pre Weighing", description: "Weighing before glycol filling", field_name: "Weight", field_value: "", field_name2: "Weight", barcode: "", status: "pending", cycle_status: 0 },
    { title: "Glycol Filling", description: "Fill glycol to specified levels", field_name: "", field_value: "", field_name2: "", barcode: "", status: "pending", cycle_status: 0 },
    { title: "Post Weighing", description: "Weighing after glycol filling", field_name: "", field_value: "", field_name2: "Weight", barcode: "", status: "pending", cycle_status: 0 },
    { title: "Crimping", description: "Crimp Job", field_name: "", field_value: "", field_name2: "", barcode: "", status: "pending", cycle_status: 0 },
    { title: "Laser Engraving", description: "Engrave product ID with laser", field_name: "", field_value: "",field_name2: "", barcode: "",  status: "pending", cycle_status: 0 },
    // { title: "Result", description: "Inspect part for quality assurance", field_name: "", field_value: "", field_name2: "", barcode: "", status: "pending", cycle_status: 0 },
  ]);
  const [message, setMessage] = useState("Put Pre weighing Job");
  const [message2, setMessage2] = useState("Laser Enable");
  // UseEffect for socket listeners
  useEffect(() => {
    const handleAppState = (data) => {
      try {
        const parsedData = JSON.parse(data);
        console.log("Received appstate:", parsedData);

        setBlockData((prevData) =>
          prevData.map((block) =>
            block.title === parsedData.title
              ? {
                  ...block,
                  field_name: parsedData.field_name, 
                  field_value: parsedData.field_value,
                  field_name2: parsedData.field_name2,
                  status: parsedData.status,
                  barcode:parsedData.barcode,
                  cycle_status: parsedData.cycle_status,
                }
              : block
          )
        );
      } catch (error) {
        console.error("Error parsing appstate data:", error);
      }
    };

    const handleMessage = (data) => {
      try {
        const parsedData = JSON.parse(data);
        setMessage(parsedData.message);
        setMessage2(parsedData.message2);
        console.log("Received message:", parsedData);
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };

    // Attach socket listeners
    socket.on("appstate", handleAppState);
    socket.on("message", handleMessage);

    // Cleanup listeners on component unmount
    return () => {
      socket.off("appstate", handleAppState);
      socket.off("message", handleMessage);
    };
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md w-12/12 mx-auto mt-2">
      {/* Responsive Grid of Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {blockData.map((block, index) => (
          <StepBlock key={index} data={block} />
        ))}
      </div>

      {/* Message Bar */}
      <div className="flex flex-row items-center space-x-2">
      <div className="mt-6 p-3 bg-blue-600 text-white text-center rounded-md h-36 text-8xl w-3/5 flex items-center justify-center">
        <p>{message}</p>
      </div>
      <div className="mt-6 p-3 bg-blue-600 text-white text-center rounded-md h-36 text-8xl w-2/5 flex items-center justify-center">
        <p>{message2}</p>
      </div>
      </div>
    </div>
  );
};

const StepBlock = ({ data }) => {
  const getBlockColor = () => {
    switch (data.status) {
      case "completed":
        return "bg-green-500";
      case "inProgress":
        return "bg-yellow-500";
      case "pending":
        return "bg-gray-300";
      case "ok":
        return "bg-green-500";
      case "notok":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-15">
      <h2 className="text-4xl font-semibold text-gray-700 mb-2">{data.title}</h2>
      <div className={`p-4 rounded-lg shadow text-center border border-gray-200 w-full h-80 ${getBlockColor()}`}>
        {/* <p className="text-gray-500 mb-4">{data.description}</p> */}
        <p className="text-7xl text-gray-700">
          <strong> {data.field_value}</strong>
        </p>
        <p className="text-6xl text-gray-700">
          {data.field_name}
        </p>
        
        <p className="text-2xl text-gray-700 pt-6">
        {data.field_name2}
        </p>
        <p className="text-2xl text-gray-700 pt-4">
          {data.barcode}
        </p>
      </div>
    </div>
  );
};

export default Autorun;
