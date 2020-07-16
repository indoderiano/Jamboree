const INITIAL_STATE={
    username: '',
    role: '',
    id: 0,
    loading: false,
    isLogin: false,
    isVerified: false,
    message: ''
}

const reducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOADING':
            return {...state,loading:true}
        case 'LOGIN_SUCCESS':
            return {...state,loading:false,...action.payload,isLogin:true,message:''}
        case 'LOGIN_FAILED':
            return {...state,loading:false,message:action.payload}
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}

export default reducer;