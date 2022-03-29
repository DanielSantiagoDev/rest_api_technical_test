


console.log("starting..")

import {Rest_handler} from './Rest_handler';


const USER    = { username: 'danisantiago.luengo2', password: 'ogneul.ogaitnasinad' };
const ACCOUNT = {
    accountName: 'Tecnical Test danisantiago.luengo',
    accountId: '15c2e804-4054-5b0c-b941-74c82d7db095'
}

const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);

async function start(){
    try{
        let res = await rest.login();
        console.log(res);
    }catch(error){
        console.log("hubo un error")
    }
}

start();