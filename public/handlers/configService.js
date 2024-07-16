const { app,shell } = require('electron');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function createFolder(folderPath) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(folderPath)) {
            resolve(true);
        } else {
            fs.mkdir(folderPath, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating folder:', err);
                    resolve(false); 
                } else {
                    resolve(true); 
                }
            });
        }
    });
}

function createJsonFile(folderPath, json) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(folderPath, 'global.js');
        const globalJs = `
        global.settings = {
            title: "${json?.title}",
            description: "${json?.description},
            minimumPrice: ${json?.minimumPrice},
            deliveryPrice: ${json?.deliveryPrice},
            isWithStock: ${json?.isWithStock},
            isOpenWorld: ${json?.isOpenWorld},
            email: "${json?.email}",
            location: "${json?.location}",
            phoneSupport: "${json?.phoneSupport}",
            fax: "${json?.fax}",
            footerDescription1: "${json?.footerDescription1}",
            footerDescription2: "${json?.footerDescription2}",
            footerDescription3: "${json?.footerDescription3}",
            primaryColor: "${json?.primaryColor}",
            secondaryColor: "${json?.secondaryColor}",
            oneSignalKey: "${json?.oneSignalKey}",
            paymentSystem: "${json?.paymentSystem}"
        }
        `;
        fs.writeFile(filePath, globalJs, (err) => {
            if (err) {
                console.error('Error writing .env file:', err);
                resolve(false); // Resolve with false if there's an error
            } else {
                console.log('.env file has been created successfully in', filePath);
                resolve(true); // Resolve with true if successful
            }
        });
    });
}

function createEnvFile(folderPath, data) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(folderPath, '.env');
        const envContent = `
# In all environments, the following files are loaded if they exist,
# the latter taking precedence over the former:
#
#  * .env                contains default values for the environment variables needed by the app
#  * .env.local          uncommitted file with local overrides
#  * .env.$APP_ENV       committed environment-specific defaults
#  * .env.$APP_ENV.local uncommitted environment-specific overrides
#
# Real environment variables win over .env files.
#
# DO NOT DEFINE PRODUCTION SECRETS IN THIS FILE NOR IN ANY OTHER COMMITTED FILES.
# https://symfony.com/doc/current/configuration/secrets.html
#
# Run "composer dump-env prod" to compile .env files for production use (requires symfony/flex >=1.2).
# https://symfony.com/doc/current/best_practices.html#use-environment-variables-for-infrastructure-configuration

###> symfony/framework-bundle ###
APP_ENV=dev
APP_SECRET=90459d5cc76b79a85bb30a81236feefa
###< symfony/framework-bundle ###

###> doctrine/doctrine-bundle ###
# Format described at https://www.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/configuration.html#connecting-using-a-url
# IMPORTANT: You MUST configure your server version, either here or in config/packages/doctrine.yaml
#
# DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
# DATABASE_URL="mysql://app:!ChangeMe!@127.0.0.1:3306/app?serverVersion=8.0.32&charset=utf8mb4"
# DATABASE_URL="mysql://app:!ChangeMe!@127.0.0.1:3306/app?serverVersion=10.11.2-MariaDB&charset=utf8mb4"
DATABASE_URL="mysql://root:secret@mysql8-service:3306/app?serverVersion=15&charset=utf8"
###< doctrine/doctrine-bundle ###

###> nelmio/cors-bundle ###
CORS_ALLOW_ORIGIN='^.*$'
###< nelmio/cors-bundle ###

###> lexik/jwt-authentication-bundle ###
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=701ac75f16f09b77dc7745f8c1ffb1823c1eb85e1ccd8c4f0dd51736e58dbdc3
###< lexik/jwt-authentication-bundle ###

# ========= DEPLOY CONFIG (Images Serivce || FTP Service) =========
VPS_1_SERVER=3.68.115.205
VPS_1_USERNAME=july
VPS_1_PASSWORD=lE1wE2sP5i
VPS_1_FOLDER=digitrade.com.ua
VPS_1_OUTPUT_FOLDER=output
DOMAIN_IMAGE=https://foodappeal-b2b.com/src/img/
NOTIFICATION_IDENTIFIER=ceremonitea

# ========= ERP CONFIG (Online and Cron services)=========
ERP_TYPE=${data.erp}
ERP_USERNAME=${data.username}
ERP_PASSWORD=${data.password}
ERP_URL=${data.api}
ERP_DB=${data.db}

# ========= IMAGE STATE =========
IMAGE_STATE=${data.imageState}
FTP_HOST=${data.ftpHost}
FTP_USERNAME=${data.ftpUsername}
FTP_PASSWORD=${data.ftpPassword}

# ========= CATEGORY STATE =========
CATEGORY_STATE=${data.categoryState}
CATEGORY_LVL_1=${data.categoryLvl1}
CATEGORY_LVL_2=${data.categoryLvl2}
CATEGORY_LVL_3 =${data.categoryLvl3}

# ========= USER =========
TEST_USER=${data.testUser}


# ========= CONFIGURATION =========
TITLE=${data.title}
DESCRIPTION=${data.description}
MINIMUM_PRICE=${data.minimumPrice}
DELIVERY_PRICE=${data.deliveryPrice}
IS_WITH_STOCK=${data.isWithStock}
IS_WITH_MIGVAN=${data.isWithMigvan}

# ========= INTEGRATION =========
ONE_SIGNAL_APP_ID=${data.oneSignalApi}
ONE_SIGNAL_KEY=${data.oneSignalKey}
SMS_CENTER=${data.smsCenter}
SMS_TOKEN=${data.smsToken}
PAYMENT_SYSTEM=${data.paymentSystem}
SUCCESS_LINK=${data.successLink}
ERROR_LINK=${data.errorLink}
MASOF=${data.masof}
YAD_KEY=${data.yadKey}
PASSP=${data.passp}
DOMAIN=${data.domain}
        `;
        
        fs.writeFile(filePath, envContent, (err) => {
            if (err) {
                console.error('Error writing .env file:', err);
                resolve(false); // Resolve with false if there's an error
            } else {
                console.log('.env file has been created successfully in', filePath);
                resolve(true); // Resolve with true if successful
            }
        });
    });
}

