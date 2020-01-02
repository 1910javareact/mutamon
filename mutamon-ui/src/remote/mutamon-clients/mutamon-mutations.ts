import { mutamonClient } from "./mutamon-client";

export async function mutamonApiGetMutationChoices(level: number){
    try{
        let response = await mutamonClient.get('/mutations/' + level)
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
    } catch (e) {
        console.log(e);
        throw new Error('Something Went Wrong')
    }
}