import apis from '../../../api'

const { list } = apis
export default {
  namespace:'sourceClassfiy',
  state:{},
  effects:{
    *getLists({ payload} ,{ call }){
      const response = yield call(list,{params:payload})
      try{
        if(response.code === 0){
          console.log(response) // eslint-disable-line
        }else {
          console.log(response) // eslint-disable-line
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
  },
  reducers:{
    
  },
}