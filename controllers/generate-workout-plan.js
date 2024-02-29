const generateWorkoutPlan = require('../models/generate-workout-plan');

const generateWorkoutPlanController = async (req, res) => {
  try {
    const { input1, input2, input3} = req.body;
    if (!input1 || !input2 || !input3) {
      return res.status(400).json({ success: false, message: "Please provide all inputs" });
    }

    const prompt = `generate a weekly workout plan to ${input1}, i can exercise for ${input2} mins per day ${input3} times a week. Your entire response must only be in the following format:
    "
    Day: *[1-7]*
    
    Warmup:
    *warmup exercise description*
    Main Exercise:
    *first main exercise description*
    *second main exercise description*
    *third main exercise description*
    Cooldown:
    *cooldown exercise description*
    "
    On rest days return:
    "
    Day: *[1-7]*
    Rest Day
    "
    Do not respond with any additional information that does not follow the format provided in quotes. You must only provide workouts for ${input3} days of the week; for the other days use the provided rest day format for your response. Only replace any parts of the provided format that lies between two '*', *[1-7]* means you must provide a number from 1 to 7 corresponding to the day of the workout for that week. Do not include any of the '*' in your response.
    `;
    const workoutPlan = await generateWorkoutPlan(prompt);
    res.json({ success: true, workoutPlan });
  } catch (error) {
    res.status(500).json({ error: "Error generating workout plan" });
  }
}

module.exports = generateWorkoutPlanController;
