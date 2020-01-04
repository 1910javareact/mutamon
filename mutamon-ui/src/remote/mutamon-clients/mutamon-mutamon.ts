import { mutamonClient } from "./mutamon-client";
import { Monster } from "../../models/monster";

export async function mutamonApiGetWinningMonstersById(userId: number){

    try{
        const response = await mutamonClient.get('/mutamon/hof/userid/' + userId)
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

export async function mutamonApiGetCurrentMonsterById(userId: number){
    try{
        const response = await mutamonClient.get('/mutamon/' + userId)
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

export async function mutamonApiUpdateMonster(monster: Monster){
    console.log(monster);
    
    const body = {
        ...monster
    }

    try{        
        const response = await mutamonClient.patch('/mutamon',body)
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

export async function mutamonApiGetOpponentMonsterByLevel(level: number){
    try{
        const response = await mutamonClient.get('/mutamon/opponent/' + level)
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