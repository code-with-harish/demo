import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/patient");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-5xl font-extrabold mb-4 text-center">Ayur Diet</h1>
      <h2 className="text-xl font-medium mb-6 text-center text-green-100">
        Personalized Ayurvedic diet plans based on your Prakriti and preferences
      </h2>
      <p className="text-lg text-center mb-8 max-w-lg">
        Ancient wisdom meets modern technology. Get instant, personalized diet recommendations based on Ayurvedic principles and your health conditions.
      </p>
      <button
        onClick={handleStart}
        className="px-6 py-3 bg-white text-blue-500 text-lg rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Get Started
      </button>
    </div>
  );
}