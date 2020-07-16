import Axios from 'axios'
import {APIURL} from '../../supports/ApiUrl'

export const LoadTransaction=(userid,closeModalBag)=>{
    console.log('action load transaction')
    return (dispatch)=>{
        Axios.get(`${APIURL}/transactions?userid=${userid}&status=onbag`)
        .then((res)=>{
            // console.log(res.data)
            if(res.data.length){
                var transactionData=res.data[0]
                // FIND ALL TRANSACTION DETAILS FROM THIS DATA
                Axios.get(`${APIURL}/transactions/transactiondetails?transactionid=${res.data[0].id}`)
                .then((res)=>{
                    // console.log(res.data)
                    transactionData.items=res.data
                    // COUNT TOTAL QTY
                    var count=0
                    res.data.forEach((val,index)=>{
                        count+=val.qty
                    })
                    transactionData.totalQty=count
                    // console.log(transactionData)
                    console.log('transaction loaded')
                    if(closeModalBag){
                        closeModalBag()
                    }
                    dispatch({type:'LOAD_TRANSACTION',payload:transactionData})
                }).catch((err)=>{
                    console.log(err)
                })
            }
            // dispatch({type:'ESTABLISH_STORE',payload:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
}