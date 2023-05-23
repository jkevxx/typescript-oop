class MyDate {
  day: number = 0;
  month: number = 0;
  year: number = 0;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }
}

const myDate = new MyDate(8, 8, 2000);

console.log(myDate);
