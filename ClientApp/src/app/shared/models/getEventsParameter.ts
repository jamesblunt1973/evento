import { GetEventsSort } from './getEventsSort';

export interface IGetEventsParameter {
    latitude?: number;
    longitude?: number;
    from?: Date;
    to?: Date;
    str?: string;
    userId?: string;
    tags?: number[];
    page?: number;
    count?: number;
    sort?: GetEventsSort;
}

export class GetEventsParameter implements IGetEventsParameter {
  constructor(
    public latitude: number = 0,
    public longitude: number  = 0,
    public from: Date = null,
    public to: Date = null,
    public str: string = '',
    public userId: string = '',
    public tags: number[] = [],
    public page: number = 0,
    public count: number = 20,
    public sort: GetEventsSort = GetEventsSort.latest
  ) { }
}
