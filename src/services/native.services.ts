const ipcRenderer = (window as any).ipcRenderer;

export const NativeServices = {
    async getIps(): Promise<ILocalIps> {
        try {
            const result = await new Promise<ILocalIps>((resolve, reject) => {
              ipcRenderer.on('native:ips:response', (event:any, response:any) => {
                resolve(response);
              });
      
              ipcRenderer.send('native:ips','');
            });
            console.log('result',result)
            return result
        } catch (error) {
            console.error('Error:', error);
            return {localIp:'', publicIp:'',connectedDevices:[]}
        }
    }
}