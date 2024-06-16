const { app } = require('electron');
const fs = require('fs');
const path = require('path');

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
            "erp": "${json?.erp}",
            "api":  "${json?.api}",
            "username": "${json?.username}",
            "password": "${json?.password}",
            "host": "${json?.host}",
            "usernameFtp": "${json?.usernameFtp}",
            "passwordFtp": "${json?.passwordFtp}",
            "db": "${json?.db}",
            "imageState": "${json?.imageState}",
            "title": "${json?.title}",
            "isWithStock": "${json?.isWithStock}",
            "isWithMigvan": "${json?.isWithMigvan}",
            "oneSignalApi": "${json?.oneSignalApi}",
            "smsApi": "${json?.smsApi}",
            "smsToken": "${json?.smsToken}",
        
            "oneSignalKey": "${json?.oneSignalKey}",
            "primaryColor": "${json?.primaryColor}",
            "secondaryColor": "${json?.secondaryColor}",
            "description": "${json?.description}",
            "minimumPrice": "${json?.minimumPrice}",
            "deliveryPrice": "${json?.deliveryPrice}",
            "location": "${json?.location}",
            "email": "${json?.email}",
            "phone": "${json?.phone}" ,
            "fax": "${json?.fax}" ,
            "footerDescription1": "${json?.footerDescription1}",
            "footerDescription2": "${json?.footerDescription2}",
            "footerDescription3": "${json?.footerDescription3}"
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
        DATABASE_URL="mysql://root:secret@localhost:3306/app?serverVersion=15&charset=utf8"
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
        # Types: Priority, ...
        ERP_TYPE=${data.erp}
        ERP_USERNAME=${data.username}
        ERP_PASSWORD=${data.password}
        ERP_URL=${data.api}
        
        # ========= SEND ORDER CONFIG =========
        IS_MUST_DELIVERY_PRICE=true // delete
        MINIMUM_DELIVERY_PRICE=${data.minimumDelivery}
        
        #if client want set discount for client has reached the price
        IS_MAX_ORDER_DISCOUNT=true // delete
        MAX_PRICE_FOR_DISCOUNT=750 // delete
        DISCOUNT_PRECENT_FOR_MAX_PRICE=7 // delete
         
        # # ========= CONFIG =========
        IS_USED_MIGVAN=false
        IS_ONLINE_PRICE=false
        IS_ONLINE_STOCK=flase
        IS_ONLINE_MIGVAN=false
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
      }
    });
}


const ConfigService = {
    async createConfig(event, data) {
        const json = data;
        const folder = app.getPath('userData')  + '/' + json.title
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
        const jsonFilePath = json.folderPath;
        const envFilePath = json.folderPath;
        const isCreatedJsonFile = await createJsonFile(jsonFilePath,json)
        const isCreatedEnvFile =  await createEnvFile(envFilePath,json)
        const copySetupSh = await copyFileName(envFilePath,'setup.sh')
        if(isCreatedJsonFile && isCreatedEnvFile) {
            event.sender.send('ConfigService:createFiles:response', {result:"success",  message:""});
        } else {
            event.sender.send('ConfigService:createFiles:response', {result:"error", message:""});
        }
    },

    async createMeida(event,data){
        const json = data;
        const folder = json.folderPath
        const isCreated = await mediaUploader(folder , json.base64 , json.fileName)
        if(isCreated){
            event.sender.send('ConfigService:createMeida:response', {result:"success", folderPath:folder,  message:""});
        } else {
            event.sender.send('ConfigService:createMeida:response', {result:"error", folderPath:folder, message:""});
        }
    }
};

module.exports = { ConfigService };
