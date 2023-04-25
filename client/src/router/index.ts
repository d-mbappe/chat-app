import { createWebHistory, createRouter } from "vue-router";
import Home from '@/pages/Home.vue';
import Chat from '@/pages/Chat.vue';

const history = createWebHistory();
const routes = [
    { path: "/", component: Home },
    { path: "/chat", component: Chat },
];
const router = createRouter({ history, routes });
export default router;