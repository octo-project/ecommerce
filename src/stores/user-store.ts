import {defineStore} from 'pinia';
import {useCacheStore} from './cache-store';
import { DecodedTokenType, UserType } from '@/types/type';

export const useUserStore = defineStore('user', {
    state: () => ({
        connectedUser: {} as UserType | null,
        authUser: {} as DecodedTokenType | null, 
    }),
    actions: {
        setConnectedUser(data: UserType){
            this.connectedUser = data
        },
        clearAuthUser() {
            const cacheStore = useCacheStore();

            cacheStore.setCache("authUser", null);
            this.authUser = null;
        },
        setAuthUser(data: DecodedTokenType){
            const cacheStore = useCacheStore();

            cacheStore.setCache("authUser", data);
            localStorage.setItem("token", data.token);
            this.authUser = data;
        },
        getAuthUser(){
            return this.authUser;
        } 
    },
    persist: {
        pick: ["authUser" ,"connectedUser"],
        storage: localStorage,
        serializer: {
            serialize: JSON.stringify,
            deserialize: JSON.parse
        }
    }
})