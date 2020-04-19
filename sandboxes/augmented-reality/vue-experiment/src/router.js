import Vue from 'vue';
import Router from 'vue-router';
import VirtualReality from './views/VirtualReality.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'VirutualReality',
			component: VirtualReality
		}
	]
});
