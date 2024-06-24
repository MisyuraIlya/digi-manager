const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { getLocalIps } = require('./handlers/core');
const { NativeDirectories } = require('./handlers/directories');
const { ApiCheckService } = require('./handlers/apiChecker');
const { FtpService } = require('./handlers/ftpService');
const { DockerService } = require('./handlers/dockerService');
const { ConfigService } = require('./handlers/configService');

const isDev =  !app.isPackaged

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'remoter',
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js')
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:4000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  if(isDev){
    mainWindow.webContents.openDevTools();
  }

};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});



ipcMain.on('native:ips', getLocalIps);
ipcMain.on('getInitialDirectory', NativeDirectories.getInitialDirectory);
ipcMain.on('getDirectoryContents', NativeDirectories.getDirectoryContents);
ipcMain.on('goToParentDirectory', NativeDirectories.goToParentDirectory);
ipcMain.on('openDirectory', NativeDirectories.openDirectory);
ipcMain.on('apiCheck:checkUrl:send', ApiCheckService.checkApiEndpoint);
ipcMain.on('FtpService:ftpCheck:send', FtpService.ftpCheck);
ipcMain.on('DockerService:deploy:send', DockerService.deploy);
ipcMain.on('FtpService:getDirectoryContents:send', FtpService.getDirectoryContents);
ipcMain.on('ConfigService:createConfig:send', ConfigService.createConfig);
ipcMain.on('ConfigService:createMeida:send', ConfigService.createMeida);
ipcMain.on('ConfigService:createFiles:send', ConfigService.createFiles);
ipcMain.on('ConfigService:executeBash:send', ConfigService.executeBash);
ipcMain.on('DockerService:cloneRepository:send', DockerService.cloneRepository);
ipcMain.on('DockerService:openWebSite:send', DockerService.openWebSite);
ipcMain.on('DockerService:getProjects:send', DockerService.getProjects);
ipcMain.on('DockerService:stopDocker:send', DockerService.stopDocker);
ipcMain.on('ConfigService:openFolder:send', ConfigService.openFolder);
ipcMain.on('DockerService:executeCron:send', DockerService.executeCron);