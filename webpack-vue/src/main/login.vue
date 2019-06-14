<template>
    <div style="width: 400px; margin: 60px auto; text-align: center;">
        <form class="form-signin">
			<img class="mb-4" src="asserts/img/bootstrap-solid.svg" alt="" width="72" height="72">
			<h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
			<label class="sr-only">Username</label>
			<input type="text" v-model="loginForm.Username" class="form-control" placeholder="Username" required="" autofocus="">
			<label class="sr-only">Password</label>
			<input type="password" v-model="loginForm.Password" class="form-control" placeholder="Password" required="">
			<div class="checkbox mb-3">
				<label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
			</div>
			<button class="btn btn-lg btn-primary btn-block" @click="sign" type="submit">Sign in</button>
			<p class="mt-5 mb-3 text-muted">© 2017-2018</p>
			<a class="btn btn-sm">中文</a>
			<a class="btn btn-sm">English</a>
		</form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                Username: '',
                Password: ''
            }
        }
    },
    methods: {
        sign() {
            console.log(this.loginForm);
            this.$http({
                method: 'POST',
                url: 'http://localhost:9500/login',
                data: {username: this.loginForm.Username, password: this.loginForm.Password}
            }).then(res => {
                console.log(res);
                if (res.data.status === 'success') {

                }
                this.loist = res;
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
