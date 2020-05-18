/** @format */

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            // 当 /user/:id 匹配成功，
            // UserHome 会被渲染在 User 的 <router-view> 中
            {
                path: "",
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ "../components/losTree/losTreeList.vue"
                    ),
                // props: true,
            },
            {
                path: "/lostree",
                name: "LosTreeList",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ "../components/losTree/losTreeList.vue"
                    ),
                props: true,
            },
            {
                path: "/lostree/:nodeid",
                name: "LosTree",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ "../components/losTree/losTreeNode.vue"
                    ),
                props: true,
            },
            // ...其他子路由
        ],
    },
    //     { // 404
    // path:"*",
    // name: "404"
    //     },
];

const router = new VueRouter({
    routes,
});

export default router;
