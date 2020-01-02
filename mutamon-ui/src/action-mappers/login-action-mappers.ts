import { mutamonUserLogin } from "../remote/mutamon-clients/mutamon-users"

export const userLoginTypes = {
    INVALID_CREDENTIALS: 'GB_LOGIN_INVALID_CREDENTIALS',
    SUCCESSFUL_LOGIN: 'GB_LOGIN_SUCCESSFUL_LOGIN',
    UNSUCCESSFUL_LOGIN: 'GB_LOGIN_UNSUCCESSFUL_LOGIN',
    STATE_CLEARED: 'STATE_CLEARED'
}

export const userLogin = (username: string, password: string) => async (dispatch: any) => {
    try {
        const res = await mutamonUserLogin(username, password)
        if (res.status === 200) {
            dispatch({
                type: userLoginTypes.SUCCESSFUL_LOGIN,
                payload: {
                    user: res.body,
                    token: res.header.token
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

export const clearState = () => {    
    return{
        type: userLoginTypes.STATE_CLEARED,
        payload: {
        }
    }
}