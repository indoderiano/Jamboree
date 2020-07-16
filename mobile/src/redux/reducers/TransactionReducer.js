const INITIAL_STATE={
    id:'',
    userid:0,
    payment:'',
    status:'',
    isdeleted:false,
    createat:'',
    updateat:'',
    items:[],
    totalQty: 0
}

const reducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOAD_TRANSACTION':
            return {...state,...action.payload}
        case 'CLEAR_TRANSACTION':
            return INITIAL_STATE
        default:
            return state
    }
}

export default reducer;