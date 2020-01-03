import { IOpponentState } from ".";
import { Monster } from "../models/monster";
import { opponentTypes } from "../action-mappers/opponent-action-mapper";



const intitialState: IOpponentState = {
    opponentMutamon: new Monster(0,0,0,'',0,false,[]),
}

export const opponentReducer = (state = intitialState, action:any) =>{
    switch(action.type){
        case opponentTypes.SUCCESSFUL_LOAD:{
            return{
                ...state,
                opponent: action.payload.opponentMutamon
            }
        }
        case opponentTypes.UNSUCCESSFUL_LOAD:{
            return{
                ...state,
                opponent: intitialState.opponentMutamon
            }
        }
        case opponentTypes.STATE_CLEARED:{
            return{
                opponent: intitialState.opponentMutamon
            }
        }
        default:
            return state
    }
}