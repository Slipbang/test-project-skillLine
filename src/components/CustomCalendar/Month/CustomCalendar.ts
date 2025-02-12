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

    get year(): number{
        return this.currentDate.getFullYear();
    }
    get month(): number {
        return this.currentDate.getMonth();
    }

    get currentMonth() {
        return {
            daysInMonth: new Date(this.year, this.month + 1, 0).getDate(),
            lastDay: new Date(this.year, this.month + 1, 0).getDay(),
        };
    }
    get prevMonth() {

        const month = this.month > 0 ? this.month : 12;
        const year = month === 12 ? this.year - 1 : this.year;

        return {
            daysInMonth: new Date(year, month, 0).getDate(),
            lastDay: new Date(year, month, 0).getDay(),
        };
    }

    get calendarArray () {
        const prevMonthDays = Array.from({length: this.prevMonth.lastDay}).map(((day) => () => day--)(this.prevMonth.daysInMonth)).reverse();
        const currMonthDays = Array.from({length: this.prevMonth.daysInMonth}).map((_,index) => index + 1);
        const nextMonthDays = Array.from({length: (7 - this.currentMonth.lastDay)}).map((_, index) => index + 1);

        return [...prevMonthDays, ...currMonthDays, ...nextMonthDays];
    }
}