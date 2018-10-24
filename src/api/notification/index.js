const module = {
  moduleName: 'notification',
  apis: [
    {
      name: 'getNotifications',
      url: 'notifyManager/notifies',
    },
    {
      name: 'deleteNotifications',
      url: 'notifyManager/notifies',
      method: 'delete',
    },
    {
      name: 'readNotification',
      url: 'notifyManager/readMark',
      method: 'put',
    },
    {
      name: 'postNotification',
      baseHost: 'http://testgoverinfrast.tpaas.youedata.com',
      url: 'zwjh/api/v1/notify',
      method: 'post',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://goverinfrast.tpaas.youedata.com'
  }
})
export default module