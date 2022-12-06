import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
    Button,
    Swipe,
    SwipeItem,
    Image as VanImage,
    Lazyload,
    Loading,
    Skeleton,
    List,
    PullRefresh,
    Field,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    Toast,
    ShareSheet,
    SwipeCell,
    Dialog,
    Empty
} from 'vant';
import App from './App.vue'
import router from './router'
import './index.css'
import './assets/main.css'
import './assets/reset.css'

const app = createApp(App)

app.use(createPinia())
app.use(Button);
app.use(Swipe);
app.use(SwipeItem);
app.use(VanImage);
app.use(Lazyload);
app.use(Loading);
app.use(Skeleton);
app.use(List);
app.use(PullRefresh);
app.use(Field);
app.use(CellGroup);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(Toast);
app.use(ShareSheet);
app.use(SwipeCell);
app.use(Dialog);
app.use(Empty);

app.use(router)

app.mount('#app')

if (!localStorage.token) {
    router.replace('/login')
}
