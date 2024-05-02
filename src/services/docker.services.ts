const ipcRenderer = (window as any).ipcRenderer;

export const DockerService = {
    async deploy(): Promise<void>{
        const result = await new Promise((resolve, reject): void => {
            ipcRenderer.send('DockerService:deploy:send','hello world');
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
    }
}