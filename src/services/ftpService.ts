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
    },
    async getDirectoryContents(host:string,usernmae:string,password:string,directory:string){
      try {
          const result = await new Promise<{result: 'success' | 'error', message:string}>((resolve, reject) => {
            ipcRenderer.on('FtpService:getDirectoryContents:response', (event:any, response:any) => {
              resolve(response);
            });
              ipcRenderer.send(
                'FtpService:getDirectoryContents:send',
                {
                  host:host,
                  username:usernmae,
                  password:password,
                  directory:directory,
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