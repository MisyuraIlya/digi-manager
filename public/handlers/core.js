const { exec } = require('child_process');
const os = require('os');
const http = require('http');
const ping = require('ping');

async function getLocalIps(event, args) {
  const networkInterfaces = os.networkInterfaces();
  let localIpAddress;

  Object.keys(networkInterfaces).forEach(interfaceName => {
      const networkInterface = networkInterfaces[interfaceName];
      networkInterface.forEach(iface => {
          // Filter IPv4 addresses
          if (iface.family === 'IPv4') {
              // Check if it's not a loopback address
              if (!iface.internal) {
                  localIpAddress = iface.address;
              }
          }
      });
  });
  const ipifyResponse = await getPublicIP();
  const connectedDevices = await scanLocalNetwork();
  event.sender.send('native:ips:response', {localIp:localIpAddress, publicIp:ipifyResponse,connectedDevices:connectedDevices}); 

}

function getPublicIP() {
  return new Promise((resolve, reject) => {
      const options = {
          hostname: 'api.ipify.org',
          port: 80,
          path: '/',
          method: 'GET'
      };

      const req = http.get(options, (res) => {
          let data = '';

          res.on('data', (chunk) => {
              data += chunk;
          });

          res.on('end', () => {
              resolve(data);
          });
      });

      req.on('error', (error) => {
          reject(error);
      });

      req.end();
  });
}

function scanLocalNetwork() {
  return new Promise((resolve, reject) => {
      const localIpPrefix = '192.168.1.'; // Modify this according to your local network range
      const connectedDevices = [];

      const promises = [];

      for (let i = 1; i <= 255; i++) {
          const host = localIpPrefix + i;
          promises.push(ping.promise.probe(host));
      }

      Promise.all(promises)
          .then(results => {
              results.forEach(result => {
                  if (result.alive) {
                      connectedDevices.push(result.host);
                  }
              });
              resolve(connectedDevices);
          })
          .catch(error => {
              reject(error);
          });
  });
}

module.exports = { getLocalIps };