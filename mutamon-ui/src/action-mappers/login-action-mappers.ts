import { mutamonUserLogin } from "../remote/mutamon-clients/mutamon-users"
import { mutamonApiGetCurrentMonsterById, mutamonApiUpdateMonster } from "../remote/mutamon-clients/mutamon-mutamon"
import { Monster } from "../models/monster"

export const userLoginTypes = {
    INVALID_CREDENTIALS: 'MM_LOGIN_INVALID_CREDENTIALS',
    SUCCESSFUL_LOGIN: 'MM_LOGIN_SUCCESSFUL_LOGIN',
    UNSUCCESSFUL_LOGIN: 'MM_LOGIN_UNSUCCESSFUL_LOGIN',
    STATE_CLEARED: 'STATE_CLEARED',
    SUCCESSFUL_GET_CURRENT_MUTAMON: 'CURRENT_MM_RECIEVED',
    UNSUCCESSFUL_GET_CURRENT_MUTAMON: 'CURRENT_MM_NOT_RECIEVED',
    MUTAMON_UPDATED: 'MUTAMON_UPDATED',
    MUTAMON_FAILED_TO_UPDATE: 'MUTAMON_FAILED_TO_UPDATE'
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
    } catch (e) {
        dispatch({
            type: userLoginTypes.UNSUCCESSFUL_LOGIN
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
        } else {
            dispatch({
                type: userLoginTypes.UNSUCCESSFUL_GET_CURRENT_MUTAMON
            })
        }
    } catch (e) {
        dispatch({
            type: userLoginTypes.UNSUCCESSFUL_GET_CURRENT_MUTAMON
        })
    }

}

export const clearState = () => {
    return {
        type: userLoginTypes.STATE_CLEARED,
        payload: {
        }
    }
}

export const updateCurrentMutamon = (monster: Monster) => async (dispatch: any) => {
    try {
        let res = await mutamonApiUpdateMonster(monster)
        console.log(res.status);
        
        if (res.status === 200) {
            dispatch({
                type: userLoginTypes.MUTAMON_UPDATED,
                payload: {
                    currentMutamon: monster
                }
            })
        } else {
            dispatch({
                type: userLoginTypes.MUTAMON_FAILED_TO_UPDATE
            })
        }
    } catch (e) {
        dispatch({
            type: userLoginTypes.MUTAMON_FAILED_TO_UPDATE
        })
    }

    return {

    }
}