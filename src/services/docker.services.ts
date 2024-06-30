const ipcRenderer = (window as any).ipcRenderer;

export const DockerService = {
    async deploy(folderPath: string): Promise<void>{
        const result = await new Promise((resolve, reject): void => {
            ipcRenderer.send('DockerService:deploy:send',{folderPath});
        });
    },

    async cloneRepository(folderPath: string):Promise<{result: 'success' | 'error', message:string}> {
        const result = await new Promise<{result: 'success' | 'error', message:string}>((resolve, reject) => {
            ipcRenderer.on('DockerService:cloneRepository:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('DockerService:cloneRepository:send',{folderPath});
        });
        return result
    },

    async openWebSite():Promise<{result: 'success' | 'error', message:string}>{
        const result = await new Promise<{result: 'success' | 'error', message:string}>((resolve, reject) => {
            ipcRenderer.on('DockerService:openWebSite:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('DockerService:openWebSite:send','');
        });
        return result
    },

    async getProjects():Promise<{result: 'success' | 'error', message:string, data:IProject[]}>{
        const result = await new Promise<{result: 'success' | 'error', message:string, data:IProject[]}>((resolve, reject) => {
            ipcRenderer.on('DockerService:getProjects:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('DockerService:getProjects:send','');
        });
        return result
    },

    async stopDocker():Promise<{result: 'success' | 'error', message:string, data:string}>{
        const result = await new Promise<{result: 'success' | 'error', message:string, data:string}>((resolve, reject) => {
            ipcRenderer.on('DockerService:stopDocker:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('DockerService:stopDocker:send','');
        });
        return result
    },

    async executeCron():Promise<{type:string, data:string}> {
        const result = await new Promise<{type:string, data:string}>((resolve, reject) => {
            ipcRenderer.on('DockerService:executeCron:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('DockerService:executeCron:send','');
        });
        return result 
    },

    async checkIsDockerOpen():Promise<{data:boolean, message:string, status:'error' | 'success'}> {
        console.log('execute check docker')
        const result = await new Promise<{data:boolean, message:string, status:'error' | 'success'}>((resolve, reject) => {
            ipcRenderer.on('DockerService:checkIsDockerOpen:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('DockerService:checkIsDockerOpen:send','');
        });
        console.log('result',result)
        return result   
    },

    async checkIsGhInstalled():Promise<{data:boolean, message:string, status:'error' | 'success'}> {
        console.log('execute check docker')
        const result = await new Promise<{data:boolean, message:string, status:'error' | 'success'}>((resolve, reject) => {
            ipcRenderer.on('DockerService:checkIsGhInstalled:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('DockerService:checkIsGhInstalled:send','');
        });
        console.log('result',result)
        return result   
    }, 

    async checkIsGitInstalled():Promise<{data:boolean, message:string, status:'error' | 'success'}> {
        console.log('execute check docker')
        const result = await new Promise<{data:boolean, message:string, status:'error' | 'success'}>((resolve, reject) => {
            ipcRenderer.on('DockerService:checkIsGitInstalled:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('DockerService:checkIsGitInstalled:send','');
        });
        console.log('result',result)
        return result   
    },
}