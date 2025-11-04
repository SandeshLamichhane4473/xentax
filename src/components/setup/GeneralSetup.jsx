  import { useNavigate } from "react-router-dom"
 

const generalSetupData = [
  { code: "501", name: "BANKS" },
  { code: "502", name: "BANK BRANCHES" },
  { code: "601", name: "GOVERNMENT REVENUE HEADINGS" },
  { code: "602", name: "CENTRAL GOVERNMENT HEADINGS" },
  { code: "603", name: "GOVERNMENT ACCOUNTS HEADINGS" },
  { code: "604", name: "LOCAL GOVERNMENT HEADINGS" },
  { code: "801", name: "MONTHS" },
  { code: "930", name: "BANK WISE GL ACCOUNTINGS" },
  { code: "999", name: "LOCAL GOVERNMENT GRANT PERCENTAGE" },
];

const GeneralSetup = () => {

     const navigate = useNavigate();
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">General Setup</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Name / Heading</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {generalSetupData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100"  
               onClick={() => {
                if( item.name === "BANKS")navigate("/dashboard/setup/banks");
                 if (item.code === "601")       navigate("/dashboard/setup/revenueheadings");
                  if (item.code === "502")       navigate("/dashboard/setup/bankbranches");
                  
                   if (item.code === "602")       navigate("/dashboard/setup/centralgovtheadings");
                   
                }
                }>
                <td className="p-2 border">{item.code}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border text-center">
                  <button className="text-blue-500 hover:underline mr-2">View</button>
    
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralSetup;