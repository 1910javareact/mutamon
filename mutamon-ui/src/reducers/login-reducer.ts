import { ILoginState } from ".";
import { User } from "../models/user";
import { userLoginTypes } from "../action-mappers/login-action-mappers";
import { Monster } from "../models/monster";

const initialState: ILoginState = {
    user: new User(0,'',''),
    currentMutamon: new Monster(0,0,0,'',0,false,[])
}

export const loginReducer = (state = initialState, action:any)=>{
    switch(action.type){
        case userLoginTypes.SUCCESSFUL_LOGIN:{
            return{
                ...state,
                user:action.payload.user,
            }
        }
        case userLoginTypes.SUCCESSFUL_GET_CURRENT_MUTAMON:{
            return{
                ...state,
                currentMutamon:action.payload.currentMutamon
            }
        }
        case userLoginTypes.STATE_CLEARED:{
            return{
                user: initialState.user,
                currentMutamon: initialState.currentMutamon
            }
        }
        case userLoginTypes.UNSUCCESSFUL_GET_CURRENT_MUTAMON:{
            return{
                ...state,
                currentMutamon: initialState.currentMutamon
            }
        }
        case userLoginTypes.MUTAMON_UPDATED:{
            return{
                ...state,
                currentMutamon: action.payload.currentMutamon
            }
        }
        default:
            console.log("default");
            return state
    }
}