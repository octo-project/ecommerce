<template>
    <div className="flex login-container justify-center items-center min-h-screen bg-white md:bg-white lg:bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-none md:shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form @submit.prevent="login">
                <div className="mb-4">
                    <label for="username" className="block text-gray-700">Username</label>
                    <input v-model="username" id="username" type="text" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="mb-4 !mt-4">
                    <label className="block text-gray-700">Password</label>
                    <input v-model="password" type="password" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"/>
                </div>
                <button type="submit" :disabled="loading" className="!mt-4 w-full disabled:bg-blue-500 disabled:cursor-not-allowed cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    {{loading ? "Loading ..." : "Login"}}
                </button>
            </form>
            <p @click="goToSignUp" className="text-blue-700 underline !mt-3 text-center cursor-pointer">Inscrivez vous</p>
            <p :class="{'invisible': !error, 'block text-red-500 text-center min-h-[24px] !mt-4': true}">{{ error || ' ' }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import axios from 'axios';
    import {useRouter} from 'vue-router';

    const router = useRouter();
    const username = ref<string>('');
    const password = ref<string>('');
    const loading = ref<boolean>(false);
    const error = ref<string|null>(null);

    const login = async () => {
        try {
            error.value = null;
            loading.value = true;  

            const response = await axios.post("http://localhost:5001/login",{
                pseudo: username.value,
                password: password.value
            });
            localStorage.setItem('token', response.data.data.token);
            router.push('/')
        } catch (err) {
            error.value = 'Invalid email or password';
        } finally {
            loading.value = false   
        }
    }

    // onMounted( async () => {
    //     try {
    //         const response = fetch('https://fakestoreapi.com/users')
    //         .then(response => response.json())
    //         .then(data => console.log(data));

    //         console.log("users : ", response);
    //     } catch (error) {
            
    //     }
    // })

    const goToSignUp = () => {
        router.push('/sign-up')
    }
</script>