import * as api from "../api/index"
import { Toast } from "../components/tost/Toast"
import { AUTH } from "./action.Type"


export const signin = (fromData,navigate) => async (dispatch) => {
    try {
        const {data} = await api.signIn(fromData)
        dispatch({type: AUTH, payload: data})
        Toast('success',"Success")
        navigate('/')
    } catch (err) {
        Toast("error",err.response.data.message)
    }
}


export const signup = (fromData,navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(fromData)
        dispatch({type: AUTH, payload: data})
        navigate('/')
        Toast('success',"Successfuly created account")
    } catch (err) {
        Toast("error",err.response.data.message)
    }
}