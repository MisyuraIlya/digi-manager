const { exec, spawn } = require('child_process');
const path = require('path');
const { shell } = require('electron')
const open = require('open');
const { app } = require('electron');
const fs = require('fs');

const DockerService = {
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
        event.sender.send('DockerService:cloneRepository:response', { result: res ? 'success' : 'error', message: '' });
    },

    async deploy(event, data){
        const json = data;
        const folder = json.folderPath;
        
        const composeDir = path.resolve(folder);
    
        const dockerCompose = spawn('docker-compose', ['-f', 'docker-compose.prod.yml', 'up', '--build'], {
            cwd: composeDir,
        });
    
        dockerCompose.stdout.on('data', (data) => {
            const output = data.toString().trim();
            console.log('[STDOUT]', output);
            event.sender.send('DockerService:deploy:output', { type: 'stdout', data: output });
        });
        
        dockerCompose.stderr.on('data', (data) => {
            const errorOutput = data.toString().trim();
            console.error('[STDERR]', errorOutput); 
            event.sender.send('DockerService:deploy:output', { type: 'stderr', data: errorOutput });
        });
        
        dockerCompose.on('exit', (code) => {
            console.log(`[ENDS] ${code}`);
            event.sender.send('DockerService:deploy:complete', { code });
        });
    },

    async openWebSite(event, data){
        try {
            await open('http://localhost:3000');
            console.log('Opened http://localhost:3000');
            await open('http://localhost:8085');
            console.log('Opened http://localhost:8085/api');
            event.sender.send('DockerService:openWebSite:response', { result: 'success', message: '' });
          } catch (error) {
            console.error('Error opening URLs:', error);
            event.sender.send('DockerService:openWebSite:response', { result:'error', message: error });
          }
    },

    async getProjects(event,data){
        const workingDir = path.join(app.getPath('userData'), 'projects');
        try {
            const files = await fs.promises.readdir(workingDir, { withFileTypes: true });
            const folders = files
                .filter(file => file.isDirectory())
                .map(file => ({
                    title: file.name,
                    path: path.join(workingDir, file.name)
                }));
            event.sender.send('DockerService:getProjects:response', { result: 'success', data: folders, message: '' });
        } catch (error) {
            console.error('Error reading directory:', error);
            event.sender.send('DockerService:getProjects:response', { result: 'error', message: error.message });
        }
    },

    async stopDocker(event,data){
        exec('docker stop $(docker ps -q)', (error, stdout, stderr) => {
            if (error) {
                event.sender.send('DockerService:stopDocker:response', { result:'error', message: error });
            }
        
            if (stderr) {
                event.sender.send('DockerService:stopDocker:response', { result:'error', message: error });
            }
        
            console.log(`stdout: ${stdout}`);
            event.sender.send('DockerService:stopDocker:response', { result:'success', data:stdout, message:'' });
        });
    }
    
};

module.exports = { DockerService };
