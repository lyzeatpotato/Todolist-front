import request from 'axios'

// 调用后端"新增请假申请表信息"接口
export function addToDoList(data) {
  return request({
    url: '/api/shuhistorytest/figure/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'   // 设置请求头格式为：x-www-form-urlencoded
    },
    data: data
  })
}
