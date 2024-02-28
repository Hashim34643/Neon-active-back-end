const generateWorkoutPlan = require('../models/generate-workout-plan');

const generateWorkoutPlanController = async (req, res) => {
  try {
    const { input1, input2, input3} = req.body;
    const weeks = parseInt(input2, 10)
    if (!input1 || !input2 || !input3) {
      return res.status(400).json({ success: false, message: "Please provide all inputs" });
    }

    const prompt = `generate a 1 week workout plan to ${input1}, i can exercise for ${input2} mins per day ${input3} times a week. give me the workout plan in bulletpoint format`;
    const workoutPlan = await generateWorkoutPlan(prompt);
    res.json({ success: true, workoutPlan });
  } catch (error) {
    res.status(500).json({ error: "Error generating workout plan" });
  }
}

module.exports = generateWorkoutPlanController;
