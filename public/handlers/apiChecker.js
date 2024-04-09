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
    async checkApiEndpoint(event,data){
        event.sender.send('initialDirectoryData', { path: app.getAppPath() });
    },

}


module.exports = { NativeDirectories };