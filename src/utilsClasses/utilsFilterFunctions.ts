import type {PipeParams} from "@/types/types.ts";

export const filterByNames = ({schoolItems, filterValue}: Partial<PipeParams>): Partial<PipeParams> => {
    return {
        schoolItems: schoolItems!.filter(item => (item.edu_org.short_name ?? item.edu_org.full_name).toLowerCase().includes(filterValue!.toLowerCase())),
        filterValue,
    };
}