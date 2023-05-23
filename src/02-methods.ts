export type formatDate = 'days' | 'months' | 'years';

class MyDate {
  year: number;
  month: number;
  day: number;
  leapYear: boolean = false; // by deafault the year is not leap year

  private _months: { [key: number]: string } = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  private _month31: number[] = [1, 3, 5, 7, 8, 10, 12]; // list of months that have 31 days

  constructor(year: number, month: number, day: number) {
    this.year = this._validYear(year);
    this._leapYear();
    this.month = this._validMonth(month);
    this.day = this._validDay(day);
  }

  printFormat(format: string = 'dd / mm / yy'): string {
    if (this._validError() == null) {
      // if validError returns null then there are no errors
      format = format.replace('yy', this.year.toString());
      format = format.replace('dd', this.day.toString());
      format = format.replace('mm', this.month.toString());
      format = format.replace('mn', this._months[this.month]);
      return format;
    } else {
      return this._validError()!; // notation ! tells typescript that the programmer is in control
    }
  }

  private _validError(): string | null {
    // if any attribute has the value of zero then it is out of range and there is an error
    let error: string = '#outRange!'; // out of tange error indicator
    if (this.year == 0) {
      return `${error} year`; // error message
    }
    if (this.month == 0) {
      return `${error} month`; // error message
    }
    if (this.day == 0) {
      return `${error} day`; // error message
    }
    return null; // whithout errors
  }

  private _validYear(year: number) {
    // if the year is greater than zero it is valid
    if (year > 0) {
      return year;
    } else {
      return 0;
    }
  }

  private _validDay(day: number) {
    // validate the day
    if (day > 0) {
      if (this.month === 2) {
        // if the month is february
        let evaluateDay: number = 28;
        if (this.leapYear) {
          // if leap year
          evaluateDay++;
        }
        if (day <= evaluateDay) {
          return day;
        } else {
          return 0;
        }
      } else {
        // if it is any month except february
        let evaluateDay: number = 30;
        if (this._month31.includes(this.month)) {
          // if the month has 31 days
          evaluateDay++;
        }
        if (day <= evaluateDay) {
          return day;
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }

  private _validMonth(month: number) {
    // Validated that the month is between 1 and 12
    if (month > 0 && month < 13) {
      return month;
    } else {
      return 0;
    }
  }

  private _leapYear() {
    /**
     * @ Check if the year is a leap year
     */
    let result: number;
    result = (this.year / 4) % 2; // formula if ((n/4) % 2 == 0)

    if (result == 0) {
      this.leapYear = true;
    }
  }

  add(amount: number, format: formatDate) {
    if (this._validError() == null) {
      if (format == 'days') {
        for (let i = 0; i < amount; i++) {
          this.day += 1;
          if (this._validDay(this.day) == 0) {
            // Validated the day based on the month and year
            /* if _validDay returns 0 the valid days for the current month
                        were exceeded then the month is increased and day is restarted */
            this.month++;
            if (this.month == 13) {
              this.year++;
              this.month = 1;
            }
            this.day = 1;
          }
        }
      } else if (format == 'months') {
        for (let i = 0; i < amount; i++) {
          this.month++;
          if (this.month > 12) {
            this.year++;
            this.month = 1;
          }
        }
      } else if (format == 'years') {
        if (amount > 0) {
          this.year += amount;
        }
      }
    }
  }
}

const myDate = new MyDate(2000, 2, 29);
console.log(myDate.printFormat('dd of mn of yy'));
myDate.add(36, 'days');
console.log(myDate.printFormat());
myDate.add(40, 'months');
console.log(myDate.printFormat('mm - dd - yy'));
