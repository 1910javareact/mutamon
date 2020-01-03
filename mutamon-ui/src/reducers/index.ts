import { combineReducers } from "redux"
import { Monster } from "../models/monster";
import { User } from "../models/user";
import { loginReducer } from "./login-reducer";

import { opponentReducer } from "./opponent-reducer";

export interface IState {
    login: ILoginState
}

export interface ILoginState {
    user: User,
    currentMutamon: Monster
}

export interface IOpponentState{
    opponentMutamon: Monster
}

export interface IState {
    login: ILoginState
    opponent: IOpponentState
}



export const state = combineReducers <IState>({
    login: loginReducer,
    opponent: opponentReducer
})