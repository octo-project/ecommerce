import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import SignUp from '@/views/SignUp.vue'
import ProductDetails from "@/views/ProductDetails.vue"
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name: "Login",
        path: "/login",
        component: Login,
    },
    {
        name: "Sign Up",
        path: "/sign-up",
        component: SignUp,
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        props: true,
        path: "/product/:id",
        name: "Product Detail",
        component: ProductDetails
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router