const ipcRenderer = (window as any).ipcRenderer;

export const DirectoriesService = {
    async getInitialDirectory(){
        const result = await new Promise<IPath>((resolve, reject) => {
            ipcRenderer.on('initialDirectoryData', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('getInitialDirectory','');
        });
        return result;
    },
    async getDirectoryContents(path: string){
        const result = await new Promise<{contents:IFile[]}>((resolve, reject) => {
            ipcRenderer.on('directoryContents', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('getDirectoryContents',path);
        });
        return result;
    },
    async goToParentDirectory(path: string){
        const result = await new Promise<IPath>((resolve, reject) => {
            ipcRenderer.on('parentDirectory', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('goToParentDirectory',path);
        });
        return result;
    },
    async openDirectory(folder: string){
        const result = await new Promise<IPath>((resolve, reject) => {
            ipcRenderer.on('selectedDirectory', (event:any, response:any) => {
              resolve(response);
            });
            ipcRenderer.send('openDirectory',folder);
        });
        return result;
    },

}