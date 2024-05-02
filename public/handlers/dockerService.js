const { exec, spawn } = require('child_process');
const path = require('path');
const { shell } = require('electron')

const DockerService = {
    async deploy(event, data) {
        const composeDir = '/Users/spetsar/job/symfony_docker_nginx_mysql'; 
        const composeFile = 'docker-compose.yml'; 
        const composePath = path.join(composeDir, composeFile);
        const dockerCompose = spawn('docker-compose', ['up', '--build'], {
            cwd: composeDir, 
        });

        dockerCompose.stdout.on('data', (data) => {
            const output = data.toString().trim(); 
            const regex = /electronResponse:(\{.*?\})/g;
            let match;
            let matchedString = '';
        
            while ((match = regex.exec(output)) !== null) {
                matchedString += match[1] + '\n'; 
            }
         
            if(matchedString){
                if(JSON.parse(matchedString).isDone){
                    shell.openExternal('http://localhost:3000')
                }
                event.sender.send('DockerService:deploy:output', JSON.parse(matchedString));
            }
        });

        dockerCompose.stderr.on('data', (data) => {
            console.log('[ERROR]',data.toString())
        });

        dockerCompose.on('exit', (code) => {
            console.log(`[ENDS] ${code}`);
            event.sender.send('DockerService:deploy:complete');
        });
    },

    async cloneRepository(event, data) {
        const destinationFolder = data.folderPath;
        const res = await new Promise((resolve, reject) => {
            exec(`git clone https://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@github.com/MisyuraIlya/digibackend.git "${destinationFolder}/digiapp"`, (error, stdout, stderr) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
        console.log('res',res)
        event.sender.send('DockerService:cloneRepository:response', { result: res ? 'success' : 'error', message: '' });
    }
    
};

module.exports = { DockerService };
