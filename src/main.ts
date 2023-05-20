import {createApp} from 'vue'
import "./style.css"
import "qalendar/dist/style.css";
import App from './App.vue'
import router from "./router";
import {VueFire, VueFireAuth,VueFirestoreObject} from 'vuefire'
import {firebaseApp} from './services/firebase'
import pinia from "./store/pinia";

const app = createApp(App);

app.use(VueFire, {
        // imported above but could also just be created here
        firebaseApp,
        modules: [
            // we will see other modules later on
            VueFireAuth(),
        ],
    })

app.use(router)
app.use(pinia)

app.mount('#app')