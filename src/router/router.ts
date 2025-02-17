import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import App from "@/App.vue";
import UIKit from "@/components/UIKit/UIKit.vue";
import InstitutionsTable from "@/components/InstitutionsTable/InstitutionsTable.vue";



const routes = [
    { path: '/', component: InstitutionsTable },
    {path: '/ui-kit', component: UIKit},
];

const router = createRouter({
    history: createWebHashHistory('/test-project-skillLine'),
    //history: createWebHistory('/test-project-skillLine'),
    routes,
});

export default router;