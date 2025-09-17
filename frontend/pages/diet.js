import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jsPDF from "jspdf";
import { FaUtensils } from "react-icons/fa";

export default function DietPage() {
  const router = useRouter();
  const [dietData, setDietData] = useState(null);

  useEffect(() => {
    if (router.query.data) {
      try {
        const parsed = JSON.parse(router.query.data);
        setDietData(parsed);
      } catch (err) {
        console.error("Error parsing diet data:", err);
      }
    }
  }, [router.query.data]);

  const exportPDF = () => {
    if (!dietData) return;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Diet Chart for ${dietData.patient.name}`, 10, 10);

    let y = 20;
    dietData.dietPlan.forEach((day) => {
      doc.text(day.day, 10, y);
      y += 6;
      Object.entries(day.meals).forEach(([meal, food]) => {
        doc.text(`${meal}: ${food}`, 20, y);
        y += 6;
      });
      y += 4;
    });

    doc.save("diet-chart.pdf");
  };

  if (!dietData) return <p className="p-6">No diet data available.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Diet Chart for {dietData.patient.name}
      </h1>
      <div className="mb-6 text-center text-gray-700">
        <p>Age: {dietData.patient.age}</p>
        <p>Gender: {dietData.patient.gender}</p>
        <p>Condition: {dietData.patient.condition}</p>
        <p>Prakriti: {dietData.patient.prakriti}</p>
        <p>Preferences: {dietData.patient.preferences}</p>
      </div>
      <table className="w-full border border-gray-300 mb-6">
        <thead>
          <tr className="bg-blue-100">
            <th className="border px-4 py-2">Day</th>
            <th className="border px-4 py-2">Breakfast</th>
            <th className="border px-4 py-2">Lunch</th>
            <th className="border px-4 py-2">Dinner</th>
          </tr>
        </thead>
        <tbody>
          {dietData.dietPlan.map((day, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="border px-4 py-2 font-bold text-blue-600">
                {day.day}
              </td>
              <td className="border px-4 py-2 flex items-center">
                <FaUtensils className="mr-2 text-green-500" />{" "}
                {day.meals.Breakfast}
              </td>
              <td className="border px-4 py-2 flex items-center">
                <FaUtensils className="mr-2 text-yellow-500" />{" "}
                {day.meals.Lunch}
              </td>
              <td className="border px-4 py-2 flex items-center">
                <FaUtensils className="mr-2 text-red-500" /> {day.meals.Dinner}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={exportPDF}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Export as PDF
      </button>
    </div>
  );
}
