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


