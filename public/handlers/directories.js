const fs = require('fs');
const pathModule = require('path');
const { app, BrowserWindow, dialog } = require('electron');

const formatSize = size => {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      ' ' +
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
    );
};

const NativeDirectories = {
    async getInitialDirectory(event,data){
        event.sender.send('initialDirectoryData', { path: app.getAppPath() });
    },
    async getDirectoryContents(event,data){
        const path = data;
        try {
          const contents = fs.readdirSync(path).map(file => {
            const filePath = pathModule.join(path, file);
            const stats = fs.statSync(filePath);
            return {
              name: file,
              size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
              isDirectory: stats.isDirectory()
            };
          });
            event.sender.send('directoryContents', { contents });
        } catch (error) {
            event.sender.send('directoryContents', { error: error.message });
        }
    },
    async goToParentDirectory(event,data){
        const path = data;
        const parentPath = pathModule.dirname(path);
        event.sender.send('parentDirectory', { path: parentPath });
    },
    async openDirectory(event,data){
        const folder = data;
        const currentWindow = BrowserWindow.getFocusedWindow();
        if (currentWindow) {
          dialog.showOpenDialog(currentWindow, {
            defaultPath: folder,
            properties: ['openDirectory']
          }).then(result => {
            if (!result.canceled && result.filePaths.length > 0) {
              const selectedFolder = result.filePaths[0];
              event.sender.send('selectedDirectory', { path: selectedFolder });
            }
          }).catch(error => {
            event.sender.send('selectedDirectory', { error: error.message });
          });
        }
    }

}


module.exports = { NativeDirectories };