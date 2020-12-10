<template>
    <div class="demo">
        <!--<video-player class="video-player vjs-custom-skin"-->
        <!--ref="videoPlayer"-->
        <!--:playsinline="true"-->
        <!--:options="playerOptions"-->
        <!--@play="onPlayerPlay($event)"-->
        <!--@pause="onPlayerPause($event)">-->
        <!--</video-player>-->

        <!--流媒体-->
        <video-player class="video-player vjs-custom-skin" :options="playerOptions1"></video-player>
        <video-player class="video-player vjs-custom-skin" :options="playerOptions2"></video-player>
    </div>
</template>

<script>
    // import 'video.js/dist/video-js.css'
    // import 'vue-video-player/src/custom-theme.css'
    // import {videoPlayer} from 'vue-video-player'

    import 'videojs-flash'

    export default {
        // components: {
        //     videoPlayer
        // },
        data() {
            return {
                // playerOptions: {
                //     playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
                //     autoplay: false, // 如果true,浏览器准备好时开始回放。
                //     muted: false, // 默认情况下将会消除任何音频。
                //     loop: false, // 导致视频一结束就重新开始。
                //     preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                //     language: 'zh-CN',
                //     aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                //     fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                //     sources: [{
                //         type: "video/mp4", // 类型
                //         src: '/第12话 冰与火之诗.mp4' // url地址
                //     }],
                //     poster: '/22.jpg', // 你的封面地址
                //     notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                //     controlBar: {
                //         timeDivider: true,
                //         durationDisplay: true,
                //         remainingTimeDisplay: false,
                //         fullscreenToggle: true // 全屏按钮
                //     }
                // },
                playerOptions1: {
                    // height: '360',
                    aspectRatio: '16:9',
                    sources: [{
                        type: "rtmp/mp4",
                        src: "rtmp://10.10.0.18:1935/live/test1"
                    }],
                    techOrder: ['flash', 'html5'],
                    autoplay: false,
                    controls: true,
                },
                playerOptions2: {
                    // height: '360',
                    aspectRatio: '16:9',
                    sources: [{
                        type: "rtmp/mp4",
                        src: "rtmp://10.10.0.18:1935/live/test2"
                    }],
                    techOrder: ['flash', 'html5'],
                    autoplay: false,
                    controls: true,
                },
            }
        },
        methods: {
            onPlayerPlay(player) {
                // alert("play");
            },
            onPlayerPause(player) {
                // alert("pause");
            },
        },
    }
</script>

<style scoped>
    .demo {
        max-width: 500px;
        max-height: 500px;
        margin: 10px auto;
    }
</style>
