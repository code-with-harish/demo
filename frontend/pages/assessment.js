import { useState } from "react";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

export default function ComprehensiveAssessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Constitutional Assessment (Prakriti)
  const [constitutionalData, setConstitutionalData] = useState({
    bodyBuild: "",
    skinType: "",
    hairTexture: "",
    appetite: "",
    digestiveStrength: "",
    sleepPattern: "",
    energyLevel: "",
    temperaturePref: "",
    sweatingPattern: "",
    mentalTendency: "",
    stressResponse: "",
    memory: ""
  });

  // Current Health Status (Vikriti)
  const [healthData, setHealthData] = useState({
    currentConditions: [],
    medications: "",
    familyHistory: "",
    surgicalHistory: "",
    allergies: "",
    mentalHealth: "",
    stressLevel: "",
    exerciseLevel: "",
    smokingStatus: "",
    alcoholConsumption: ""
  });

  // Dietary Assessment
  const [dietaryData, setDietaryData] = useState({
    foodPreferences: [],
    dietaryRestrictions: [],
    eatingPattern: "",
    mealTiming: "",
    cookingStyle: "",
    spicePreference: "",
    liquidIntake: "",
    digestiveIssues: [],
    foodIntolerances: [],
    regionalCuisine: "",
    snackingHabits: "",
    emotionalEating: ""
  });

  // Basic Info
  const [basicData, setBasicData] = useState({
    name: "Priya Sharma",
    age: "28",
    gender: "Female",
    height: "165",
    weight: "58",
    occupation: "",
    location: "",
    activityLevel: ""
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const comprehensiveData = {
        basic: basicData,
        constitutional: constitutionalData,
        health: healthData,
        dietary: dietaryData
      };

      const response = await fetch("/api/comprehensive-diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comprehensiveData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push({
          pathname: "/dashboard",
          query: { data: JSON.stringify(data) },
        });
      } else {
        alert("Failed to process assessment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Basic Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            value={basicData.name}
            onChange={(e) => setBasicData({...basicData, name: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age *</label>
          <input
            type="number"
            value={basicData.age}
            onChange={(e) => setBasicData({...basicData, age: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender *</label>
          <select
            value={basicData.gender}
            onChange={(e) => setBasicData({...basicData, gender: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm) *</label>
          <input
            type="number"
            value={basicData.height}
            onChange={(e) => setBasicData({...basicData, height: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg) *</label>
          <input
            type="number"
            value={basicData.weight}
            onChange={(e) => setBasicData({...basicData, weight: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location/City</label>
          <input
            type="text"
            value={basicData.location}
            onChange={(e) => setBasicData({...basicData, location: e.target.value})}
            placeholder="e.g., Mumbai, Delhi"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Occupation</label>
          <input
            type="text"
            value={basicData.occupation}
            onChange={(e) => setBasicData({...basicData, occupation: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Activity Level</label>
          <select
            value={basicData.activityLevel}
            onChange={(e) => setBasicData({...basicData, activityLevel: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
            <option value="active">Active (hard exercise 6-7 days/week)</option>
            <option value="very-active">Very Active (physical job or 2x/day training)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {step}
          </div>
          {step < 4 && (
            <div
              className={`w-12 h-1 mx-2 ${
                step < currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Constitutional Assessment (Prakriti)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Body Build</label>
          <select
            value={constitutionalData.bodyBuild}
            onChange={(e) => setConstitutionalData({...constitutionalData, bodyBuild: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="thin">Thin/Lean</option>
            <option value="medium">Medium/Athletic</option>
            <option value="heavy">Heavy/Large Frame</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skin Type</label>
          <select
            value={constitutionalData.skinType}
            onChange={(e) => setConstitutionalData({...constitutionalData, skinType: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="dry">Dry/Rough</option>
            <option value="oily">Oily/Warm</option>
            <option value="thick">Thick/Smooth</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hair Texture</label>
          <select
            value={constitutionalData.hairTexture}
            onChange={(e) => setConstitutionalData({...constitutionalData, hairTexture: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="dry">Dry/Frizzy</option>
            <option value="fine">Fine/Straight</option>
            <option value="thick">Thick/Wavy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Appetite</label>
          <select
            value={constitutionalData.appetite}
            onChange={(e) => setConstitutionalData({...constitutionalData, appetite: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="irregular">Irregular/Variable</option>
            <option value="strong">Strong/Sharp</option>
            <option value="low">Low/Steady</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sleep Pattern</label>
          <select
            value={constitutionalData.sleepPattern}
            onChange={(e) => setConstitutionalData({...constitutionalData, sleepPattern: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="light">Light/Restless</option>
            <option value="moderate">Moderate/Sound</option>
            <option value="deep">Deep/Heavy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Energy Level</label>
          <select
            value={constitutionalData.energyLevel}
            onChange={(e) => setConstitutionalData({...constitutionalData, energyLevel: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="variable">Variable/Bursts</option>
            <option value="high">High/Intense</option>
            <option value="steady">Steady/Enduring</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Current Health Status</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Health Conditions</label>
          <div className="mt-2 space-y-2">
            {['Diabetes', 'Hypertension', 'Thyroid Issues', 'Digestive Problems', 'Joint Pain', 'Stress/Anxiety'].map((condition) => (
              <label key={condition} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  checked={healthData.currentConditions.includes(condition)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setHealthData({...healthData, currentConditions: [...healthData.currentConditions, condition]});
                    } else {
                      setHealthData({...healthData, currentConditions: healthData.currentConditions.filter(c => c !== condition)});
                    }
                  }}
                />
                <span className="ml-2 text-sm">{condition}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Medications</label>
          <textarea
            value={healthData.medications}
            onChange={(e) => setHealthData({...healthData, medications: e.target.value})}
            placeholder="List any medications you're currently taking"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stress Level</label>
          <select
            value={healthData.stressLevel}
            onChange={(e) => setHealthData({...healthData, stressLevel: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Dietary Assessment</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Food Preferences</label>
          <div className="mt-2 space-y-2">
            {['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Eggetarian'].map((pref) => (
              <label key={pref} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="foodPreference"
                  className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  checked={dietaryData.foodPreferences.includes(pref)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDietaryData({...dietaryData, foodPreferences: [pref]});
                    }
                  }}
                />
                <span className="ml-2 text-sm">{pref}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Regional Cuisine Preference</label>
          <select
            value={dietaryData.regionalCuisine}
            onChange={(e) => setDietaryData({...dietaryData, regionalCuisine: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="north-indian">North Indian</option>
            <option value="south-indian">South Indian</option>
            <option value="west-indian">West Indian</option>
            <option value="east-indian">East Indian</option>
            <option value="mixed">Mixed/No Preference</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Spice Preference</label>
          <select
            value={dietaryData.spicePreference}
            onChange={(e) => setDietaryData({...dietaryData, spicePreference: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="mild">Mild</option>
            <option value="medium">Medium</option>
            <option value="spicy">Spicy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Daily Water Intake</label>
          <select
            value={dietaryData.liquidIntake}
            onChange={(e) => setDietaryData({...dietaryData, liquidIntake: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="less-than-6">Less than 6 glasses</option>
            <option value="6-8">6-8 glasses</option>
            <option value="more-than-8">More than 8 glasses</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Comprehensive Ayurvedic Assessment
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Complete evaluation for personalized health recommendations
          </p>

          {renderStepIndicator()}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="text-sm text-gray-500 self-center">
              Step {currentStep} of 4
            </div>

            <button
              onClick={handleNext}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <ClipLoader size={20} color="#fff" />
              ) : currentStep === 4 ? (
                "Generate Plan"
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}