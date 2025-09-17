import { useState } from "react";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

export default function Patient() {
  const [formData, setFormData] = useState({
    name: "Priya Sharma",
    age: "28",
    gender: "Female",
    condition: "Diabetes",
    prakriti: "Pitta",
    preferences: "veg",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Small delay for demo purposes to show loading spinner
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await fetch("/api/diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push({
          pathname: "/diet",
          query: { data: JSON.stringify(data) },
        });
      } else {
        alert("Failed to generate diet plan. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Patient Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your age"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your condition (e.g., Diabetes)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prakriti
            </label>
            <select
              name="prakriti"
              value={formData.prakriti}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Vata">Vata</option>
              <option value="Pitta">Pitta</option>
              <option value="Kapha">Kapha</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferences
            </label>
            <select
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}