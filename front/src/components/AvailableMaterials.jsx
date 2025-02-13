// src/components/AvailableMaterials.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function AvailableMaterials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    async function fetchMaterials() {
      const res = await axios.get("http://localhost:5000/materials");
      setMaterials(res.data);
    }
    fetchMaterials();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Available Materials</h2>
      <ul className="space-y-2">
        {materials.map((material) => (
          <li key={material._id} className="p-3 bg-gray-100 rounded">
            {material.name} - {material.quantity} pcs available
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableMaterials;
