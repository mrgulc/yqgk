// 云函数入口文件
const cloud = require('wx-server-sdk')

const rp = require('request-promise')

cloud.init({
  env: 'yqgk-2flf9'
})

const maskIdCard = (idCard) => {
  if(!idCard) {
    return
  }
  var startStr = idCard.substr(0, 4)
  var endStr = idCard.substr(-4)
  idCard = startStr + "**********" + endStr
  return idCard
}

/**
 * 查询qrCode信息
 */
const queryQrCode = async (qrCode) => {
    const options = {
      method: 'POST',
      uri: 'https://zjkm.jiaxing.gov.cn/api/personCheck/thirdSearch',
      form: {
        idCard: '',
        qrCode: qrCode
      },
      headers: {
        'authorization': '0484f55aa70bee2d66b10111dc130047'
      },
      json: true
    }
    const rpRet = await rp(options)
    if(rpRet.code === 0) {
      
      rpRet.result.idCard = maskIdCard(rpRet.result.idCard )
      return {
        code: rpRet.code,
        errMsg: rpRet.errorMsg,
        data: rpRet.result 
      }
    }else {
      return {
        code: rpRet.code,
        errMsg: rpRet.errorMsg,
        data: null
      }
    }
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(!event.qrCode) {
    return {
      code: 400,
      errMsg: 'qrCode不能为空.m',
      data: null
    }
  }

  return queryQrCode(event.qrCode)
}