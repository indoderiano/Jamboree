import Axios from 'axios'
import {APIURL} from '../../supports/ApiUrl'

export const EstablishStore=(userid)=>{
    return (dispatch)=>{
        Axios.get(`${APIURL}/sellers?userid=${userid}`)
        .then((res)=>{
            // console.log(res)
            dispatch({type:'ESTABLISH_STORE',payload:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
}