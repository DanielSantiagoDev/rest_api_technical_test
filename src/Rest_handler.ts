import axios, {AxiosResponse, AxiosError } from 'axios';


import { LoginResponseType, CreateUserResponseType, ListAssetsType,SubscribeAssetResponse,BulkResponseType } from './interfaces';

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
        let response = await this.call_api<LoginResponseType>("post","auth/token", body,undefined,false);
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
        return await this.call_api<CreateUserResponseType>("post","users",body)
    }

    async list_assets(account_id:string){
        let args = {accountId:account_id};
        return await this.call_api<ListAssetsType>("get","assets",undefined,args);
    }

    async activate_and_subscribe_asset(asset_id:string,account_id:string,product_id:string){
        let d = new Date();
        let body = {
            accountId : account_id,
            subscription : {
                subscriberAccountId : account_id,
                productId : product_id,
                startTime : undefined,

            }
        }
        return await this.call_api<SubscribeAssetResponse>("put","assets/"+asset_id+"/subscribe",body);
    }

    async activate_and_subscribe_all_assets(asset_id:string,account_id:string,product_id:string){
        let d = new Date();

        let params = {accountId :account_id};

        let body = {
            data : {
                subscription : {
                    subscriberAccountId : account_id,
                    productId : product_id,
                    startTime : d.getDate() + "/" + d.getMonth() + 1 + "/" + d.getFullYear(),
                    ipPools : [
                        {
                            "carrier": "TEST",
                            "poolId": "TEST"
                        }
                    ]
                }
            }
        }
        return await this.call_api<BulkResponseType>("post","bulk/assets/subscribe",body,params);
    }
    
    async call_api<Type>(method: keyof typeof Method ,path:string,body?:any,params?:any,auth_required:boolean = true){
        try{
            let response : AxiosResponse<Type>;

            let config = {
                method  : method,
                url     : this.base_url + path,
                headers : {},
                data    : body,
                params  : params
            }
            
            if(auth_required === true && this.token === ""){
                let login = await this.login()
                this.token = login.data.token;
            }

            if(auth_required === true){
                config.headers =  {"x-access-token" : this.token}
            }

            response = await axios.request<Type>(config);
            return {data : response.data,http_code : response.status};

        } catch(err) {
           
            const errors = err as Error | AxiosError;
            if(!axios.isAxiosError(errors)){
                throw err;
            }else{
                //console.log("error status : " + errors.response?.status);
                //console.log("error info : " , errors.response?.data ); 
                
                throw errors;  
            }
        }
    }



}