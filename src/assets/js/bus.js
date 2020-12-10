import Vue from 'vue';

// 使用 Event Bus
const bus = new Vue();

export default bus;

// bus.$on('collapse-content', msg => {
//     console.log(msg)
//     // this.collapse = msg;
// });
