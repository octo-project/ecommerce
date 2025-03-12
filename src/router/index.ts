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
        component: Home,
        meta: {requiresAuth: true}
    },
    {
        props: true,
        path: "/product/:id",
        name: "Product Detail",
        component: ProductDetails,
        meta: {requiresAuth: true}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthentificated = !!localStorage.getItem("token");

    if(to.meta.requiresAuth && !isAuthentificated){
        next("/login");
    }else{
        next();
    }
})

export default router