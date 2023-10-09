const axios = require('axios');

const { CHAT_KEY } = process.env;

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { question } = JSON.parse(event.body);

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: question,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': CHAT_KEY
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ answer: response.data.choices[0].text.trim() })
        };
    } catch (error) {
        return { statusCode: 500, body: 'Failed to fetch the answer' };
    }
};
