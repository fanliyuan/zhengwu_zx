export default {
  namespace:'roleLimit',
  state:{
    params:{
      roleName:'',
      roleDescription:'',
    },
  },
  effects:{

  },
  reducers:{
    saveRowInfo(state,{ payload }){
      return{
        ...state,
        params:{
          ...state.params,
          ...payload,
        },
      };
    },
  },
}