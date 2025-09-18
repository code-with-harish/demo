import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Activity rings data
  const [activityRings, setActivityRings] = useState({
    dietAdherence: { current: 85, target: 100, color: 'bg-green-500' },
    nutritionalBalance: { current: 72, target: 100, color: 'bg-blue-500' },
    hydration: { current: 60, target: 100, color: 'bg-cyan-500' }
  });

  useEffect(() => {
    if (router.query.data) {
      try {
        const parsed = JSON.parse(router.query.data);
        setDashboardData(parsed);
      } catch (err) {
        console.error("Error parsing dashboard data:", err);
      }
    }
  }, [router.query.data]);

  const ActivityRing = ({ ring, label, unit = '%' }) => {
    const percentage = (ring.current / ring.target) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={`${ring.color.replace('bg-', 'text-')} transition-all duration-500 ease-in-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold">{ring.current}{unit}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">{label}</p>
      </div>
    );
  };

  const WeeklyProgress = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const sampleData = [85, 90, 78, 92, 88, 85, 90];
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Diet Adherence</h3>
        <div className="flex items-end justify-between h-32">
          {days.map((day, index) => (
            <div key={day} className="flex flex-col items-center">
              <div 
                className="bg-green-500 rounded-t-md w-8 transition-all duration-300"
                style={{ height: `${(sampleData[index] / 100) * 100}px` }}
              />
              <span className="text-xs text-gray-600 mt-2">{day}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NutritionBreakdown = () => {
    if (!dashboardData?.nutritionalTargets) return null;
    
    const { protein, carbs, fats } = dashboardData.nutritionalTargets;
    const total = protein + carbs + fats;
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Nutrition Targets</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Protein</span>
            <span className="text-sm font-medium">{protein}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(protein / total) * 100}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Carbs</span>
            <span className="text-sm font-medium">{carbs}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(carbs / total) * 100}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Fats</span>
            <span className="text-sm font-medium">{fats}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(fats / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const TodaysMeals = () => {
    if (!dashboardData?.personalizedPlan) return null;
    
    const todaysPlan = dashboardData.personalizedPlan[0]; // First day
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Today's Meal Plan</h3>
        <div className="space-y-3">
          {Object.entries(todaysPlan.meals).map(([mealType, meal]) => (
            <div key={mealType} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium capitalize">{mealType.replace(/([A-Z])/g, ' $1')}</h4>
                <p className="text-sm text-gray-600">{meal.name}</p>
                <p className="text-xs text-gray-500">{meal.timing}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{meal.calories} cal</p>
                <p className="text-xs text-gray-500">{meal.portion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const HealthInsights = () => {
    if (!dashboardData?.recommendations) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Health Insights</h3>
        <div className="space-y-3">
          {dashboardData.recommendations.slice(0, 3).map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading your personalized dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Ayur Diet Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Dosha: <span className="font-medium text-blue-600">{dashboardData.primaryDosha}</span>
              </span>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">P</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Activity Rings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-6">Today's Activity</h2>
          <div className="flex justify-center space-x-12">
            <ActivityRing 
              ring={activityRings.dietAdherence} 
              label="Diet Adherence" 
            />
            <ActivityRing 
              ring={activityRings.nutritionalBalance} 
              label="Nutritional Balance" 
            />
            <ActivityRing 
              ring={activityRings.hydration} 
              label="Hydration" 
              unit=" glasses"
            />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <WeeklyProgress />
          <NutritionBreakdown />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TodaysMeals />
          <HealthInsights />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
              <span className="text-2xl mb-2 block">🍽️</span>
              <span className="text-sm font-medium">Log Meal</span>
            </button>
            <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
              <span className="text-2xl mb-2 block">💧</span>
              <span className="text-sm font-medium">Add Water</span>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors">
              <span className="text-2xl mb-2 block">📊</span>
              <span className="text-sm font-medium">View Report</span>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
              <span className="text-2xl mb-2 block">⚙️</span>
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}