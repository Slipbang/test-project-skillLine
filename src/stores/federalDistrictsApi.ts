import {defineStore} from "pinia";
import axios from "axios";
import type {IFederalDistrictsResponse, IServerResponse} from "@/types/types.ts";

interface IInitialState {
    federalDistricts: IFederalDistrictsResponse;
    loading: boolean;
    error: string | null;
}

export const useFederalDistrictsApiStore = defineStore("federalDistricts", {
    state: (): IInitialState => ({
        federalDistricts: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchData(): Promise<void> {
            this.loading = true;
            this.error = null;
            this.federalDistricts = [];
            const tmpFedDis = {
                id: -1,
                name: 'Все Фед. округа',
                short_name: '',
                code: '',
            }

            console.log('fetch fed districts');

            try {
                const response = await axios.get<IServerResponse<IFederalDistrictsResponse>>(`https://schooldb.skillline.ru/api/federalDistricts`);

                this.federalDistricts = [tmpFedDis,...response.data.data];
            } catch (err) {
                this.error = err instanceof Error ? err.message : "Ошибка запроса";
            } finally {
                this.loading = false;
            }
        },
    },
});