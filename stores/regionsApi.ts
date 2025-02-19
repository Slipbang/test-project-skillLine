import type {IRegionsResponse, IServerResponse} from "../types/types.ts";
import {defineStore} from "pinia";
import axios from "axios";
import {ref} from "../.nuxt/imports";

interface IInitialState {
    regions: IRegionsResponse;
    loading: boolean;
    error: string | null;
}

// export const useRegionsApiStore = defineStore("regions", {
//     state: (): IInitialState => ({
//         regions: [],
//         loading: false,
//         error: null,
//     }),
//     actions: {
//         async fetchData(): Promise<void> {
//             this.loading = true;
//             this.error = null;
//             this.regions = [];
//             const ssRegions = sessionStorage.getItem('regions-api-store');
//             if (ssRegions && ssRegions.length > 0) {
//                 try {
//                     this.regions = [...JSON.parse(ssRegions)];
//                     return;
//                 } catch (err) {
//                     console.error(err)
//                 }
//             }
//             const tmpRegion = {
//                 id: -1,
//                 name: 'Все регионы',
//             }
//
//             console.log('fetch regions');
//
//             try {
//                 const response = await axios.get<IServerResponse<IRegionsResponse>>(`https://schooldb.skillline.ru/api/regions`);
//                 this.regions = [tmpRegion,...response.data.data];
//                 sessionStorage.setItem('regions-api-store', JSON.stringify(this.regions));
//             } catch (err) {
//                 this.error = err instanceof Error ? err.message : "Ошибка запроса региона";
//                 const errorRegion = {
//                     id: -1,
//                     name: 'Ошибка загрузки регионов',
//                 }
//                 this.regions = [tmpRegion, errorRegion]
//             } finally {
//                 this.loading = false;
//             }
//         },
//     },
// });

export const useRegionsApiStore = defineStore("regions", () => {
    const regions = ref<IRegionsResponse>([]);
    const loading = ref<boolean>(false);
    const error =  ref<string | null>(null);


        const fetchData  = async (): Promise<void> => {
            loading.value = true;
            error.value = null;
            regions.value = [];
            const ssRegions = sessionStorage.getItem('regions-api-store');
            if (ssRegions && ssRegions.length > 0) {
                try {
                    regions.value = [...JSON.parse(ssRegions)];
                    return;
                } catch (err) {
                    console.error(err)
                }
            }
            const tmpRegion = {
                id: -1,
                name: 'Все регионы',
            }

            console.log('fetch regions');

            try {
                const response = await axios.get<IServerResponse<IRegionsResponse>>(`https://schooldb.skillline.ru/api/regions`);
                regions.value = [tmpRegion,...response.data.data];
                sessionStorage.setItem('regions-api-store', JSON.stringify(this.regions));
            } catch (err) {
                error.value = err instanceof Error ? err.message : "Ошибка запроса региона";
                const errorRegion = {
                    id: -1,
                    name: 'Ошибка загрузки регионов',
                }
                regions.value = [tmpRegion, errorRegion]
            } finally {
                loading.value = false;
            }
        }

        return {error, regions, loading, fetchData};
});