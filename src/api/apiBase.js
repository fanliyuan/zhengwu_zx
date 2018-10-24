/*
 * @Author: ChouEric
 * @Date: 2018-08-02 11:18:55
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-02 15:01:33
 * @Description: 请求基类,代码源自axios,目前用在fetch可能有问题,暂时没有使用
 */
class apiBase {
  constructor (data) {
    this.data = data
  }
  // requestFun (config) {
  //   console.log('api请求基类===================>请求拦截：', JSON.stringify(config))
  //   return config
  // }
  // requestError (error) {
  //   console.log('api请求基类===================>请求错误拦截：', JSON.stringify(error))
  // }
  // responseFun (data) {
  //   console.log('api请求基类===================>响应拦截：', JSON.stringify(data))
  //   return data
  // }
  // responseError (error) {
  //   console.log('api请求基类===================>响应错误拦截：', JSON.stringify(error))
  // }
}

export default apiBase