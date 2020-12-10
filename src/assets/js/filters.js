/**
 * 公共方法、全局过滤器
 *
 *
 * 使用方法：
 * import * as filters from './assets/js/filters'
 * Object.keys(filters).forEach(key => {
 *    Vue.filter(key, filters[key]);
 *});
 */

/**
 * 时间戳转时分秒
 * date：时间
 * fmt:时间格式默认 yyyy-MM-dd hh:mm:ss
 */
export function getFormatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if ((typeof date) == "string") { // 将-替换成/，避免ie和safari下报错
        date = date.replace(/-/g, "/");
    }
    let dateN = new Date(date);
    let o = {
        'M+': dateN.getMonth() + 1,
        'd+': dateN.getDate(),
        'h+': dateN.getHours(),
        'm+': dateN.getMinutes(),
        's+': dateN.getSeconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateN.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 根据身份证号码获取出生年月日
 */
export function getBirthdayFromIdCard(idCard) {
    let birthday = "";
    if (idCard != null && idCard !== "") {
        if (idCard.length === 15) {
            birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length === 18) {
            birthday = idCard.substr(6, 8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }
    return birthday;
}

/**
 * @desc：
 * @author：lupn
 * @date：2020/3/27
 * @example：
 */
