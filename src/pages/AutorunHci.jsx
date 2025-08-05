import React, { useState, useEffect } from "react";
import socket from '../services/SocketService';
import StepBlock from "../components/StepBlock";

const AutorunHci = () => {
  const [blockData, setBlockData] = useState([
    { id:1, title: "Marking & Grade Verifier", description: "Weighing before glycol filling", field_name: "Scanner", field_value: "12345678912345", field_name2: "", field_value2: "", status: "pending", msg:""},
    { id:2, title: "Stem Turning 1", description: "Fill glycol to specified levels", field_name: "Scanner", field_value: " ", field_name2: "", field_value2: "", status: "pending", msg :""},
    { id:3, title: "Stem Turning 2", description: "Weighing after glycol filling", field_name: "Scanner", field_value: " ", field_name2: "", field_value2: "", status: "pending", msg :""},
    { id:4, title: "Stem Turning 3", description: "Crimp Job", field_name: "", field_value: "Scanner", field_name2: " ", field_value2: "", status: "pending", msg :""},
    { id:5, title: "Induction Hardening ", description: "Engrave product ID with laser", field_name: "Scanner", field_value: " ",field_name2: "", field_value2: "",  status: "pending", msg :""}
  ]);
  
   // UseEffect for socket listeners
  useEffect(() => {
    const handleAppState = (data) => {
      try {
        const parsedData = JSON.parse(data);
        console.log("Received appstate:", parsedData);
       
        setBlockData((prevData) =>
          prevData.map((block) =>
            block.id === parsedData.id
              ? {
                  ...block,
                  field_name: parsedData.field_name, 
                  field_value: parsedData.field_value,
                  field_name2: parsedData.field_name2,
                  field_value2:parsedData.field_value2,
                  status: parsedData.status,
                  msg:parsedData.msg,
                  cycle_status: parsedData.cycle_status,
                }
              : block
          )
        );
      } catch (error) {
        console.error("Error parsing appstate data:", error);
      }
    }; 
   
    // Attach socket listeners
    socket.on("appstate", handleAppState);

    // Cleanup listeners on component unmount
    // return () => {
    //   socket.off("appstate", handleAppState);
    //   socket.off("message", handleMessage);
    // };
  }, []);

  return (
    <div className="p-10 bg-red-100 rounded-lg shadow-md w-12/12 mx-auto mt-2 h-[90vh]">
      {/* Responsive Grid of Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StepBlock key={1} data={{'block':blockData[0], 'scanner':'', 'io':'hidden', 'sc_status':comState.marking_sc, 'io_status':comState.marking_io}} />
        <StepBlock key={2} data={{'block':blockData[1], 'scanner':'', 'io':'', 'sc_status':comState.st1_sc, 'io_status':comState.st1_io}} />
        <StepBlock key={3} data={{'block':blockData[2], 'scanner':'', 'io':'', 'sc_status':comState.st2_sc, 'io_status':comState.st2_io}} />
        <StepBlock key={4} data={{'block':blockData[3], 'scanner':'', 'io':'', 'sc_status':comState.st3_sc, 'io_status':comState.st3_io}} />
        <StepBlock key={5} data={{'block':blockData[4], 'scanner':'', 'io':'', 'sc_status':comState.ih_sc, 'io_status':comState.ih_io}} />     
      </div>

     
     
    </div>
  );
};


export default AutorunHci;
