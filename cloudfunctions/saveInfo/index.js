// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'yqgk-2flf9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const collection = db.collection('qrcode') 
  
  const addRet = await collection.add({
    data: {
      ...event,
      // name: event.name,
      // gender: event.gender,
      // ages: event.ages,
      // idCard: event.idCard,
      // phone: event.phone,
      // ddQrcode: event.ddQrcode,
      // ddColor: event.ddColor,
      // temp: event.temp,
      createTime: db.serverDate()
    }
  })
  if (addRet.errMsg ==='collection.add:ok') {
    return {
      code: 0,
      errMsg: addRet.errMsg
    }
  }else {
    return {
      code: 500,
      errMsg: addRet.errMsg
    }
  }
}