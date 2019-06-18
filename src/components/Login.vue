<template>
    <div>
        <h4>Login</h4>
        <form>
            <label for="username">username</label>
            <div>
                <input type="text" name="username" id="username" v-model="username" required autofocus>
            </div>
            <div>
                <label for="password">password</label>
                    <div>
                        <input id="password" type="password" v-model="password" required>
                    </div>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username : "",
                password : ""
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('http://localhost:3300/api/login', {
                        username: this.username,
                        password: this.password
                    })
                    .then(response => {
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)
                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else {
                                this.$router.push('jokes')
                            }
                        }
                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                }
            }
        }
    }
</script>
