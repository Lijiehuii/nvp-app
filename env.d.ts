/// <reference types="vite/client" />

import axios from "axios";

declare module "@vue/runtime-core" {
    export interface ComponentCustomProperties {
        $axios: typeof axios
    }
}
