// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  return rp(`https://api.apiopen.top/getSingleJoke?sid=${event.sid}`).then(res => {
    return res
    console.log(res)
  }).catch(err => {
    console.err(err)
  })
}