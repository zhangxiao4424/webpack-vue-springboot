<template>
    <div>
        <h1>Accout</h1>
        <router-link to="/accout/login">登录</router-link>
        <router-link to="/accout/register">注册</router-link>

        <router-view/>
    </div>
</template>
<script>
export default {
    mounted() {
        console.log(111111)
    }
}
</script>
<style lang="scss">

</style>
