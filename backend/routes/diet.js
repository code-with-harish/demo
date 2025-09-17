const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const foodsPath = path.join(__dirname, "../data/foods.json");
const foods = JSON.parse(fs.readFileSync(foodsPath, "utf8"));

// Simple rule-based filter
function filterFoods(patient) {
  return foods.filter((food) => {
    if (patient.condition.toLowerCase().includes("diabetes")) {
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

// POST /diet
router.post("/", (req, res) => {
  const patient = req.body;

  if (!patient || !patient.prakriti) {
    return res.status(400).json({ error: "Missing patient profile" });
  }

  const dietPlan = generateDietPlan(patient);
  res.json({ patient, dietPlan });
});

module.exports = router;
