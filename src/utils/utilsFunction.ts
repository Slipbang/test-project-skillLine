import type {IDate, IDayItem, ISupplements} from "@/types/types.ts";
import {comparisonParams, filterMonths} from "@/utils/utilsObjects.ts";

export const defineEducationCategories = (supplements: ISupplements[]): string[] => {
    const forbidden = ['Не определен',]
    const educationLevels = new Set<string>();

    supplements?.forEach(supplement => {
        supplement?.educational_programs?.forEach((program) => {
            const keyWord = program?.edu_level?.name?.split(" ")[0];
            if (!educationLevels.has(keyWord) && !forbidden.includes(program?.edu_level.name) && keyWord) {
                educationLevels.add(keyWord);
            }
        })
    })

    return [...educationLevels];
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

    if (itemDate < fromDate || itemDate > toDate) {
        return '';
    }

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

// сменить на xlsx
export function jsonToCSV(jsonData: any, headersMap: any, filename = "data.csv") {
    if (!jsonData || jsonData.length === 0) {
        console.error("Пустой JSON!");
        return;
    }

    const csvRows = [];

    // Заголовки
    const keys = Object.keys(headersMap); // Ключи JSON
    const headers = keys.map(key => headersMap[key]); // Названия колонок
    csvRows.push(headers.join(";")); // Используем ";" как разделитель (можно поменять)

    // Данные (заполняем таблицу)
    jsonData.forEach((row: any) => {
        const values = keys.map(key => {
            const value = row[key] !== undefined ? row[key] : ""; // Если нет значения — пустая ячейка
            return `"${value}"`; // Оборачиваем в кавычки для корректного отображения
        });
        csvRows.push(values.join(";"));
    });

    // Добавляем BOM для корректной кодировки UTF-8
    const bom = "\uFEFF"; // BOM для UTF-8
    const csvContent = bom + csvRows.join("\n");

    // Создаем CSV-файл
    const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);

    // Даем пользователю скачать
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

