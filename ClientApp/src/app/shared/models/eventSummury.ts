export interface IEventSummury {
    id: number;
    title: string;
    tags: number[];
    photo: string;
    holdingDate: Date;
    joined: number;
    capacity: number | null;
}