import { IEventSummury } from './eventSummury';

export interface IGetEventsResult {
    events: IEventSummury[];
    totalCount: number;
}