import { mutamonApiGetOpponentMonsterByLevel } from "../remote/mutamon-clients/mutamon-mutamon"


export const opponentTypes = {
    SUCCESSFUL_LOAD: 'CPU_SUCCESSFUL_LOAD',
    UNSUCCESSFUL_LOAD: 'CPU_UNSUCCESSFUL_LOAD',
    STATE_CLEARED: 'CPU_STATE_CLEARED',
}

export const currentOpponentMutamon = (level: number) => async (dispatch: any) => {
    try {
        const res = await mutamonApiGetOpponentMonsterByLevel(level)
        if (res.status === 200) {
            dispatch({
                type: opponentTypes.SUCCESSFUL_LOAD,
                payload: {
                    opponentMutamon: res.body,
                }
            })
        }
        else {
            dispatch({
                type: opponentTypes.UNSUCCESSFUL_LOAD
            })
        }
    }
    catch(e){
        dispatch({
            type: opponentTypes.UNSUCCESSFUL_LOAD
        })
    }
}

export const clearState = () =>{
    return{
        type: opponentTypes.STATE_CLEARED,
        payload:{}
    }
}