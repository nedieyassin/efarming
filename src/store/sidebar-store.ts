import {defineStore} from "pinia";
import {v4 as uuidv4} from 'uuid';

interface AppStore {

}

export const useAppStore = defineStore('app-store', {
    state: (): AppStore => ({}),
    getters: {},
    actions: {},
    // persist: {
    //     serializer: {
    //         deserialize: parse,
    //         serialize: stringify
    //     }
    // },
})
