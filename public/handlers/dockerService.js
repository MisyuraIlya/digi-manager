const { exec, spawn } = require('child_process');
const fs = require('fs');
const https = require('https');
const path = require('path');
const { shell } = require('electron')

// function downloadComposeFile(url, destination) {

//     const composeContent = `
//     version: '3'
//     services:
//       digi-backend:
//         image: spetsar/digi-backend
//         # Other configurations for this service, if needed
//     `;

//     fs.writeFile('docker-compose.yml', composeContent, (err) => {
//         if (err) {
//             console.error('Error creating docker-compose.yml file:', err);
//         } else {
//             console.log('docker-compose.yml file created successfully.');
//         }
//     }); 
//     return new Promise((resolve, reject) => {
//         const file = fs.createWriteStream(destination);
//         https.get(url, response => {
//             response.pipe(file);
//             file.on('finish', () => {
//                 file.close(resolve(destination));
//             });
//         }).on('error', error => {
//             fs.unlink(destination);
//             reject(error);
//         });
//     });
// }

// Function to run docker-compose up command
// function runDockerCompose() {
//     exec('docker-compose up', (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.error(`stderr: ${stderr}`);
//             return;
//         }
//         console.log(`stdout: ${stdout}`);
//     });
// }


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
            // console.log('output',data.toString().trim());
            // console.error(`Error: ${data.toString().trim()}`);
        });

        dockerCompose.on('exit', (code) => {
            console.log(`[ENDS] ${code}`);
            event.sender.send('DockerService:deploy:complete');
        });
    },
};

module.exports = { DockerService };
