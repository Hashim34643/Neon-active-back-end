const generateWorkoutPlan = require('../models/generate-workout-plan');

const generateWorkoutPlanController = async (req, res) => {
  try {
    const { input1, input2, input3, input4 } = req.body;

    if (!input1 || !input2 || !input3 || !input4) {
      return res.status(400).json({ success: false, message: "Please provide all inputs" });
    }

    const prompt = `make me a workout plan to ${input1} and make it ${input2} weeks long, I plan to train ${input3} days per week for ${input4} minutes per day.`;
    const workoutPlan = await generateWorkoutPlan(prompt);
    res.json({ success: true, workoutPlan });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error generating workout plan" });
  }
}

module.exports = generateWorkoutPlanController;