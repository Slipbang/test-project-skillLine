import {defineStore} from "pinia";
import axios from "axios";
import type {ISchoolApiResponse, ISchoolsItem, IServerResponse} from "../types/types.ts";
import {httpErrorStatusCodes} from "../utils/utilsObjects";
import {ref} from "../.nuxt/imports";

// import {httpErrorStatusCodes} from "../utils/utilsObjects.ts";

interface IInitialState {
    schoolItems: ISchoolsItem[];
    pages_count: number;
    count: number;
    page: number;
    loading: boolean;
    error: string | null;
}

interface IFetchDataParams {
    page: number,
    count: number,
    federal_district_id?: number,
    region_id?: number,
    updated_at?: number
}

//
// export const useSchoolsApiStore = defineStore("schools", {
//     state: (): IInitialState => ({
//         schoolItems: [],
//         pages_count: 10,
//         count: 10,
//         page: 1,
//         loading: false,
//         error: null,
//     }),
//     actions: {
//         async fetchData({page, count, federal_district_id, region_id, updated_at}: IFetchDataParams): Promise<void> {
//             this.loading = true;
//             this.error = null;
//             this.schoolItems = [];
//             console.log('school api fetched')
//             const queryParams = new URLSearchParams({
//                 page: page.toString(),
//                 count: count.toString(),
//             });
//             if (federal_district_id && federal_district_id >= 1) queryParams.append("federal_district_id", federal_district_id.toString());
//             if (region_id && region_id >= 1) queryParams.append("region_id", region_id.toString());
//             if (updated_at) queryParams.append("updated_at", updated_at.toString());
//
//             try {
//                 const response = await axios.get<IServerResponse<ISchoolApiResponse>>(`https://schooldb.skillline.ru/api/schools?${queryParams}`);
//                 this.schoolItems = response.data.data.list;
//                 this.pages_count = response.data.data.pages_count;
//             } catch (err) {
//                 if (axios.isAxiosError(err) && err.response) {
//                     this.error = (err?.status || 0) in httpErrorStatusCodes ? httpErrorStatusCodes[err.status as keyof typeof httpErrorStatusCodes] : 'Ошибка запроса';
//                 } else {
//                     this.error = 'Ошибка запроса';
//                 }
//             } finally {
//                 this.loading = false;
//             }
//         },
//         selectPage(page: number) {
//             this.page = page;
//         },
//         selectCount(count: number) {
//             this.count = count;
//         },
//     },
// });

export const useSchoolsApiStore = defineStore("schools", () => {
    const schoolItems = ref<ISchoolsItem[]>({});
    const pages_count = ref(10);
    const count = ref<number>(10);
    const page = ref<number>(1);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchData = async ({
                                 page,
                                 count,
                                 federal_district_id,
                                 region_id,
                                 updated_at
                             }: IFetchDataParams): Promise<void> => {
        loading.value = true;
        error.value = null;
        schoolItems.value = [];
        console.log('school api fetched')
        const queryParams = new URLSearchParams({
            page: page.toString(),
            count: count.toString(),
        });
        if (federal_district_id && federal_district_id >= 1) queryParams.append("federal_district_id", federal_district_id.toString());
        if (region_id && region_id >= 1) queryParams.append("region_id", region_id.toString());
        if (updated_at) queryParams.append("updated_at", updated_at.toString());

        try {
            const response = await axios.get<IServerResponse<ISchoolApiResponse>>(`https://schooldb.skillline.ru/api/schools?${queryParams}`);
            schoolItems.value = response.data.data.list;
            pages_count.value = response.data.data.pages_count;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                error.value = (err?.status || 0) in httpErrorStatusCodes ? httpErrorStatusCodes[err.status as keyof typeof httpErrorStatusCodes] : 'Ошибка запроса';
            } else {
                error.value = 'Ошибка запроса';
            }
        } finally {
            loading.value = false;
        }
    }

    const selectPage = (newPage: number) => {
        page.value = newPage;
    };
    const selectCount = (newCount: number) => {
        count.value = newCount;
    };

    return {
        schoolItems,
        pages_count,
        count,
        page,
        loading,
        error,
        fetchData,
        selectPage,
        selectCount
    };
});