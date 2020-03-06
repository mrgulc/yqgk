// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'yqgk-2flf9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database().collection('qrcode') // 数据库
  let temperature = event.temperature
  let ddQrcode = event.ddQrcode
  const updateRet = await db.where({
    ddQrcode: ddQrcode
  }).update({
    data: {
      temperature: temperature
    }
  })

  let code = -1
  let errMsg
  if (updateRet.errMsg === "collection.update:ok") {
    code = 0
  }

  return {
    code:code,
    errMsg: updateRet.errMsg,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}