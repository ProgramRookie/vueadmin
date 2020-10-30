/*
 * @Author: 肥仔
 * @Date: 2020-10-27 16:04:32
 * @LastEditors: 肥仔
 * @LastEditTime: 2020-10-28 09:24:21
 * @Description: file content
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  ruleName: state => state.user.ruleName,
  rule: state => state.user.rule
}
export default getters
