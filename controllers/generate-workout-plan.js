const generateWorkoutPlan = require('../models/generate-workout-plan');

const generateWorkoutPlanController = async (req, res) => {
  try {
    const { input1, input2, input3} = req.body;
    const weeks = parseInt(input2, 10)
    if (!input1 || !input2 || !input3) {
      return res.status(400).json({ success: false, message: "Please provide all inputs" });
    }

    const prompt = `generate a workout plan to ${input1}, i can exercise for ${input2} mins per day ${input3} times a week. give me the workout plan in this format:
    Day 1:
    - Warm up: 5 minutes of light cardio (jogging in place, jumping jacks, etc.)
    - Strength training: 3 sets of 12 reps of squats, lunges, and push-ups
    - Cardio: 10 minutes of running or high intensity interval training (HIIT)
    - Cool down: 5 minutes of stretching and foam rolling
    Day 2:
    - Warm up: 5 minutes of light cardio
    - Strength training: 3 sets of 12 reps of deadlifts, bicep curls, and shoulder presses
    - Cardio: 10 minutes of jump rope or cycling
    - Cool down: 5 minutes of stretching and foam rolling
    Day 3:
    - Warm up: 5 minutes of light cardio
    - Strength training: 3 sets of 12 reps of bent over rows, tricep dips, and planks
    - Cardio: 10 minutes of stair climbing or elliptical
    - Cool down: 5 minutes of stretching and foam rolling
    Day 4: Rest day
    Day 5:
    - Warm up: 5 minutes of light cardio
    - Strength training: 3 sets of 12 reps of chest presses, lat pull-downs, and hamstring curls
    - Cardio: 10 minutes of jumping jacks or high knees
    - Cool down: 5 minutes of stretching and foam rolling
    Day 6:
    - Warm up: 5 minutes of light cardio
    - Strength training: 3 sets of 12 reps of calf raises, reverse lunges, and overhead presses
    - Cardio: 10 minutes of rowing or swimming
    - Cool down: 5 minutes of stretching and foam rolling
    Day 7: Rest day`;
    const workoutPlan = await generateWorkoutPlan(prompt);
    res.json({ success: true, workoutPlan });
  } catch (error) {
    res.status(500).json({ error: "Error generating workout plan" });
  }
}

module.exports = generateWorkoutPlanController;
