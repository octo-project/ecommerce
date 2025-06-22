<template>
    <div className="flex justify-center items-center min-h-screen bg-white md:bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-none md:shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>
            <form @submit.prevent="signUp">
                <div className="!mb-4">
                    <label for="username" className="block text-gray-700">Username</label>
                    <input v-model="username" type="text" required id="username" className="w-full px-4 py-2 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="!mb-4">
                    <label for="email" className="block text-gray-700">Email</label>
                    <input v-model="email" type="email" required id="email" className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-500 border"/>
                </div>
                <div className="!mb-4">
                    <label for="password" className="block text-gray-700">Password</label>
                    <input v-model="password" id="password" required type="password" className="w-full px-2 py-2 border focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-transparent rounded-lg" />
                </div>
                <button type="submit" :disabled="loading" className="w-full !mt-2 px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed">
                    {{loading ? "Loading ..." : "Sign up"}}
                </button>
            </form>
            <p :class="{'invisible': !error, 'block text-red-500 text-center min-h-[24px] !mt-4': true }">{{ error || " " }}</p>
        </div>
    </div>
    <!-- Modal signIn -->
    <Modal v-if="openConfirmationModal" :icon="'congratulation.svg'" :validate="validateSignIn" :close-modal="closeModal" :message="modalContent" :action-message="`Congratulation ${ username }, You’ve successfully signed in. We invite you to log in to fully enjoy your session. `" :title="'Welcome'" :ok-button-label="'S’authentifier '"/>
</template>


<script setup lang="ts">
    import {ref} from 'vue';
    import axios from 'axios';
    import {useRouter} from 'vue-router';
    import Modal from '@/components/modal/Modal.vue';

    const email = ref<string>('');
    const username = ref<string>('');
    const password = ref<string>('');   
    const loading = ref<boolean>(false);
    const error = ref<string|null>(null);
    
    const router = useRouter(); 
    
    const modalContent = ref<string>("");
    const openConfirmationModal = ref<boolean>(false);
    const closeModal = () => {
        openConfirmationModal.value = false
    }
    const validateSignIn = () => {
        router.push('/login')
    }

    const signUp = async () => {
        error.value = null;
        loading.value = true;

        try {
            const response = await axios.post("http://localhost:5001/signup", {
                email: email.value,
                pseudo: username.value,
                password: password.value,
            })
            openConfirmationModal.value = true
        } catch (error) {
            error.value = "Failed to sign up. Please try again.";
        } finally {
            loading.value = false
        }
    }
</script>