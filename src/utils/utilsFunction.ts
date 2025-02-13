import type {IDate, IDayItem, ISupplements} from "@/types/types.ts";
import {months} from "@/utils/utilsObjects.ts";

export const defineEducationCategories = (supplements: ISupplements[]) => {
    const forbidden = ['Не определен',]

    return [...supplements.reduce((acc, currentValue) => {
        const keyWord = currentValue.edu_level.name.split(" ")[0];
        if (!acc.has(keyWord) && !forbidden.includes(currentValue.edu_level.name)) {
            acc.add(keyWord);
        }
        return acc;
    }, new Set<string>())]
}

export const extractFirstNumbers = (array: number[], skip: number) => {
    const threeNumbers = [...array].splice(skip, 3);

    return threeNumbers;
}

export const equalityTest = (target: IDayItem, source: IDate) => {
    const targetTime = new Date(target.year, target.month + 1, target.dayNum).getTime();
    const sourceTime = new Date(source.year!, source.month! + 1, source.dayNum!).getTime();

    return targetTime === sourceTime;
}

export const defineDayClass = (item: IDayItem, targetFrom: IDate, targetTo: IDate) => {

    const itemDate = new Date(item.year, item.month, item.dayNum);
    const fromDate = new Date(targetFrom.year!, targetFrom.month!, targetFrom.dayNum!);
    const toDate = new Date(targetTo.year!, targetTo.month!, targetTo.dayNum!);

    if (itemDate < fromDate || itemDate > toDate) {
        return '';
    }

    if (itemDate.getTime() === fromDate.getTime()) {
        return 'selected-primary-first';
    }
    if (itemDate.getTime() === toDate.getTime()) {
        return 'selected-primary-last';
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
    return `${date.dayNum} ${months[date?.month || 0]} ${date.year}`
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
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Даем пользователю скачать
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