function mediaUploader(folderPath, base64, fileName) {
    try {
        // Validate the Base64 string
        const matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches) {
            throw new Error('Invalid Base64 string');
        }

        const fileContents = Buffer.from(matches[2], 'base64');

        // Ensure the folder exists
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Create the file path
        const filePath = path.join(folderPath, fileName);

        // Write the file
        fs.writeFileSync(filePath, fileContents, 'binary');
        console.log(`File saved to ${filePath}`);
        return true;
    } catch (error) {
        console.error(`Error saving file: ${error.message}`);
        return false;
    }
}

function copyFileName(destinationFolderr,sourcee) {
    const source = path.join(__dirname, 'setup.sh'); 
    const destinationFolder = destinationFolderr;
    fs.mkdirSync(destinationFolder, { recursive: true });
    const destination = path.join(destinationFolder, 'setup.sh');
    fs.copyFile(source, destination, (err) => {
      if (err) {
        console.error('Error copying file:', err);
      } else {
        console.log(`${source} was copied to ${destination}`);
        fs.chmod(destination, '755', (chmodErr) => {
          if (chmodErr) {
            console.error('Error setting execute permissions:', chmodErr);
          } else {
            console.log('Execute permissions set for', destination);
          }
        });
      }
    });
}

function copyFolder(source, destination) {
    // Check if source folder exists
    if (!fs.existsSync(source)) {
      throw new Error(`Source folder "${source}" does not exist.`);
    }
  
    // Create the destination folder if it doesn't exist (asynchronous)
    fs.mkdir(destination, { recursive: true }, (err) => {
      if (err) {
        throw new Error(`Error creating destination folder "${destination}": ${err.message}`);
      }
  
      // Read contents of the source folder
      fs.readdir(source, (err, files) => {
        if (err) {
          throw new Error(`Error reading source folder "${source}": ${err.message}`);
        }
  
        for (const file of files) {
          const sourcePath = path.join(source, file);
          const destPath = path.join(destination, file);
  
          // Check if it's a file or a subfolder
          fs.stat(sourcePath, (err, stats) => {
            if (err) {
              throw new Error(`Error getting stats for "${sourcePath}": ${err.message}`);
            }
  
            if (stats.isDirectory()) {
              // Recursively call copyFolder for subfolders (asynchronous)
              copyFolder(sourcePath, destPath);
            } else {
              // Copy the file (asynchronous)
              const readStream = fs.createReadStream(sourcePath);
              const writeStream = fs.createWriteStream(destPath);
  
              readStream.on('error', (err) => {
                throw new Error(`Error reading file "${sourcePath}": ${err.message}`);
              });
  
              writeStream.on('error', (err) => {
                throw new Error(`Error writing file "${destPath}": ${err.message}`);
              });
  
              readStream.on('close', () => {
                console.log(`Copied file: ${sourcePath} to ${destPath}`); // Optional: Log completion
              });
  
              readStream.pipe(writeStream);
            }
          });
        }
      });
    });
}

