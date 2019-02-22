// 请求地址
const DEV = 'https://xmp.ctbls.com/smN/'
const PRO = 'https://mp.ctbls.com/smN/'

const fetch = (url, data = {}, method = 'POST', header) => {
  /** 默认配置头 */
  header = header || {
    'content-type': 'application/x-www-form-urlencoded'
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: DEV + url,
      data: data,
      method: method,
      header: header,
      success: (res) => {
        const { data, statusCode } = res;
        resolve(data);
      },
      fail: (err) => {
        if (err.errMsg.indexOf('timeout') > 0) {
          until.hideLoading();
          until.showModal('网络错误', '抱歉,网络可能出现问题,请稍后重试!', {
            confirm: () => {
              console.log('网络问题');
            }
          });

        }
        console.log(err);
        reject(err);
      }
    })
  })
}

module.exports = fetch;
