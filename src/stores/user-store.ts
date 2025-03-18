import {defineStore} from 'pinia';
import {useCacheStore} from './cache-store';
import { DecodedTokenType } from '@/types/type';

export const useUserStore = defineStore('user', {
    state: () => ({
        authUser: {} as DecodedTokenType | null, 
    }),
    actions: {
        clearAuthUser() {
            const cacheStore = useCacheStore();

            cacheStore.setCache("authUser", null);
            this.authUser = null;
            return
        },
        setAuthUser(data: DecodedTokenType){
            const cacheStore = useCacheStore();

            cacheStore.setCache("authUser", data);
            this.authUser = data;
            return
        },
        getAuthUser(){
            return this.authUser;
        } 
    }
})