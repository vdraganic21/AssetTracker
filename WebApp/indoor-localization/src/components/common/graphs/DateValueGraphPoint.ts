export default class DateValueGraphPoint{
    date: Date;
    value: number;

    constructor(value: number, date: Date){
        this.date = date;
        this.value = value;
    }
}