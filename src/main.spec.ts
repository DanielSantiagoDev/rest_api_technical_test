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


    it('Listing all the assets should the return all the assets associated with the account', async () => {

      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
  
      let response = await rest.list_assets(ACCOUNT.accountId);

      expect(response.http_code === 200).toEqual(true);
      expect(Array.isArray(response.data)).toEqual(true);
      expect(response.data.length > 0 ).toEqual(true)
      expect(response.data[0].ownerAccountId ).toEqual(ACCOUNT.accountId)
      
    })


    it('Bulk activation of assets should return a bulk process object', async () => {

      const rest = new Rest_handler("https://hummingbird-staging.podgroup.com/v3/",USER.username,USER.password);
  
      let response = await rest.activate_and_subscribe_all_assets(Example_Asset_Id,ACCOUNT.accountId,PRODUCT.id);

      expect(response.http_code === 202).toEqual(true);
      expect(response.data.accountId).toEqual(ACCOUNT.accountId);
      expect(response.data.type ).toEqual("bulk_action_subscribe_main")
      
      
    })



})

