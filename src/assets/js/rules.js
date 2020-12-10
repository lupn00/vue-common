/**
 * @desc 基于ElementUI Form rules 进行使用
 * @example
 * 1、先在main.js 里引用
 *  import rules from "./assets/js/rules";
 *  Vue.prototype.$rules = rules;
 * 2、在Form rules 进行使用
 *  rules: {
 *      userName: [
 *          {required: true, message: '请输入用户名', trigger: 'blur'},
 *          {required: true, pattern: /^[0-9]\d*$/, message: '请选择线下商品代码', trigger: "change"}，
 *          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
 *          {validator: this.$rules.validateUserName, trigger: 'blur'}
 *      ]
 *  }
 */

/**
 * @desc:
 * @author：lupn
 * @date：2020/3/26
 * @example：
 */

export default {
    // 校验 包括中文字、英文字母、数字和下划线
    validateUserName(rule, value, callback) {
        let reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        if (value && (!reg.test(value))) {
            callback(new Error('用户名不符合规范'));
        } else {
            callback();
        }
    },

    // 手机号码校验
    validatePhone(rule, value, callback) {
        let reg = /^[1][3-9]\d{9}$/;
        if (value && (!reg.test(value))) {
            callback(new Error('手机号码不符合规范'));
        } else {
            callback();
        }
    },

    // 电话号码校验-手机号或固定电话
    validateTelephone(rule, value, callback) {
        let reg = /^((0\d{2,3}-\d{7,8})|(1[3-8]\d{9}))$/;
        if (value && (!reg.test(value))) {
            callback(new Error('电话号码不符合规范'));
        } else {
            callback();
        }
    },

    // 邮箱校验
    validateEMail(rule, value, callback) {
        let reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]$/;
        if (value && (!reg.test(value))) {
            callback(new Error('邮箱格式不符合规范'));
        } else {
            callback();
        }
    },

    // 身份证号码校验
    validateIdCard(rule, value, callback) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (value && (!reg.test(value))) {
            callback(new Error('身份证号码不符合规范'));
        } else {
            callback();
        }
    },

    // 正整数校验
    validateIntegerP(rule, value, callback) {
        let reg = /^[1-9]\d*$/;
        if (value && !reg.test(value)) {
            callback(new Error('只能填写正整数'));
        } else {
            callback();
        }
    },

    // 负整数校验
    validateIntegerN(rule, value, callback) {
        let reg = /^-[1-9]\d*$/;
        if (value && !reg.test(value)) {
            callback(new Error('只能填写负整数'));
        } else {
            callback();
        }
    },

    // 1-99之间的正整数校验
    validateAge(rule, value, callback) {
        let reg = /^[1-9][0-9]?$/;
        if (value && !reg.test(value)) {
            callback(new Error('请输入1至99之间的正整数'));
        } else {
            callback();
        }
    },

    // 请输入两位正整数
    validateTwoNum(rule, value, callback) {
        let reg = /^[1-9]{2}$/;
        if (!reg.test(value)) {
            callback(new Error('请输入两位正整数！'));
        } else {
            callback();
        }
    },

    // 最多保留两位小数
    validateTwoPoint(rule, value, callback) {
        let reg = /^(([1-9]\d*)|(0))(\.\d{1,2})?$/;
        if (!reg.test(value)) {
            callback(new Error('最多保留两位小数！'));
        } else {
            callback();
        }
    },

    // 英文字符校验
    validateEnText(rule, value, callback) {
        let reg = /^[A-Za-z]+$/;
        if (value && !reg.test(value)) {
            callback(new Error('只能填写英文字符'));
        } else {
            callback();
        }
    },

    // 英文和数字字符校验
    validateNumEnText(rule, value, callback) {
        let reg = /^[A-Za-z0-9]+$/;
        if (value && !reg.test(value)) {
            callback(new Error('只能填写英文或数字'));
        } else {
            callback();
        }
    },

    // 中文字符校验
    validateCnText(rule, value, callback) {
        let reg = /[^\u4e00-\u9fa5]/;
        if (value && reg.test(value)) {
            callback(new Error('只能填写中文字符'));
        } else {
            callback();
        }
    },

    // 校验字符长度
    validateLength(rule, value, callback) {
        let codeLen = 0;
        for (let i = 0; i < value.length; i++) {
            let c = value.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                codeLen++;
            } else {
                codeLen += 2;
            }
        }
        if (codeLen > 20) {
            callback(new Error('输入的字符长度不能超过18位，一个汉字等于2个字符。'));
        } else {
            callback();
        }
    },

    // 不常用的校验

    /**
     *校验IP地址
     */
    validateIP(rule, value, callback) {
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (value && (!reg.test(value))) {
            callback(new Error('IP地址不符合规范'));
        } else {
            callback();
        }
    },


    /**
     *校验电脑Mac地址
     *以xx-xx-xx-xx-xx-xx的形式输入（xx为16进制数字）
     */
    validateMac(rule, value, callback) {
        let temp = /[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}/;
        if (!temp.test(value)) {
            callback(new Error('请输入xx-xx-xx-xx-xx-xx形式的MAC地址！'));
        } else {
            callback();
        }
    },


    /**
     * 校验经度是否符合规范
     */
    checkLongitude(rule, value, callback) {
        let longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
        if (!longrg.test(value)) {
            callback(new Error('经度整数部分为0-180,小数部分为0到6位!'));
        } else {
            callback();
        }
    },

    /**
     * 校验纬度是否符合规范
     */
    checkLatitude(rule, value, callback) {
        let latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
        if (!latreg.test(value)) {
            callback(new Error('纬度整数部分为0-90,小数部分为0到6位!'));
        } else {
            callback();
        }
    }
}
