const axios = require('axios');

const generateWorkoutPlan = async (prompt) => {
    const response = await axios.post('https://api.openai.com/v1/completions', 
        JSON.stringify({  
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt, 
            max_tokens: 3500,
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 
            }
        });
    return response.data.choices[0].text; 
}

module.exports = generateWorkoutPlan;

