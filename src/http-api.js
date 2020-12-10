export default {
    // 用户操作
    login(param, next) { // 登录
        axios.post('/login', param).then(res => {
            next(res);
        })
    },

    // 用户管理
    getUserList(param, next) { // 查询用户列表
        axios.post('/queryUserList', param).then(res => {
            next(res);
        })
    },
    deleteUser(param, next) { // 删除用户
        axios.post('/removeUser', param).then(res => {
            next(res);
        })
    },
    saveUser(param, next) { // 新增/修改用户
        axios.post('/saveOrUpdateUser', param).then(res => {
            next(res);
        })
    },
    resetPassword(param, next) { // 重置密码
        axios.post('/initPassword', param).then(res => {
            next(res);
        })
    },
    getUserInfo(param, next) { // 通过用户ID查询用户&角色信息
        axios.post('/queryUserByUserId', param).then(res => {
            next(res);
        })
    },
}
