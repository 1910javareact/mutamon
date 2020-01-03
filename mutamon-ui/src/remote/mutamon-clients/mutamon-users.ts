import { mutamonClient } from "./mutamon-client";

export async function mutamonUserLogin(username: string, password: string){

    const credentials = {
        username,
        password
    }

    try{
        let response = await mutamonClient.post('users/login', credentials)
        if(response.status === 200){
            return{
                status: response.status,
                body: response.data,
                header: response.headers
            }
        }else{
            return {
                status: response.status,
                body: undefined
            }
        }
    }catch(e){
        console.log(e);
        throw new Error('Something Went Wrong')
    }
}

export async function mutamonApiMakeNewUser(username: string, password: string){
    const credentials = {
        username,
        password
    }

    try{
        let response = await mutamonClient.post('users', credentials)
        if(response.status === 200){
            return{
                status: response.status,
                body: response.data,
                header: response.headers
            }
        }else{
            return {
                status: response.status,
                body: undefined
            }
        }
    }catch(e){
        console.log(e);
        throw new Error('Something Went Wrong')
    }
}