import React, { useState } from "react";
import MonthNameForm from "./MonthNameForm";
import Breadcrumb from "../common/Breadcrumb";

const MonthNames = () => {
  const [months, setMonths] = useState([
    { code: "01", name: "Baishakha", status: "Active" },
    { code: "02", name: "Jestha", status: "Active" },
    { code: "03", name: "Ashadh", status: "Active" },
    { code: "04", name: "Shrawan", status: "Active" },
    { code: "05", name: "Bhadra", status: "Active" },
    { code: "06", name: "Aswin", status: "Active" },
    { code: "07", name: "Kartik", status: "Active" },
    { code: "08", name: "Mangsir", status: "Active" },
    { code: "09", name: "Poush", status: "Active" },
    { code: "10", name: "Magh", status: "Active" },
    { code: "11", name: "Falgun", status: "Active" },
    { code: "12", name: "Chaitra", status: "Active" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShowForm(true);
  };

  const handleSave = (data) => {
    if (editData) {
      setMonths(months.map((m) => (m.code === data.code ? data : m)));
    } else {
      setMonths([...months, data]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📅 Month Names</h2>

         <Breadcrumb
        items={[
          { label: "Setup", path: "/dashboard/setup" },
          { label: "Month Names" },
        ]}
      />
      <button
        className="bg-primary text-white px-4 py-2 rounded mb-4"
        onClick={handleAdd}
      >
        ➕ Add New Month
      </button>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Code</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {months.map((item) => (
            <tr key={item.code}>
              <td className="border px-4 py-2">{item.code}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-primary text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(item)}
                >
                  ✏ Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <MonthNameForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          initialData={editData}
        />
      )}
    </div>
  );
};

export default MonthNames;
