// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  return rp(`http://v.juhe.cn/toutiao/index?key=${event.key}&page=${event.page}&is_filter=1`).then(res => {
  console.log(res)
  return res
  }).catch(err => {
    console.error(err)
  })
}