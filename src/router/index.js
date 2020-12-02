import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Dashboard from '../components/Dashboard.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/', component: Dashboard, meta: { requiresAuth: true } }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !store.state.user) {
    next('/login')
  } else if (requiresAuth && store.state.user) {
    next()
  } else {
    next()
  }
});


export default router;