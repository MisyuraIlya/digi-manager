const ipcRenderer = (window as any).ipcRenderer;

export const ConfigService = {
    async createFolder(obj:any): Promise<{result: 'success' | 'error', folderPath: string , message:string}>{
        const result = await new Promise<{result: 'success' | 'error', folderPath: string , message:string}>((resolve, reject) => {
            ipcRenderer.on('ConfigService:createConfig:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('ConfigService:createConfig:send',{...obj});
        });
        return result
    },

    async createFiles(obj: any):Promise<{result: 'success' | 'error', message:string}> {
        const result = await new Promise<{result: 'success' | 'error', message:string}>((resolve, reject) => {
            ipcRenderer.on('ConfigService:createFiles:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('ConfigService:createFiles:send',{...obj});
        });
        return result
    },

    async createMedia(obj: any):Promise<{result: 'success' | 'error', message:string}> {
        const result = await new Promise<{result: 'success' | 'error', message:string}>((resolve, reject) => {
            ipcRenderer.on('ConfigService:createMeida:response', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('ConfigService:createMeida:send',{...obj});
        });
        return result
    }
}