import fetch from './fetch.js'
import Env from './env.js'
/** 用户授权登录 ok */
let setAuthorLogin = data => fetch(Env.AUTHOR_LOGIN, data)
/** 发送验证码 ok */
let getCode = data => fetch(Env.CODE, data)
/** 用户登录 ok */
let setLogin = data => fetch(Env.LOGIN, data)

module.exports = {
  setAuthorLogin: setAuthorLogin,
  setLogin: setLogin,
};
