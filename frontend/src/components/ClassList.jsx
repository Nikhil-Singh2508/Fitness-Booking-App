import { useEffect, useState } from "react";
import api from "../api"; // Axios instance

export default function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    api.get("/classes/")
      .then(res => setClasses(res.data))
      .catch(err => console.error("Failed to fetch classes", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Available Fitness Classes</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-700">
  <tr>
    <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
    <th className="px-6 py-3 text-left text-sm font-semibold">Class Name</th>
    <th className="px-6 py-3 text-left text-sm font-semibold">Instructor</th>
    <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
    <th className="px-6 py-3 text-left text-sm font-semibold">Available Slots</th>
  </tr>
</thead>

          <tbody className="bg-white divide-y divide-gray-200">
  {classes.map(cls => (
    <tr key={cls.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cls.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cls.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cls.instructor}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cls.time}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cls.date}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cls.available_slots}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}
