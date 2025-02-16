import type {IRegionsResponse, IServerResponse} from "@/types/types.ts";
import {defineStore} from "pinia";
import axios from "axios";

interface IInitialState {
    regions: IRegionsResponse;
    loading: boolean;
    error: string | null;
}

export const useRegionsApiStore = defineStore("regions", {
    state: (): IInitialState => ({
        regions: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchData(): Promise<void> {
            this.loading = true;
            this.error = null;
            this.regions = [];
            const tmpRegion = {
                id: -1,
                name: 'Все регионы',
            }

            console.log('fetch regions');

            try {
                const response = await axios.get<IServerResponse<IRegionsResponse>>(`https://schooldb.skillline.ru/api/regions`);

                this.regions = [tmpRegion,...response.data.data];
            } catch (err) {
                this.error = err instanceof Error ? err.message : "Ошибка запроса региона";
            } finally {
                this.loading = false;
            }
        },
    },
});