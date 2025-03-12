<template>
    <nav className="sticky top-0 bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-white text-xl">E-Commerce</h1>
        <div>
            <span className="text-white !mr-5">
                Welcome <span className="!font-bold">{{ user }} 👋</span> 
            </span>
            <button 
                @click="logout"
                className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
            Logout
            </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import {jwtDecode} from 'jwt-decode';
    import {useRouter} from 'vue-router';

    const router = useRouter();
    const user = ref<string>('');

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    }

    onMounted(async () => {
        const AuthToken = localStorage.getItem("token");

        try {
            /**
             * DecodedToken structure
             * sub  : number
             * user : string 
             * iat  : number
             */
            const decodedToken = jwtDecode(AuthToken);
            const username = decodedToken.user;
            user.value = username[0]?.toUpperCase() + username?.slice(1);
        } catch (error) {
            console.log("Decode token error : ", error);
        }
        
    })
</script>