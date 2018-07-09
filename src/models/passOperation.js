export default {
  namespace:'passOperation',
  state: {
    params:{
      startCode:'0',
      targetCode:'0', 
      isTwoWay:'0', 
      isCompress:'0', 
      isEncrypt:'0', 
    },
  },
  effects: {
    *transmit({ payload }, {put}){
      yield put({
        type: 'initial',
        payload,
      });
    },
  },
  reducers: {
    initial(state, action){
      this.setState({
        params:action.payload,
      })
      return {
        ...state,
      }
    },
    saveRowInfo(state, { payload }){
      return {
        ...state,
        params:{
          ...state.params,
          ...payload,
        },
      };
    },
  },
}