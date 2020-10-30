/*
 * @Author: 肥仔
 * @Date: 2020-10-27 16:04:32
 * @LastEditors: 肥仔
 * @LastEditTime: 2020-10-27 17:20:51
 * @Description: file content
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'GP内容管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
