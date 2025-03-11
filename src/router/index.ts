import Home from "@/views/Home.vue"
import ProductDetails from "@/views/ProductDetails.vue"
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
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