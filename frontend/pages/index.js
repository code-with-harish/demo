import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleQuickStart = () => {
    router.push("/patient");
  };

  const handleComprehensiveAssessment = () => {
    router.push("/assessment");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-5xl font-extrabold mb-4 text-center">Ayur Diet</h1>
      <h2 className="text-xl font-medium mb-6 text-center text-green-100">
        Personalized Ayurvedic diet plans based on your Prakriti and preferences
      </h2>
      <p className="text-lg text-center mb-8 max-w-lg">
        Ancient wisdom meets modern technology. Get instant, personalized diet recommendations based on Ayurvedic principles and your health conditions.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleQuickStart}
          className="px-6 py-3 bg-white text-blue-500 text-lg rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
        >
          Quick Start (Demo)
        </button>
        
        <button
          onClick={handleComprehensiveAssessment}
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 border-2 border-white transition-colors"
        >
          Comprehensive Assessment
        </button>
      </div>
      
      <div className="text-center max-w-md">
        <p className="text-sm text-green-100 mb-2">Choose your experience:</p>
        <p className="text-xs text-green-200">
          <strong>Quick Start:</strong> Basic demo with pre-filled data<br/>
          <strong>Comprehensive:</strong> Full health assessment with advanced features
        </p>
      </div>
    </div>
  );
}