import { GetEventsSort } from './getEventsSort';

export interface IGetEventsParameter {
    latitude: number;
    longitude: number;
    from: Date;
    to: Date;
    str: string;
    userId: string;
    tags: number[];
    page: number;
    count: number;
    sort: GetEventsSort;
}