import { mutamonClient } from "./mutamon-client";

export async function mutamonApiGetWinningMonstersById(userId: number){

    try{
        const response = await mutamonClient.get('/mutamon/hof/userId/' + userId)
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