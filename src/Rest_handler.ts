import axios, {AxiosResponse, AxiosError } from 'axios';


import { LoginResponseType, CreateUserResponseType } from './interfaces';

enum Method {get,post,put,delete};


export class Rest_handler {

    base_url : string;
    user     : string;
    password : string;
    token    : string = "";

    constructor (base_url : string, user : string, password : string){
        this.base_url = base_url;
        this.user     = user;
        this.password = password;
    }


    async login() {
        let body = {username : this.user,password:this.password};
        let response = await this.call_api<LoginResponseType>("post","auth/token", body,false);
        this.token = response.data.token;
        return response;
    }

    async create_user_on_account(acc_id:string,username:string,password:string,email:string,status:string){

        let body = {  
            "accountId": acc_id,
            "username": username,
            "password": password,
            "email": email,
            "status": status,
            "permissions" : [
                {
                    accountId:acc_id,
                    roles : ["financial"]
                }
            ]
        }

        return await this.call_api<CreateUserResponseType>("post","users",body,true)
    }

    async call_api<Type>(method: keyof typeof Method ,path:string,body?:any,auth_required:boolean = true){
        try{
            let response : AxiosResponse<Type>;
            let config = {headers:{}}

            if(auth_required === true && this.token === ""){
                console.log("setting...")
                let login = await this.login()
                this.token = login.data.token;
                console.log("setting..." , this.token)
            }
            if(auth_required === true){
                config.headers = {"x-access-token" : this.token}
            }

            if(body === undefined){
                response =  await axios[method]<Type>(this.base_url + path,undefined,config);
            }else{
                console.log(this.base_url + path)
                console.log(body)
                response =  await axios[method]<Type>(this.base_url + path,body,config);
            }

            return {data : response.data,http_code : response.status};

        } catch(err) {
           
            const errors = err as Error | AxiosError;
            if(!axios.isAxiosError(errors)){
                throw err;
            }else{
                console.log("error status : " + errors.response?.status);
                console.log("error info : " , errors.response?.data ); 
                throw err;  
            }
        }
    }



}