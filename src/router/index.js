import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/useUserStore';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/ping',
            name: 'PingPage',
            component: () => import('../views/PingView.vue'),
        },
        {
            path: '/receiver',
            name: 'ReceiverTest',
            component: () => import('../streaming-unity/ReceiverRenderer.vue'),
        },
        {
            path: '/dashboard',
            name: 'DashboardGeneralPage',
            component: () => import('../views/DashboardGeneralView.vue'),
            children: [
                {
                    path: '',
                    name: 'DashboardPage',
                    component: () => import('../components/dashboard/views/DashboardView.vue'),
                    meta: { window: "dashboard" }
                },
                {
                    path: 'groups',
                    name: 'GroupsPage',
                    component: () => import('../components/dashboard/views/GroupsView.vue'),
                    meta: { window: "groups" }
                },
                {
                    path: 'users',
                    name: 'UsersPage',
                    component: () => import('../components/dashboard/views/GroupsView.vue'),
                    meta: { window: "users" }
                },
                {
                    path: 'config',
                    name: 'ConfigPage',
                    component: () => import('../components/dashboard/views/ConfigView.vue'),
                    meta: { window: "config" }
                },
                {
                    path: 'profile',
                    name: 'ProfilePage',
                    component: () => import('../components/dashboard/views/ProfileView.vue'),
                    meta: { window: "profile" }
                },
                {
                    path: 'analytics',
                    name: 'AnalyticsPage',
                    component: () => import('../components/dashboard/views/AnalyticsView.vue'),
                    meta: { window: "analytics" }
                },

                {
                    path: 'sessions/:sessionId',
                    name: 'SessionStatsPage',
                    component: () => import('../components/dashboard/views/SessionStatsView.vue'),
                    meta: { window: "Session Stats" }
                },

                {
                    path: '/multi-session-stats/:sessionIds',
                    name: 'MultiSessionStatsPage',
                    component: () => import('../components/dashboard/views/MultiSessionStatsView.vue'),
                    meta: { window: "Sessions Stats" }
                  },
                
            ]
        },
        {
            path: '/session/:sessionId',
            name: 'SessionPage',
            component: () => import('../views/SessionView.vue'),
        },
        {
            path: '/instances',
            name: 'InstancesPage',
            component: () => import('../views/InstancesView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFoundPage',
            component: () => import('../views/NotFoundView.vue'),
        }
    ],
});
/*es-lint ignore */
router.beforeEach(async (to, from, next) => {
    //return true;
    const userStore = useUserStore();

    //Control access to dashboard and instances
    if ((to.path.split('/')[1] == 'dashboard' || to.path.split('/')[1] == 'instances') 
        && !userStore.isLoggedIn) 
    {
        return '/';
    }

    if (to.path == '/') {
        return '/dashboard';
    }

    
});

export default router;