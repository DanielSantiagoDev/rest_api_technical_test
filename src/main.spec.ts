import {Rest_handler} from './Rest_handler';

const USER_CONFIG = require('../config.json');
const USER    = USER_CONFIG.USER
const ACCOUNT = USER_CONFIG.ACCOUNT;
const PRODUCT = USER_CONFIG.PRODUCT;

const Example_Asset_Id = "danisantiago.luengo3" //Asset retrieved from a GET

describe('API Test',  () => {



    it('Correct Login should return a user and a token and store it on the class', async () => {
      const USER    = { username: 'danisantiago.luengo', password: 'ogneul.ogaitnasinad' };
      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
      let response = await rest.login();

      expect(response.http_code === 200).toEqual(true);
      expect(typeof response.data.token).toBe("string");
      expect(response.data.token.length > 1).toEqual(true);
      expect(response.data.user._id.length > 1 ).toEqual(true)
      expect(response.data.token === rest.token ).toEqual(true)
      
    })

    it('Failed Login should throw and error with code 401', async () => {
      const USER    = { username: 'danisantiago.luengo2', password: 'ogneul.ogaitnasinad' };
      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);

      rest.login().then(()=>{}).catch((err)=>{
        expect(err.response.status).toEqual(401);
      });  
    })



    it('Creating a user into an account should return the created user', async () => {

      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
      let name = "Jose Luis_" + Math.random() * (200000 - 1) + 1; //ramdom, number on range to create random users
      let mail = "danisantiago.luengo@gmail.com"
      let status = "active"
      let response = await rest.create_user_on_account(ACCOUNT.accountId,name,"pwdd",mail,status);

      expect(response.http_code === 200).toEqual(true);
      expect(response.data.email).toEqual("danisantiago.luengo@gmail.com");
      expect(response.data.username ).toEqual(name)
      expect(response.data.status ).toEqual(status)
      
    })

    it('Creating an already created user should return an error', async () => {

      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
      let name = "Jose Luis_" //this username should already exist
      let mail = "danisantiago.luengo@gmail.com"
      let status = "active"
      

      rest.create_user_on_account(ACCOUNT.accountId,name,"pwdd",mail,status).then(()=>{}).catch((err)=>{
        expect(err.response.status).toEqual(400);
      });

    })


    it('Listing all the assets should the return all the assets associated with the account', async () => {

      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
  
      let response = await rest.list_assets(ACCOUNT.accountId);

      expect(response.http_code === 200).toEqual(true);
      expect(Array.isArray(response.data)).toEqual(true);
      expect(response.data.length > 0 ).toEqual(true)
      expect(response.data[0].ownerAccountId ).toEqual(ACCOUNT.accountId)
      
    })

    it('Listing the assests of a wrong account ID should return a not found error', async () => {
      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
      rest.list_assets(ACCOUNT.accountId + "wrong_id").then(()=>{}).catch((err)=>{
        expect(err.response.status).toEqual(404);
      });
    })

    it('Subscribing and activating an asset should return activation data', async () => {

      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
  
      let response = await rest.activate_and_subscribe_asset(Example_Asset_Id,ACCOUNT.accountId,PRODUCT.id);

      expect(response.http_code === 200).toEqual(true);
      expect(response.data.iccid).toEqual(Example_Asset_Id);
      expect(response.data.status === "active" ).toEqual(true)
      expect(response.data.ownerAccountId ).toEqual(ACCOUNT.accountId)
      
    })

    it('Subscribing and already activated asset should return an already subscribed status', async () => {
      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
  
     

      rest.activate_and_subscribe_asset(Example_Asset_Id,ACCOUNT.accountId,PRODUCT.id).then(()=>{}).catch((err)=>{
        expect(err.response.status).toEqual(500);
      
      });
    })

    it('Bulk activation of assets should return a bulk process object', async () => {

      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
  
      let response = await rest.activate_and_subscribe_all_assets(Example_Asset_Id,ACCOUNT.accountId,PRODUCT.id);

      expect(response.http_code === 202).toEqual(true);
      expect(response.data.accountId).toEqual(ACCOUNT.accountId);
      expect(response.data.type ).toEqual("bulk_action_subscribe_main")
      
      
    })


    it('Bulk asset activation with the wrong data should return an error', async () => {
      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);

      rest.activate_and_subscribe_all_assets(Example_Asset_Id + "wrong_id",ACCOUNT.accountId,PRODUCT.id).then(()=>{}).catch((err)=>{
        expect(err.response.status).toEqual(404);
      });
    })



})

