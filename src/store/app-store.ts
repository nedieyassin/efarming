import {defineStore} from "pinia";
import {IAuth, IProfile} from "../types/auth";
import {Auth} from "../services/api/endpoints/auth";


interface AppStore {
    profile?: IProfile
}

const _auth = new Auth();
export const useAppStore = defineStore('app-store', {
    state: (): AppStore => ({
        profile: undefined
    }),
    getters: {
        profile_admin: (state) => state.profile?.type.toLowerCase().trim() === 'admin',
        profile_advisor: (state) => state.profile?.type.toLowerCase().trim() === 'advisor',
        profile_farmer: (state) => state.profile?.type.toLowerCase().trim() === 'farmer'
    },
    actions: {
        login(form: IAuth) {
            return new Promise((resolve, reject) => {
                _auth.login(form).on('response', (res) => {
                    if (res.ok) {
                        const profile: IProfile = {
                            full_name: res.body.full_name,
                            type: res.body.type,
                            user_id: res.body.user_id,
                            email_address: res.body.email_address,
                            access: res.body.access
                        };
                        this.profile = profile
                        resolve(profile);
                    }
                }).on('error', (err) => {
                    reject(err);
                }).end();
            })
        },
        updateName(full_name: string) {
            return new Promise((resolve, reject) => {
                _auth.updateName({id: this.profile?.user_id ?? '', full_name}).on('response', (res) => {
                    if (res.ok) {
                        this.getProfile();
                        resolve(res.body);
                    }
                }).on('error', (err) => {
                    reject(err);
                }).end();
            })
        },
        async getProfile() {
            return new Promise((resolve, reject) => {
                _auth.getProfile(this.profile?.user_id ?? '').on('response', (res) => {
                    if (res.ok) {
                        const profile: Partial<IProfile> = {
                            ...this.profile,
                            user_id: res.body.user_id,
                            full_name: res.body.full_name,
                            type: res.body.type,
                        };
                        this.profile = profile as IProfile
                        resolve(profile);
                    }
                }).on('error', (err) => {
                    reject(err);
                }).end();
            })
        },
        logout() {
            this.profile = undefined;
        },
    },
    persist: true
})
