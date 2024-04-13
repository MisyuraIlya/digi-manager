const ipcRenderer = (window as any).ipcRenderer;

export const NativeServices = {
  async goToParentDirectory(path: string){
      const result = await new Promise<IPath>((resolve, reject) => {
          ipcRenderer.on('parentDirectory', (event:any, response:any) => {
            resolve(response);
          });
          ipcRenderer.send('goToParentDirectory',path);
      });
      return result;
  },
}