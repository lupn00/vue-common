<template>
    <div></div>
</template>

<script>
    import {getFormatDate} from '../assets/js/filters'

    export default {
        data() {
            return {}
        },
        mounted() {
            let thisDate = new Date();
            let a = getFormatDate(thisDate);
            console.log(a)
        },
        methods: {}
    }
</script>

<style scoped>

</style>