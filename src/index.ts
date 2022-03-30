


console.log("starting..")

import {Rest_handler} from './Rest_handler';


const USER_CONFIG = require('../config.json');
const USER    = USER_CONFIG.USER
const ACCOUNT = USER_CONFIG.ACCOUNT;
const PRODUCT = USER_CONFIG.PRODUCT;

const Example_Asset_Id = "danisantiago.luengo7" //Asset retrieved from a GET

const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);

async function start(){
    try{
        //let res = await rest.list_assets(ACCOUNT.accountId);
        let res = await rest.activate_and_subscribe_asset(Example_Asset_Id,ACCOUNT.accountId,PRODUCT.id);
        //let res = await rest.activate_and_subscribe_all_assets(Example_Asset_Id,ACCOUNT.accountId,PRODUCT.id);
        
        console.log((res));
    }catch(error){
        console.log("hubo un error:",error)
    }
}

start();