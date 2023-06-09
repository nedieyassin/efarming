import {defineStore} from "pinia";

import {Profiles} from "../model/profiles";

interface AppStore {
    profile?: {
        full_name: string,
        type: string
    }
}

export const useAppStore = defineStore('app-store', {
    state: (): AppStore => ({
        profile: undefined
    }),
    getters: {
        profile_admin: (state) => state.profile?.type.toLowerCase().trim()==='admin',
        profile_advisor: (state) => state.profile?.type.toLowerCase().trim()==='advisor',
        profile_farmer: (state) => state.profile?.type.toLowerCase().trim()==='farmer'
    },
    actions: {
        async getProfile(id: string) {
            const res = await new Profiles().getProfile(id);
            const p = res.data()
            this.profile = {full_name: p?.full_name, type: p?.type};
            return true;
        }
    },
    // persist: {
    //     serializer: {
    //         deserialize: parse,
    //         serialize: stringify
    //     }
    // },
})
