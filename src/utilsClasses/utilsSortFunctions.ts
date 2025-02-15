import type {ICompareFlags, ISchoolsItem, PipeParams} from "@/types/types.ts";
import {defineEducationCategories} from "@/utils/utilsFunction.ts";

const sortStringComparisonHelper = (a: string | null, b: string | null, flag: boolean) => {
    const cleanA = (a?.replace(/\d+|ул\.|г\.|[^\w\sа-яА-ЯёЁ]/g, "") || "").trim().replace(' ', '').toLowerCase();
    const cleanB = (b?.replace(/\d+|ул\.|г\.|[^\w\sа-яА-ЯёЁ]/g, "") || "").trim().replace(' ', '').toLowerCase();

    return cleanA.localeCompare(cleanB, 'ru', {sensitivity: 'base', ignorePunctuation: true}) * (flag ? 1 : -1);
}

export const educationLvl = {
    "Дошкольное": 1,
    'Начальное': 2,
    'Основное': 3,
    'Среднее': 4,
    'Послевузовское': 5,
    'Профессиональное': 6,
    'Высшее': 7,
}

const defineMaxEducationLevelHelper = (educationItems: string[]): number => {
    let max = Number.MIN_SAFE_INTEGER;

    educationItems.forEach((item, i) => {
        max = Math.max(educationLvl[item as keyof typeof educationLvl], max)
    })

    return isFinite(max) ? max : 0;
}

export const sortData = ({schoolItems, flags}: Partial<PipeParams>): Partial<PipeParams> => {
    return {
        schoolItems: [...schoolItems!].sort((a, b) => {
            if (flags!.regionIsAsc !== undefined) {
                return sortStringComparisonHelper(a.edu_org.region.name, b.edu_org.region.name, flags!.regionIsAsc);
            }
            if (flags!.nameIsAsc !== undefined) {
                return sortStringComparisonHelper(a.edu_org.short_name ?? a.edu_org.full_name, b.edu_org.short_name ?? b.edu_org.full_name, flags!.nameIsAsc);
            }
            if (flags!.addressIsAsc !== undefined) {
                return sortStringComparisonHelper(a.edu_org.contact_info.post_address, b.edu_org.contact_info.post_address, flags!.addressIsAsc)
            }
            if (flags!.eduLvlIsAsc !== undefined) {
                const aEdu = defineEducationCategories(a.supplements);
                const bEdu = defineEducationCategories(b.supplements);
                const aMaxLvl = defineMaxEducationLevelHelper(aEdu);
                const bMaxLvl = defineMaxEducationLevelHelper(bEdu);

                return flags!.eduLvlIsAsc ? bMaxLvl - aMaxLvl : aMaxLvl - bMaxLvl;
            }
            return  0;
        }),
    };
};