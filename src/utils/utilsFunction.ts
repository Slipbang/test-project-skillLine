interface ISupplements {
    "edu_level": {
        "name": string;
        "short_name": string | null;
        "code": string | null;
    },
}
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

export function jsonToCSV(jsonData: any, headersMap: any, filename = "data.csv") {
    if (!jsonData || jsonData.length === 0) {
        console.error("Пустой JSON!");
        return;
    }

    const csvRows = [];

    // 1️⃣ Заголовки
    const keys = Object.keys(headersMap); // Ключи JSON
    const headers = keys.map(key => headersMap[key]); // Названия колонок
    csvRows.push(headers.join(";")); // Используем ";" как разделитель (можно поменять)

    // 2️⃣ Данные (заполняем таблицу)
    jsonData.forEach((row: any) => {
        const values = keys.map(key => {
            const value = row[key] !== undefined ? row[key] : ""; // Если нет значения — пустая ячейка
            return `"${value}"`; // Оборачиваем в кавычки для корректного отображения
        });
        csvRows.push(values.join(";"));
    });

    // 3️⃣ Добавляем BOM для корректной кодировки UTF-8
    const bom = "\uFEFF"; // BOM для UTF-8
    const csvContent = bom + csvRows.join("\n");

    // 4️⃣ Создаем CSV-файл
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // 5️⃣ Даем пользователю скачать
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

