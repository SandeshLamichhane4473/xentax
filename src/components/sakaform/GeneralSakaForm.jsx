  import { useNavigate } from "react-router-dom"
 

const generalSetupData = [
  { code: "1", name: "Saka Form 1" },
  { code: "2", name: "Saka Form 2" },
  { code: "3", name: "Saka Form 3" },
  { code: "4", name: "Saka Form 4" },
  { code: "5", name: "Saka Form 5" },
  { code: "6", name: "Saka Form 6" },
 
];

const GeneralSakaForm = () => {

     const navigate = useNavigate();
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">SakaForm Setup</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Form Types</th>
              <th className="p-2 border">Maker</th>
              <th className="p-2 border">Checker</th>
               <th className="p-2 border">List</th>
              <th className="p-2 border">Sample</th>
            </tr>
          </thead>

          <tbody>
            {generalSetupData.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100"  
               
                >
                <td className="p-2 border">{item.code}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border text-center">
                  <button   onClick={() => {
                     if( item.code === "1")navigate("/dashboard/sakaform/sakaform1input");
                
                }
                } className="text-blue-500 hover:underline mr-2">Input</button>
                  
                </td>
                 <td className="p-2 border text-center">
                  <button onClick={()=>{
                    if( item.code === "1")navigate("/dashboard/sakaform/sakaform1validate");
                    
                  }} className="text-blue-500 hover:underline mr-2">Validate</button>
                  
                </td>

                 <td className="p-2 border text-center">
                  <button onClick={()=>{
                 
                    if( item.code === "1")navigate("/dashboard/sakaform/sakaform1view");
                    //viewe
                  }} className="text-blue-500 hover:underline mr-2">View</button>
                </td>

                <td className="p-2 border text-center">
                  <button onClick={()=>{
                    
                    
                  }} className="text-blue-500 hover:underline mr-2">Download</button>
                  
                </td>
                  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default GeneralSakaForm;
