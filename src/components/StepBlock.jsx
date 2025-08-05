
const StepBlock = ({ data }) => {
  console.log('Data', data);
    const getBlockColor = () => {
      switch (data.block.status) {
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
        <h2 className="text-4xl font-bold text-gray-700 mb-2">{data.block.title}</h2>
        <div className={`p-4 rounded-lg shadow text-center border border-gray-200 w-full h-[80vh] `}>
          <div className="flex flex-col">         
            <div className="flex flex-row space-x-2 items-center justify-center">
                <div className={`border p-2 ${data.sc_status ? "bg-green-700" : "bg-red-700"} ${data.scanner}`}>Scanner</div>
                <div className={`border p-2 ${data.io_status ? "bg-green-700" : "bg-red-700"} ${data.io}`}>IO</div>
            </div>
            
            <p className="text-[4rem] text-gray-700">
              {data.block.field_name}
            </p>
            <p className="text-[3rem] text-gray-500">
              <strong> {data.block.field_value}</strong>
            </p>
            <div className={`border p-4 text-3xl text-red ${getBlockColor()}`}>
              {data?.block?.msg}
            </div>
            <p className="text-2xl text-gray-700 pt-6">
              {data.block.field_name2}
            </p>
            <p className="text-2xl text-gray-700 pt-4">
              {data.block.field_value2}
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default StepBlock;