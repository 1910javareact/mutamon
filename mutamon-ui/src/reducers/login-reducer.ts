import { ILoginState } from ".";
import { User } from "../models/user";

const initialState: ILoginState ={
    user: new User (0,'','')
}



export const loginReducer = (state = initialState, action:any)=>{
    // switch(action.type){
    //     case userLoginTypes.SUCCESSFUL_LOGIN:{
    //         return{
    //             ...state,
    //             user:action.payload.user,
    //             token:action.payload.token
    //         }
    //     }
    //     case userLoginTypes.STATE_CLEARED:{
    //         return{
    //             user: initialState.user,
    //             token: initialState.token
    //         }
    //     }
    //     default:
    //         return state
    // }
    return state
}