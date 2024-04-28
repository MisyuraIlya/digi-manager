const ipcRenderer = (window as any).ipcRenderer;

export const ConfigService = {
    async createConfig(obj:any): Promise<void>{
        const result = await new Promise((resolve, reject): void => {
            ipcRenderer.send('ConfigService:createConfig:send',{...obj});
        });
    }
}