import {Rest_handler} from './Rest_handler';




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



})