import { combineReducers } from "redux"
import { User } from "../models/user";
import { loginReducer } from "./login-reducer";
import { Monster } from "../models/monster";

export interface IState {
    login: ILoginState
}

export interface ILoginState {
    user: User,
    currentMutamon: Monster
}

export interface IState {
    login: ILoginState
}



export const state = combineReducers <IState>({
    login: loginReducer,
})