const ConfigService = {
    async createConfig(event, data) {
        const json = data;
        const workingDir = app.getPath('userData') + '/projects'
        const isCreatedMainDir = await createFolder(workingDir)
        const folder = app.getPath('userData')  + '/projects/' + json.title
        console.log('folder',folder)
        const isCreated = await createFolder(folder)
        console.log('isCreated',isCreated)
        if(isCreated){
            event.sender.send('ConfigService:createConfig:response', {result:"success", folderPath:folder,  message:""});
        } else {
            event.sender.send('ConfigService:createConfig:response', {result:"error", folderPath:folder, message:""});
        }
    },

    async createFiles(event, data) {
        const json = data;
        console.log('json',json)
        const jsonFilePath = json.folderPath;
        const envFilePath = json.folderPath;
        const isCreatedJsonFile = await createJsonFile(jsonFilePath,json)
        console.log('isCreatedJsonFile',isCreatedJsonFile)
        const isCreatedEnvFile =  await createEnvFile(envFilePath,json)
        console.log('isCreatedEnvFile',isCreatedEnvFile)
        const copySetupSh = await copyFileName(envFilePath,'setup.sh')
        console.log('copySetupSh',copySetupSh)
        if(isCreatedJsonFile && isCreatedEnvFile) {
            event.sender.send('ConfigService:createFiles:response', {result:"success",  message:""});
        } else {
            event.sender.send('ConfigService:createFiles:response', {result:"error", message:""});
        }
    },

    async createMeida(event,data){
        const json = data;
        const folder = json.folderPath
        console.log('folder',folder)
        const isCreated = await mediaUploader(folder+'/media' , json.base64 , json.fileName)
        const currentDir = __dirname; // Get the current directory path
        const mediaPath = path.join(currentDir, '../media'); 
        const copyFolderImage = copyFolder(mediaPath,folder+'/media')
        console.log('copyFolderImage',copyFolderImage)
        if(isCreated){
            event.sender.send('ConfigService:createMeida:response', {result:"success", folderPath:folder,  message:""});
        } else {
            event.sender.send('ConfigService:createMeida:response', {result:"error", folderPath:folder, message:""});
        }
    },

    async executeBash(event, data) {
        const json = data;
        const folder = json.folderPath;
        const projectTitle = json.projectTitle;
        const scriptPath = 'setup.sh';
    
        console.log('scriptPath', `${folder}/${scriptPath}`);
        console.log('-------', `sh "${scriptPath}" "${projectTitle}"`, '--------');
    
        exec(`bash "${scriptPath}" "${projectTitle}"`, { cwd: folder }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error}`);
                event.sender.send('ConfigService:executeBash:response', {
                    result: "error",
                    message: stderr || error.message
                });
                return;
            }
    
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
    
            const isCreated = true; 
    
            if (isCreated) {
                event.sender.send('ConfigService:executeBash:response', {
                    result: "success",
                    message: stdout
                });
            } else {
                event.sender.send('ConfigService:executeBash:response', {
                    result: "error",
                    message: stderr
                });
            }
        });
    },

    async openFolder(event,data){
        const json = data;
        const folderPath = json.path; 
        try {
            await shell.openPath(folderPath);
            console.log(`Opened folder: ${folderPath}`);
        } catch (error) {
            console.error(`Failed to open folder: ${error.message}`);
        }
    }
};

module.exports = { ConfigService };
