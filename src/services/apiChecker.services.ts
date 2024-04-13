const ipcRenderer = (window as any).ipcRenderer;

export const ApiCheckerService = {
    async checkUrl(url: string, username: string, password: string): Promise<{result: 'success' | 'error', message:string}> {
        try {
            const result = await new Promise<{result: 'success' | 'error', message:string}>((resolve, reject) => {
              ipcRenderer.on('apiCheck:checkUrl:response', (event:any, response:any) => {
                resolve(response);
              });
              ipcRenderer.send(
                'apiCheck:checkUrl:send',
                {
                  url:`https://app1.medi-market.co.il:50081/odata/Priority/tabula.ini/medi/${url}?$top=1`,
                  username:username,
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