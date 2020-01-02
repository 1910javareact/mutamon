import { ILoginState } from ".";
import { User } from "../models/user";

const initialState: ILoginState ={
    user: new User (0,'','')
}

export const loginReducer = (state = initialState,action:any)=>{
    return state
}