import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import SignUp from '@/views/SignUp.vue'
import Dashboard from "@/views/Dashboard.vue"
import ProductDetails from "@/views/ProductDetails.vue"
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

//Dashboard import 
import dashboardCart from "@/views/dahboardViews/dashboardCart.vue"
import dashboardHome from "@/views/dahboardViews/dashboardHome.vue"
import dashboardProduct from "@/views/dahboardViews/dashboardProduct.vue"
import dashboardInvoice from "@/views/dahboardViews/dashboardInvoice.vue"
import dashboardAccount from "@/views/dahboardViews/dashboardAccount.vue"
import dashboardSettings from "@/views/dahboardViews/dashboardSettings.vue"

const dashboardChildren: RouteRecordRaw[] = [
    {
        path: '', // overviews or home
        name: 'DashboardHome', 
        component: dashboardHome,
    }, 
    {
        path: 'accounts', 
        name: 'DashboardAccount', 
        component: dashboardAccount,
    }, 
    {
        path: 'carts', 
        name: 'DashboardCart', 
        component: dashboardCart,
    }, 
    {
        path: 'products', 
        name: 'DashboardProduct', 
        component: dashboardProduct,
    }, 
    {
        path: 'invoices', 
        name: 'DashboardInvoices', 
        component: dashboardInvoice,
    }, 
    {
        path: 'settings',
        name: 'DashboardSetting',
        component: dashboardSettings 
    }
]

const routes: RouteRecordRaw[] = [
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
    },
    {
        name: 'Dashboard',
        path: '/dashboard', 
        component: Dashboard,
        meta: {requiresAuth: true},
        children: dashboardChildren
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