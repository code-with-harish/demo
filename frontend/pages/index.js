import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/patient");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center">Ayur Diet</h1>
      <p className="text-lg text-center mb-8 max-w-md">
        Discover your personalized Ayurvedic diet plan tailored to your health and
        preferences.
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