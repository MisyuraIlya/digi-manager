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
            const folders = await Promise.all(files
                .filter(file => file.isDirectory())
                .map(async file => {
                    const projectPath = path.join(workingDir, file.name);
                    const packageJsonPath = path.join(projectPath, file.name, 'front', 'package.json');
                    let version = 'N/A';
    
                    try {
                        const packageJsonData = await fs.promises.readFile(packageJsonPath, 'utf8');
                        const packageJson = JSON.parse(packageJsonData);
                        version = packageJson.version || 'N/A';
                    } catch (error) {
                        console.warn(`Could not read or parse package.json for ${file.name}:`, error);
                    }
    
                    return {
                        title: file.name,
                        path: projectPath,
                        version: version
                    };
                })
            );
    
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
    },

    async executeCron(event, data) {
        exec('docker ps --filter "ancestor=spetsar/backend-template" --format "{{.ID}}"', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                event.sender.send('DockerService:executeCron:output', { type: 'stderr', data: error.message });
                return;
            }
    
            if (stderr) {
                console.error('[STDERR]', stderr);
                event.sender.send('DockerService:executeCron:output', { type: 'stderr', data: stderr });
                return;
            }
    
            const containerId = stdout.trim();
            const command = `docker exec ${containerId} php bin/console CronManager`;
    
            const childProcess = exec(command);
    
            childProcess.stdout.on('data', (stdoutData) => {
                const trimmedData = stdoutData.toString().trim();
                console.log('[STDOUT]', trimmedData);
                event.sender.send('DockerService:executeCron:output', { type: 'stdout', data: trimmedData });
            });
    
            childProcess.stderr.on('data', (stderrData) => {
                const trimmedData = stderrData.toString().trim();
                console.error('[STDERR]', trimmedData);
                event.sender.send('DockerService:executeCron:output', { type: 'stderr', data: trimmedData });
            });
    
            childProcess.on('close', (code) => {
                console.log(`Child process exited with code ${code}`);
                event.sender.send('DockerService:executeCron:output', { type: 'process_end', data: `Child process exited with code ${code}` });
            });
        });
    },

    async checkIsDockerOpen(event, data) {
        console.log('try check docker')
        try {
            const isOpen = await new Promise((resolve, reject) => {
                exec('docker info', (error, stdout, stderr) => {
                    if (error) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            });
            console.log('isOpen',isOpen)
            event.sender.send('DockerService:checkIsDockerOpen:response', { status: 'success', data: isOpen, message: '' });
        } catch (error) {
            console.log('error',error)
            event.sender.send('DockerService:checkIsDockerOpen:response', { status: 'error', data: false, message: error.message  });
        }
    },

    async checkIsGhInstalled(event, data) {
        try {
            const isInstalled = await new Promise((resolve, reject) => {
                exec('gh --version', (error, stdout, stderr) => {
                    if (error) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            });
            event.sender.send('DockerService:checkIsGhInstalled:response', { status: 'success', data: isInstalled });
        } catch (error) {
            event.sender.send('DockerService:checkIsGhInstalled:response', { status: 'error', data: error.message });
        }
    },
    
    async checkIsGitInstalled(event, data) {
        try {
            const isInstalled = await new Promise((resolve, reject) => {
                exec('git --version', (error, stdout, stderr) => {
                    if (error) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            });
            event.sender.send('DockerService:checkIsGitInstalled:response', { status: 'success', data: isInstalled });
        } catch (error) {
            event.sender.send('DockerService:checkIsGitInstalled:response', { status: 'error', data: error.message });
        }
    },

    async updateVersion(event, data) {
        const destinationFolder = data.folderPath;
        console.log('destinationFolder', destinationFolder);
      
        const scriptPath = path.resolve(__dirname, 'update.sh');
        console.log('scriptPath', scriptPath);
      
        const command = `"${scriptPath}" "${destinationFolder}"`;
      
        const child = spawn(command, {
          shell: true
        });
      
        let stdoutData = '';
        let stderrData = '';
      
        child.stdout.on('data', (data) => {
          stdoutData += data.toString();
          console.log('stdout:', data.toString());
        });
      
        child.stderr.on('data', (data) => {
          stderrData += data.toString();
          console.log('stderr:', data.toString());
        });
      
        child.on('error', (error) => {
          console.log('error.message', error.message);
          event.sender.send('DockerService:updateVersion:response', { status: 'error', data: error.message, message: '' });
        });
      
        child.on('exit', (code, signal) => {
          if (code === 0) {
            event.sender.send('DockerService:updateVersion:response', { status: 'success', data: stdoutData, message: '' });
          } else {
            event.sender.send('DockerService:updateVersion:response', { status: 'error', data: stderrData || `Script exited with code ${code} and signal ${signal}`, message: '' });
          }
        });
    }
    
};

module.exports = { DockerService };
