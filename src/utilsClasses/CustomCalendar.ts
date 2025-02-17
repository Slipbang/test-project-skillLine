import type {IDayItem} from "@/types/types.ts";

export class CustomCalendar {
    _currentDate: Date;

    constructor(date: Date) {
        this._currentDate = date;
    }

    get currentDate(): Date {
        return this._currentDate;
    }

    set currentDate(date: Date) {
        this._currentDate = date;
    }

    get year(): number {
        return this.currentDate.getFullYear();
    }

    get month(): number {
        return this.currentDate.getMonth();
    }

    get currentMonth() {
        return {
            daysInMonth: new Date(this.year, this.month + 1, 0).getDate(),
            lastDay: new Date(this.year, this.month + 1, 0).getDay(),
            month: this.month,
            year: this.year,
        };
    }

    get prevMonth() {
        const month = this.month > 0 ? this.month - 1 : 11;
        const year = this.month > 0 ? this.year : this.year - 1;

        return {
            daysInMonth: new Date(year, month + 1, 0).getDate(),
            lastDay: new Date(year, month + 1, 0).getDay(),
            month: month,
            year: year,
        };
    }

    get calendarArray(): { prevMonthDays: IDayItem[], currMonthDays: IDayItem[], nextMonthDays: IDayItem[] } {
        const prevMonthDays = Array.from({length: this.prevMonth.lastDay})
            .map(((day) =>
                () => {
                    const curr = day--;
                    return {
                        dayNum: curr,
                        day: new Date(this.prevMonth.year, this.prevMonth.month, curr).getDay(),
                        month: this.prevMonth.month,
                        year: this.prevMonth.year,
                    }
                })(this.prevMonth.daysInMonth))
            .reverse();
        const currMonthDays = Array.from({length: this.currentMonth.daysInMonth})
            .map((_, index) => {
                const curr = index + 1;

                return {
                    dayNum: curr,
                    day: new Date(this.currentMonth.year, this.currentMonth.month, curr).getDay(),
                    month: this.currentMonth.month,
                    year: this.currentMonth.year,
                }
            });
        const nextMonthDays =
            this.currentMonth.lastDay !== 0
                ? Array.from({length: (7 - this.currentMonth.lastDay)})
                    .map((_, index) => {
                        const curr = index + 1;

                        const month = this.month < 11 ? this.month + 1 : 0;
                        const year = this.month < 11 ? this.year : this.year + 1;

                        const tmp = new Date(year, month, curr);

                        return {
                            dayNum: curr,
                            day: tmp.getDay(),
                            month: tmp.getMonth(),
                            year: tmp.getFullYear(),
                        }
                    })
                : [];

        return {
            prevMonthDays,
            currMonthDays,
            nextMonthDays,
        };
    }
}