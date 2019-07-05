export class FilterData {
    latitude: number | null;
    longitude: number | null;
    from: Date = null;
    to: Date = null;
    tags: Array<number> = [];
    userId: string = '';
    str: string = '';
    page: number = 0;
    count: number = 20;
    sort: number = 0;

    constructor() { }
}