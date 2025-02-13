export interface IDate {
    dayNum: number | null;
    month: number | null;
    year: number | null;
}

export interface IDayItem {
    dayNum: number;
    day: number;
    month: number,
    year: number,
}

export interface ISupplements {
    "edu_level": {
        "name": string;
        "short_name": string | null;
        "code": string | null;
    },
}