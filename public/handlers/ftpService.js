const ftp = require('ftp');

const FtpService = {
    async ftpCheck(event, data) {
        const json = data;
        console.log('json',json)
        const client = new ftp();
        client.connect({
            host: json.host,
            user: json.username,
            password: json.password
        });
    
        client.on('ready', () => {
            console.log('FTP connection successful');
            client.end(); 
            event.sender.send('FtpService:ftpCheck:response', { result: 'success', message:'' });
        });
    
        client.on('error', (err) => {
            console.error('Error connecting to FTP:', err);
            client.end(); 
            event.sender.send('FtpService:ftpCheck:response', { result: 'error', message: err.message });
        });
    },
};

module.exports = { FtpService };
