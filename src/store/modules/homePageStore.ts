import { defineStore } from 'pinia';

export const useHomePageStore = defineStore('homePage', {
    state: () => ({
        isHomePage: true,
    }),
    actions: {
        setIsHomePage(value: boolean) {
            this.isHomePage = value;
        },
    },
});
