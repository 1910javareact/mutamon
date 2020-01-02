import { ILoginState } from ".";
import { User } from "../models/user";
import { userLoginTypes } from "../action-mappers/login-action-mappers";

const initialState: ILoginState = {
    user: new User(0,'',''),
}

export const loginReducer = (state = initialState, action:any)=>{
    switch(action.type){
        case userLoginTypes.SUCCESSFUL_LOGIN:{
            return{
                ...state,
                user:action.payload.user,
            }
        }
        case userLoginTypes.STATE_CLEARED:{
            return{
                user: initialState.user,
            }
        }
        default:
            return state
    }
}