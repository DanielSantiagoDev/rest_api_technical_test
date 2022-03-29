


console.log("starting..")

import {Rest_handler} from './Rest_handler';


const USER    = { username: 'danisantiago.luengo', password: 'ogneul.ogaitnasinad' };
const ACCOUNT = {
  accountName: 'Tecnical Test danisantiago.luengo',
  accountId: '15c2e804-4054-5b0c-b941-74c82d7db095'
}
const PRODUCT = {
    name: 'Tecnical Test danisantiago.luengo Base Product',
    id: '623df82c22352be6b3c9719d'
}

const Example_Asset_Id = "danisantiago.luengo0" //Asset retrieved from a GET

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