import type {TSelectItem} from "@/types/types.ts";

export const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
export const months = ['Январь', "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
export const filterMonths = ['Января', "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июль", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

export const jsonData = [
    { name: "Иван", age: 25, city: "Москва" },
    { name: "Мария", age: 30 }, // Город отсутствует (ячейка будет пустая)
    { name: "Олег", age: 28, city: "Новосибирск" }
];

export const headersMap = {
    name: "Имя",
    age: "Возраст",
    city: "Город"
};

export enum comparisonParams {
    GT='GREATER THAN',
    LT='LESS THAN',
    GE="GREATER OR EQUAL",
    LE='LESS OR EQUAL',
    EQUAL='EQUAL'
}

export const educationCategoriesNames: TSelectItem[] = [
    {name: 'Все виды', id: 0},
    {name: 'дошкольное', id: 1},
    {name: 'общее', id: 2},
    {name: 'среднее', id: 3},
    {name: 'высшее', id: 4},
    {name: 'бакалавриат', id: 5},
    {name: 'специалитет', id: 6},
    {name: 'магистратура', id: 7},
    {name: 'послевузовское', id: 8},
]

export const statuses: TSelectItem[] = [
    {name: 'Все статусы', id: 0},
    {name: 'Недействующее', id: 1},
    {name: 'Действующее', id: 2},
]