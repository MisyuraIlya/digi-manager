const ipcRenderer = (window as any).ipcRenderer;

export const FtpService = {
    async checkFtp(host:string,usernmae:string,password:string){
        try {
            const result = await new Promise<{result: 'success' | 'error', message:string}>((resolve, reject) => {
              ipcRenderer.on('FtpService:ftpCheck:response', (event:any, response:any) => {
                resolve(response);
              });
                ipcRenderer.send(
                  'FtpService:ftpCheck:send',
                  {
                    host:host,
                    username:usernmae,
                    password:password
                  }
                );
            });
            return result
        } catch (error) {
            console.error('Error:', error);
            return {result:'error', message:'cannot send to api'}
        }
    }
}