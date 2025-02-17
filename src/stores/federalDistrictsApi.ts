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
            const ssFederalDistricts = sessionStorage.getItem('federal-districts-api-store');
            if (ssFederalDistricts && ssFederalDistricts.length > 0) {
                try {
                    this.federalDistricts = [...JSON.parse(ssFederalDistricts)];
                    return;
                } catch (err) {
                    console.error(err)
                }
            }

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
                sessionStorage.setItem('federal-districts-api-store', JSON.stringify(this.federalDistricts));
            } catch (err) {
                this.error = err instanceof Error ? err.message : "Ошибка запроса";
                const errFedDis = {
                    id: -1,
                    name: 'Ошибка загрузки Фед. округа',
                    short_name: '',
                    code: '',
                }
                this.federalDistricts = [tmpFedDis, errFedDis];
            } finally {
                this.loading = false;
            }
        },
    },
});