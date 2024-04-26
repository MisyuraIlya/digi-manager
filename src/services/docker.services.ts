const ipcRenderer = (window as any).ipcRenderer;

export const DockerService = {
    async deploy(): Promise<void>{
        
        const result = await new Promise((resolve, reject): void => {
            ipcRenderer.send('DockerService:deploy:send','hello world');
        });
    }
}