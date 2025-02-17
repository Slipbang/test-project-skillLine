import type {IDate, IDayItem, IRegionsResponse, ISchoolsItem, ISupplements} from "@/types/types.ts";
import {comparisonParams, filterMonths} from "@/utils/utilsObjects.ts";
import type {Ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import * as XLSX from 'xlsx';

const forbidden = ['Не определен'];
const special = ['бакалавриат', 'специалитет' ,'магистратура',]
const keyWords = [...special, 'послевузовское', 'высшее' , 'среднее', 'общее', 'дошкольное'];

export const defineEducationCategories = (supplements: ISupplements[]): string[] => {

    const educationCategories = new Set<string>();

    supplements?.forEach(supplement => {
        supplement?.educational_programs?.forEach((program) => {

            if (!forbidden.includes(program?.edu_level.name) && !educationCategories.has(program?.edu_level?.name)) {
                educationCategories.add(program?.edu_level.name);
            }
        })
    })

    const tmpEduCategories = new Set([...educationCategories].map(category => {
        for (let keyWord of keyWords) {
            if(category?.toLowerCase()?.includes(keyWord)) {
                if (special.includes(keyWord)) {
                    return [keyWord, 'высшее']
                }
                return keyWord;
            }
        }
        return ''
    }).filter(Boolean).flat())


    return [...tmpEduCategories];
}

export const extractFirstNumbers = (value: number, limit: number) => {
    if (value <= 2) return [1,2,3];
    else if (value === limit - 1) return [value - 2,value - 1, value];
    else if (value === limit) return [value - 1, value]

    return [value - 1, value, value + 1];
}

export const equalityTest = (target: IDayItem, source: IDate, comparison: comparisonParams) => {
    const targetTime = new Date(target.year, target.month + 1, target.dayNum).getTime();
    const sourceTime = new Date(source.year!, source.month! + 1, source.dayNum!).getTime();

    switch (comparison) {
        case comparisonParams.EQUAL:
            return targetTime === sourceTime;
        case comparisonParams.GE:
            return targetTime >= sourceTime;
        case comparisonParams.LE:
            return targetTime <= sourceTime;
        case comparisonParams.GT:
            return targetTime > sourceTime;
        case comparisonParams.LT:
            return targetTime < sourceTime;
    }
}

export const defineDayClass = (item: IDayItem, targetFrom: IDate, targetTo: IDate) => {

    const itemDate = new Date(item.year, item.month, item.dayNum);
    const fromDate = new Date(targetFrom.year!, targetFrom.month!, targetFrom.dayNum!);
    const toDate = new Date(targetTo.year!, targetTo.month!, targetTo.dayNum!);

    if (itemDate.getTime() === fromDate.getTime()) {
        let selectedPrimary = 'selected-primary';
        if (item.day !== 0) {
            selectedPrimary += '-start'
        }
        return selectedPrimary;
    }
    if (itemDate.getTime() === toDate.getTime()) {
        let selectedPrimary = 'selected-primary';
        if (item.day !== 1) {
            selectedPrimary += '-end'
        }
        return selectedPrimary;
    }

    if (itemDate < fromDate || itemDate > toDate) {
        return '';
    }

    let className = 'selected';

    switch (item.day) {
        case 1: {
            className += '-first';
            break;
        }
        case 0: {
            className += '-last';
            break;
        }
        default: {
            className += '-center';
        }
    }

    return className;
}

export const defineDateText = (date: IDate) => {
    return `${date.dayNum} ${filterMonths[date?.month || 0]} ${date.year}`
}

export const filterRegions = (regions: IRegionsResponse, value: string) => {
    if (!value) return regions;

    return regions.filter(region => {
        return region.name.toLowerCase().includes(value.toLowerCase());
    })
}

export const handleClickOutside = (ref: Ref<HTMLElement | null>, isOpened: Ref<boolean>, toggleFn: () => void, exceptions: string[] = []) => {
    onClickOutside(ref, (event) => {
        const clickedInsideException = exceptions.some(selector =>
            (event.target as HTMLElement).closest(selector)
        );

        if (!clickedInsideException && isOpened.value) {
            toggleFn();
        }
    });
};

export const pipe =
    <T>(...fns: ((args: Partial<T>) => Partial<T>)[]) =>
        (initialArgs: Partial<T>): T =>
            fns.reduce((acc, fn) => ({ ...acc, ...fn(acc) }), initialArgs) as T;

export const supplementsHeaders = {
    reg_number: "Рег. номер",
    serial_number: "Серийный номер",
    form_number: "Номер формы",
    issue_date: "Дата выдачи",
    end_date: "Дата окончания",
    regulatory: "Регулирующий орган",
    "status.name": "Статус",
    created_at: "Дата создания",
    updated_at: "Дата обновления",

    "edu_org.short_name": "Краткое название",
    "edu_org.full_name": "Полное название",
    "edu_org.contact_info.post_address": "Адрес",
    "edu_org.contact_info.phone": "Телефон",
    "edu_org.contact_info.email": "Email",
    "edu_org.legal_info.ogrn": "ОГРН",
    "edu_org.legal_info.inn": "ИНН",
    "edu_org.legal_info.kpp": "КПП",
    "edu_org.head.name": "ФИО руководителя",
    "edu_org.head.post": "Должность руководителя",
    "edu_org.region.name": "Регион",
    "edu_org.federal_district.name": "Федеральный округ",
};

const eduProgramsHeader = {
    "edu_level.name": "Уровень образования",
    "ugs.name": "Название программы",
    "ugs.code": "Код направления",
    is_accredited: "Статус аккредитации",
}

type TSupplementsHeaders = typeof supplementsHeaders;
type TEduProgramsHeaders = typeof eduProgramsHeader;

// Функция для получения вложенных значений
function getValueByPath<T extends Record<string, any>>(obj: T, path: string): any {
    return path.split(".").reduce((acc, key) => (acc && !!acc[key] ? acc[key] : "Данные не указаны"), obj);
}

// Функция для генерации XLSX-файла
export function jsonToXLSXParserLoader(dataArray: ISchoolsItem[], filename = "schools_data.xlsx") {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        console.error("Пустой массив данных!");
        return;
    }

    const workbook = XLSX.utils.book_new();

    const parsedData = (supplementsItem: ISupplements,supplementsHeaders: TSupplementsHeaders, eduProgramsHeader: TEduProgramsHeaders) => {
        const supplementsHeadersKeys = Object.keys(supplementsHeaders);
        const eduProgramsKeys = Object.keys(eduProgramsHeader);

        const supplementsData = supplementsHeadersKeys.map(key => getValueByPath(supplementsItem, key));
        const eduProgramsData: string[][] = []
        supplementsItem?.educational_programs?.forEach(program => {
            const eduProgramData = eduProgramsKeys.map(key => getValueByPath(program, key));
            eduProgramsData.push(eduProgramData);
        })

        return [
            Object.values(supplementsHeaders),
            supplementsData,
            [],
            Object.values(eduProgramsHeader),
            ...eduProgramsData,
        ]
    }

    let count = 1;
    dataArray.forEach(item => {
        let sheetData: any[][] = parsedData(item.supplements[0], supplementsHeaders, eduProgramsHeader);

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

        const columnWidths = sheetData[0].map((_, colIndex) => ({
            wch: Math.max(
                ...sheetData.map(row => (row[colIndex] ? row[colIndex].toString().length : 10))
            ) + 2 // +2 для отступов
        }));

        worksheet["!cols"] = columnWidths;

        XLSX.utils.book_append_sheet(workbook, worksheet, `Школа ${count++}`);
    });

    XLSX.writeFile(workbook, filename);
}