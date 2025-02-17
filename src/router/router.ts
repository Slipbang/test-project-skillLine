import { createRouter, createWebHistory } from 'vue-router';
import App from "@/App.vue";
import UIKit from "@/components/UIKit/UIKit.vue";
import InstitutionsTable from "@/components/InstitutionsTable/InstitutionsTable.vue";



const routes = [
    { path: '/test-project-skillLine', component: InstitutionsTable },
    {path: '/test-project-skillLine/ui-kit', component: UIKit},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;