const axios = require('axios');

const ApiCheckService = {
    async checkApiEndpoint(event, data) {
        const json = data;
        console.log('json',json)
        try {
            const response = await axios.get(json.url, {
                auth: {
                    username: json.username,
                    password: json.password
                }
            });
            console.log('response',response)
            if (response.status === 200) {
                console.log('API endpoint is reachable and returns status 200');
                event.sender.send('apiCheck:checkUrl:response', { result: 'success' });
            } else {
                console.error('API endpoint is reachable but returns status', response.status);
                event.sender.send('apiCheck:checkUrl:response', { result: 'error', message: `Unexpected status code: ${response.status}` });
            }
        } catch (error) {
            console.error('Error occurred while checking API endpoint:', error.message);
            event.sender.send('apiCheck:checkUrl:response', { result: 'error', message: error.message });
        }
    },
};

module.exports = { ApiCheckService };
