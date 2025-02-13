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
            month: this.month + 1,
            year: this.year,
        };
    }

    get prevMonth() {

        const month = this.month > 0 ? this.month : 12;
        const year = month === 12 ? this.year - 1 : this.year;

        return {
            daysInMonth: new Date(year, month, 0).getDate(),
            lastDay: new Date(year, month, 0).getDay(),
            month: month,
            year: year,
        };
    }

    get calendarArray() {
        const prevMonthDays = Array.from({length: this.prevMonth.lastDay})
            .map(((day) => () => {
                const curr = day--;
                return {
                    dayNum: curr,
                    day: new Date(this.prevMonth.year, this.prevMonth.month, curr).getDay(),
                }
            })(this.prevMonth.daysInMonth))
            .reverse();
        const currMonthDays = Array.from({length: this.currentMonth.daysInMonth})
            .map((_, index) => {
                const curr = index + 1;

                return {
                    dayNum: curr,
                    day: new Date(this.currentMonth.year, this.currentMonth.month, curr).getDay(),
                }
            });
        const nextMonthDays = Array.from({length: (7 - this.currentMonth.lastDay)})
            .map((_, index) => {
                const curr = index + 1;

                return {
                    dayNum: curr,
                    day: new Date(this.currentMonth.year + 1, this.currentMonth.month + 1, curr).getDay(),
                }
            });

        return {
            prevMonthDays,
            currMonthDays,
            nextMonthDays,
        };
    }
}