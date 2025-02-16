import type {PipeParams} from "@/types/types.ts";
import {defineEducationCategories} from "@/utils/utilsFunction.ts";

export const filterByNames = ({schoolItems, filterValue}: Partial<PipeParams>): Partial<PipeParams> => {
    const filteredSchoolItems = schoolItems!.filter(item =>
            (item?.edu_org?.short_name ?? item?.edu_org?.full_name)?.toLowerCase()?.includes(filterValue!.toLowerCase())
        )

    return {
        schoolItems: filteredSchoolItems,
    };
}

export const filterByDate = ({schoolItems, filterDateFrom, filterDateTo}: Partial<PipeParams>): Partial<PipeParams> => {
    if (!filterDateFrom?.year || !filterDateTo?.year) return {schoolItems};

    const filteredSchoolItems = schoolItems!.filter(item => {
        const itemUpdatedAt = new Date(item.updated_at || '');
        const dateFrom = new Date(filterDateFrom!.year!, filterDateFrom!.month!, filterDateTo!.dayNum!);
        const dateTo = new Date(filterDateTo!.year!, filterDateTo!.month!, filterDateTo!.dayNum!);

        return itemUpdatedAt < dateTo && itemUpdatedAt > dateFrom;
    })
    return {
        schoolItems: filteredSchoolItems,
    }
}

export const filterByEduType = ({schoolItems, eduCategory}: Partial<PipeParams>): Partial<PipeParams> => {
    if (eduCategory?.includes('Все виды')) return {schoolItems};

    const filteredSchoolItems = schoolItems?.filter(item => {
        const categories = defineEducationCategories(item.supplements);

        let flag = false;

        categories.forEach(category => {
            if (eduCategory?.toLowerCase().includes(category.toLowerCase())) {
                flag = true;
            }
        })

        return flag;
    })

    return {
        schoolItems: filteredSchoolItems,
    }
}

export const filterByStatus = ({schoolItems, status}: Partial<PipeParams>): Partial<PipeParams> => {
    if (status?.includes('Все статусы')) return {schoolItems};

    const filteredSchoolItems = schoolItems?.filter(item => {
        return item?.supplements[0].status.name?.includes(status!);
    })

    return {
        schoolItems: filteredSchoolItems,
    }
}