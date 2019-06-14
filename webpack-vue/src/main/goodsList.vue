<template>
    <div>
        <h1>goodsList</h1>
        <div v-for="item in list" :key="item">{{item}}</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            this.$http({
                method: 'GET',
                url: 'http://localhost:9500/success001'
            }).then(res => {
                console.log(res);
                this.loist = res;
            })
        }
    }
}
</script>
<style lang="scss">

</style>
