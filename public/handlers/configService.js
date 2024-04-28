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

function createJsonFile(folderPath,json){
    const jsonData = JSON.stringify(json, null, 2);
    const filePath = path.join(folderPath, 'config.json');
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing config.json file:', err);
        } else {
            console.log('config.json file has been created successfully in', filePath);
        }
    });
}

function createEnvFile(folderPath){
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
    ERP_TYPE=Priority
    ERP_USERNAME=dataportal
    ERP_PASSWORD=54362
    ERP_URL=https://app1.medi-market.co.il:50081/odata/Priority/tabula.ini/medi
    
    # ========= SEND ORDER CONFIG =========
    IS_MUST_DELIVERY_PRICE=true
    MINIMUM_DELIVERY_PRICE=250
    
    #if client want set discount for client has reached the price
    IS_MAX_ORDER_DISCOUNT=true
    MAX_PRICE_FOR_DISCOUNT=750
    DISCOUNT_PRECENT_FOR_MAX_PRICE=7
     
    # # ========= CONFIG =========
    IS_USED_MIGVAN=false
    IS_ONLINE_PRICE=false
    IS_ONLINE_STOCK=flase
    IS_ONLINE_MIGVAN=false
    `;
    
    fs.writeFile(filePath, envContent, (err) => {
        if (err) {
            console.error('Error writing .env file:', err);
            return
        } else {
            console.log('.env file has been created successfully in', filePath);
        }
    });
}

const ConfigService = {
    async createConfig(event, data) {
        const json = data;
        const folder = app.getPath('userData')  + '/' + json.title
        const isCreated = createFolder(folder)
        if(isCreated){
            const isCreatedJsonFile = createJsonFile(folder,json)
            const isCreatedEnvFile = createEnvFile(folder)
            console.log('json',json)
        }
    },
};

module.exports = { ConfigService };
