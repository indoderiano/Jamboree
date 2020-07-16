import Axios from 'axios'
import { APIURL } from '../../supports/ApiUrl'
import {LoadTransaction} from './TransactionActions'


// export const Login=()=>{
//     return (dispatch)=>{
//         dispatch({type:'LOADING'})
//         Axios.get(`${APIURL}/users?`)
//     }
// }


export const Register=(user,store)=>{
    // var obj={
    //     username: username,
    //     password: password,
    //     role: role
    // }
    return (dispatch)=>{
        dispatch({type:'LOADING'})

        // register user
        Axios.post(`${APIURL}/users`,user)
        .then((res)=>{
            console.log('register berhasil')
            console.log(res.data)

            // register store if any
            if(res.data.role==='seller'){
                var obj={
                    storename: store.storename,
                    storeimage: store.storeimage,
                    userId: res.data.id
                }
                Axios.post(`${APIURL}/sellers`,obj)
                .then((res2)=>{
                    //berhasil
                    console.log('register store berhasil')
                    // console.log(res.data.password)
                    // console.log(user.password)
                    //login after store data is stored in backend
                    dispatch(Login(user.username,user.password))
                }).catch((err)=>{
                    console.log(err)
                })
            }else{
                dispatch(Login(res.data.username,res.data.password))
            }

        })
        .catch((err)=>{
            console.log(err)
        })

        
    }
}

export const Login=(username,password)=>{
    console.log('login')
    return (dispatch)=>{
        dispatch({type:'LOADING'})
        if(username===''){
            dispatch({type:'LOGIN_FAILED',payload:'username belum diisi'})
        }else if(password===''){
            dispatch({type:'LOGIN_FAILED',payload:'password belum diisi'})
        }else{
            Axios.get(`${APIURL}/users?username=${username}&password=${password}`)
            .then((res)=>{
                // console.log(res.data)
                if(res.data.length){
                    var obj={
                        username: res.data[0].username,
                        role: res.data[0].role,
                        id: res.data[0].id,
                        isVerified: res.data[0].isverified
                    }
                    dispatch({type:'LOGIN_SUCCESS',payload:obj})
                    localStorage.setItem('jamboree_token',res.data[0].token)
                    dispatch(LoadTransaction(res.data[0].id))
                }else{
                    dispatch({type:'LOGIN_FAILED',payload:'username atau password salah'})
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}

export const Logout=()=>{
    localStorage.removeItem('jamboree_token')
    return (dispatch)=>{
        dispatch({type:'LOGOUT'})
        dispatch({type:'STORE_CLOSED'})
        dispatch({type:'CLEAR_TRANSACTION'})
    }
    // return {type:'LOGOUT'}
}


export const KeepLogin=(userdata)=>{
    localStorage.setItem('jamboree_token',userdata.token)
    return (dispatch)=>{
        var data={
            username: userdata.username,
            role: userdata.role,
            id: userdata.id,
            isVerified: userdata.isverified
        }
        dispatch({type:'LOGIN_SUCCESS',payload:data})
        dispatch(LoadTransaction(data.id))
    }
    // return {type:'LOGIN_SUCCESS',payload:data}

}