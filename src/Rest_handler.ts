import axios, {AxiosResponse, AxiosError } from 'axios';


import { LoginResponseType } from './interfaces';

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
        let response = await this.call_api<LoginResponseType>("post","/auth/token", body);
        this.token = response.data.token;
        return response;
    }

    async call_api<Type>(method: keyof typeof Method ,path:string,body?:any){
        try{
            let response : AxiosResponse<Type>;
            if(body === undefined){
                response =  await axios[method]<Type>(this.base_url + path);
            }else{
                console.log(this.base_url + path)
                console.log(body)
                response =  await axios[method]<Type>(this.base_url + path,body);
            }

            return {data : response.data,http_code : response.status};
        } catch(err) {
           
            const errors = err as Error | AxiosError;
            if(!axios.isAxiosError(errors)){
                throw err;
            }else{
                console.log("error code : " + errors.response?.status);
                console.log("error code : " , errors.response?.data.headers ); 
                throw err;  
            }
        }
    }



}