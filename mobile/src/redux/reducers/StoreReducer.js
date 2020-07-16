const INITIAL_STATE={
    id:'',
    storename:'store',
    storeimage:'',
    userid:0,
}

const reducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'ESTABLISH_STORE':
            return {...state,...action.payload}
        case 'STORE_CLOSED':
            return INITIAL_STATE
        default:
            return state
    }
}

export default reducer;