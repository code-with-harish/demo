import fs from 'fs';
import path from 'path';

// Load comprehensive food data
const foodsPath = path.join(process.cwd(), 'data', 'comprehensive-foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

// BMR Calculation using Mifflin-St Jeor Equation
function calculateBMR(age, gender, height, weight) {
  if (gender.toLowerCase() === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// Activity Factor for TDEE calculation
function getActivityFactor(activityLevel) {
  const factors = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  };
  return factors[activityLevel] || 1.2;
}

// Determine primary dosha based on constitutional assessment
function determinePrimaryDosha(constitutionalData) {
  const scores = { vata: 0, pitta: 0, kapha: 0 };
  
  // Scoring logic based on responses
  if (constitutionalData.bodyBuild === 'thin') scores.vata += 2;
  else if (constitutionalData.bodyBuild === 'medium') scores.pitta += 2;
  else if (constitutionalData.bodyBuild === 'heavy') scores.kapha += 2;
  
  if (constitutionalData.skinType === 'dry') scores.vata += 2;
  else if (constitutionalData.skinType === 'oily') scores.pitta += 2;
  else if (constitutionalData.skinType === 'thick') scores.kapha += 2;
  
  // Add more scoring logic for other characteristics...
  
  const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha);
  if (scores.vata === maxScore) return 'Vata';
  if (scores.pitta === maxScore) return 'Pitta';
  return 'Kapha';
}

// Advanced food filtering based on multiple factors
function filterFoods(patientData) {
  const { basic, constitutional, health, dietary } = patientData;
  const primaryDosha = determinePrimaryDosha(constitutional);
  
  return foods.filter((food) => {
    // Basic dosha compatibility
    if (!food.ayurveda.doshaEffect.includes(primaryDosha)) {
      return false;
    }
    
    // Health condition filtering
    if (health.currentConditions.includes('diabetes')) {
      if (food.nutrients.glycemicIndex > 55) return false;
    }
    
    if (health.currentConditions.includes('hypertension')) {
      // Avoid high sodium foods (would need sodium data)
      if (food.category === 'processed') return false;
    }
    
    // Dietary restrictions
    if (dietary.dietaryRestrictions.includes('vegan') && food.category === 'dairy') {
      return false;
    }
    
    if (dietary.dietaryRestrictions.includes('gluten-free') && 
        ['wheat', 'barley', 'rye'].some(grain => food.name.toLowerCase().includes(grain))) {
      return false;
    }
    
    // Regional preferences
    if (basic.location && food.region !== 'Pan India') {
      const userRegion = getRegionFromLocation(basic.location);
      if (food.region !== userRegion) {
        // Reduce probability but don't exclude completely
        return Math.random() > 0.7;
      }
    }
    
    // Seasonal appropriateness
    const currentSeason = getCurrentSeason();
    if (food.season !== 'all' && !food.season.includes(currentSeason)) {
      return Math.random() > 0.5; // Reduce probability
    }
    
    return true;
  });
}

function getRegionFromLocation(location) {
  const regionMap = {
    'mumbai': 'West India',
    'delhi': 'North India',
    'bangalore': 'South India',
    'kolkata': 'East India',
    'chennai': 'South India',
    'hyderabad': 'South India',
    'pune': 'West India',
    'ahmedabad': 'West India'
  };
  
  const city = location.toLowerCase();
  return regionMap[city] || 'Pan India';
}

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

// Generate personalized meal plan with nutritional targets
function generateComprehensiveDietPlan(patientData) {
  const { basic } = patientData;
  const filteredFoods = filterFoods(patientData);
  
  // Calculate nutritional requirements
  const bmr = calculateBMR(parseInt(basic.age), basic.gender, parseInt(basic.height), parseInt(basic.weight));
  const tdee = bmr * getActivityFactor(basic.activityLevel);
  
  // Macro distribution (can be customized based on dosha)
  const targetCalories = tdee;
  const targetProtein = (targetCalories * 0.15) / 4; // 15% of calories from protein
  const targetCarbs = (targetCalories * 0.55) / 4;   // 55% from carbs
  const targetFats = (targetCalories * 0.30) / 9;    // 30% from fats
  
  // Separate foods by meal type and category
  const breakfastFoods = filteredFoods.filter(food => food.mealType.includes("breakfast"));
  const lunchFoods = filteredFoods.filter(food => food.mealType.includes("lunch"));
  const dinnerFoods = filteredFoods.filter(food => food.mealType.includes("dinner"));
  const snackFoods = filteredFoods.filter(food => food.mealType.includes("snacks"));
  
  const plan = [];
  const days = 7;
  
  for (let d = 1; d <= days; d++) {
    const dayPlan = {
      day: `Day ${d}`,
      meals: {},
      nutrition: {
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0
      }
    };
    
    // Breakfast
    const breakfastIndex = (d - 1) % breakfastFoods.length;
    const breakfast = breakfastFoods[breakfastIndex];
    dayPlan.meals.breakfast = {
      name: breakfast?.name || "Oats Porridge",
      portion: "1 bowl (150g)",
      calories: breakfast?.nutrients.calories || 150,
      timing: "7:00 AM - 8:00 AM"
    };
    
    // Mid-morning snack
    const snackIndex1 = d % snackFoods.length;
    const morningSnack = snackFoods[snackIndex1];
    dayPlan.meals.morningSnack = {
      name: morningSnack?.name || "Almonds",
      portion: "10-12 pieces",
      calories: morningSnack?.nutrients.calories * 0.3 || 100,
      timing: "10:00 AM - 10:30 AM"
    };
    
    // Lunch
    const lunchIndex = (d + 1) % lunchFoods.length;
    const lunch = lunchFoods[lunchIndex];
    dayPlan.meals.lunch = {
      name: lunch?.name || "Brown Rice with Dal",
      portion: "1 plate (200g)",
      calories: lunch?.nutrients.calories * 2 || 300,
      timing: "12:30 PM - 1:30 PM"
    };
    
    // Evening snack
    const snackIndex2 = (d + 2) % snackFoods.length;
    const eveningSnack = snackFoods[snackIndex2];
    dayPlan.meals.eveningSnack = {
      name: eveningSnack?.name || "Cucumber Slices",
      portion: "1 cup",
      calories: eveningSnack?.nutrients.calories * 0.5 || 50,
      timing: "4:00 PM - 4:30 PM"
    };
    
    // Dinner
    const dinnerIndex = (d + 2) % dinnerFoods.length;
    const dinner = dinnerFoods[dinnerIndex];
    dayPlan.meals.dinner = {
      name: dinner?.name || "Quinoa with Vegetables",
      portion: "1 bowl (180g)",
      calories: dinner?.nutrients.calories * 1.5 || 250,
      timing: "7:00 PM - 8:00 PM"
    };
    
    // Calculate total nutrition
    Object.values(dayPlan.meals).forEach(meal => {
      dayPlan.nutrition.totalCalories += meal.calories;
    });
    
    plan.push(dayPlan);
  }
  
  return {
    personalizedPlan: plan,
    nutritionalTargets: {
      dailyCalories: Math.round(targetCalories),
      protein: Math.round(targetProtein),
      carbs: Math.round(targetCarbs),
      fats: Math.round(targetFats),
      bmr: Math.round(bmr)
    },
    recommendations: generateRecommendations(patientData),
    primaryDosha: determinePrimaryDosha(patientData.constitutional)
  };
}

function generateRecommendations(patientData) {
  const recommendations = [];
  
  // General Ayurvedic recommendations
  recommendations.push("Eat your largest meal at lunch when digestive fire is strongest");
  recommendations.push("Drink warm water throughout the day to aid digestion");
  recommendations.push("Avoid eating 2-3 hours before bedtime");
  
  // Dosha-specific recommendations
  const primaryDosha = determinePrimaryDosha(patientData.constitutional);
  if (primaryDosha === 'Vata') {
    recommendations.push("Favor warm, moist, and grounding foods");
    recommendations.push("Eat at regular times to balance Vata energy");
  } else if (primaryDosha === 'Pitta') {
    recommendations.push("Choose cooling foods and avoid spicy, fried items");
    recommendations.push("Don't skip meals as it aggravates Pitta");
  } else if (primaryDosha === 'Kapha') {
    recommendations.push("Opt for light, warm, and spicy foods");
    recommendations.push("Reduce dairy and sweet foods");
  }
  
  return recommendations;
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const patientData = req.body;
    
    if (!patientData || !patientData.basic) {
      return res.status(400).json({ error: "Missing patient data" });
    }
    
    const comprehensiveResult = generateComprehensiveDietPlan(patientData);
    res.status(200).json(comprehensiveResult);
    
  } catch (error) {
    console.error('Error generating comprehensive diet plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}