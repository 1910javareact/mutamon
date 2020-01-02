import { mutamonUserLogin } from "../remote/mutamon-clients/mutamon-users"
import { mutamonApiGetCurrentMonsterById } from "../remote/mutamon-clients/mutamon-mutamon"

export const userLoginTypes = {
    INVALID_CREDENTIALS: 'MM_LOGIN_INVALID_CREDENTIALS',
    SUCCESSFUL_LOGIN: 'MM_LOGIN_SUCCESSFUL_LOGIN',
    UNSUCCESSFUL_LOGIN: 'MM_LOGIN_UNSUCCESSFUL_LOGIN',
    STATE_CLEARED: 'STATE_CLEARED',
    SUCCESSFUL_GET_CURRENT_MUTAMON: 'CURRENT_MM_RECIEVED',
    UNSUCCESSFUL_GET_CURRENT_MUTAMON: 'CURRENT_MM_NOT_RECIEVED'
}

export const userLogin = (username: string, password: string) => async (dispatch: any) => {
    try {
        const res = await mutamonUserLogin(username, password)
        if (res.status === 200) {
            dispatch({
                type: userLoginTypes.SUCCESSFUL_LOGIN,
                payload: {
                    user: res.body,
                }
            })
        } else {
            dispatch({
                type: userLoginTypes.INVALID_CREDENTIALS
            })
        }
    }catch(e){
        dispatch({
            type:userLoginTypes.UNSUCCESSFUL_LOGIN
        })
    }
    
}

export const currentUserMutamon = (userId: number) => async (dispatch: any) => {
    try {
        const res = await mutamonApiGetCurrentMonsterById(userId)
        if (res.status === 200) {
            dispatch({
                type: userLoginTypes.SUCCESSFUL_GET_CURRENT_MUTAMON,
                payload: {
                    currentMutamon: res.body,
                }
            })
        }
    }catch(e){
        dispatch({
            type:userLoginTypes.UNSUCCESSFUL_GET_CURRENT_MUTAMON
        })
    }
    
}

export const clearState = () => {    
    return{
        type: userLoginTypes.STATE_CLEARED,
        payload: {
        }
    }
}