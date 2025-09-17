import fs from 'fs';
import path from 'path';

// Load food data
const foodsPath = path.join(process.cwd(), 'data', 'foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

// Simple rule-based filter
function filterFoods(patient) {
  return foods.filter((food) => {
    if (patient.condition && patient.condition.toLowerCase().includes("diabetes")) {
      if (food.nutrients.glycemicIndex > 55) return false;
    }
    if (patient.prakriti === "Pitta") {
      if (food.ayurveda.virya === "heating") return false;
    }
    if (patient.prakriti === "Kapha") {
      if (food.ayurveda.guna === "heavy") return false;
    }
    if (patient.prakriti === "Vata") {
      if (food.ayurveda.virya === "cooling" && food.ayurveda.guna === "dry")
        return false;
    }
    return true;
  });
}

function generateDietPlan(patient) {
  const filteredFoods = filterFoods(patient);

  const plan = [];
  const days = 7;
  const meals = ["Breakfast", "Lunch", "Dinner"];

  for (let d = 1; d <= days; d++) {
    const dayPlan = { day: `Day ${d}`, meals: {} };
    meals.forEach((meal, idx) => {
      const food = filteredFoods[(d * idx) % filteredFoods.length];
      dayPlan.meals[meal] = food ? food.name : "Simple Khichdi";
    });
    plan.push(dayPlan);
  }

  return plan;
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const patient = req.body;

  if (!patient || !patient.prakriti) {
    return res.status(400).json({ error: "Missing patient profile" });
  }

  try {
    const dietPlan = generateDietPlan(patient);
    res.status(200).json({ patient, dietPlan });
  } catch (error) {
    console.error('Error generating diet plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}