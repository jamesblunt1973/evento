export interface IEvent {
    id: number;
    userId: string;
    title: string;
    latitude: number;
    longitude: number;
    holdingDate: Date;
    duration: number | null;
    description: string;
    capacity: number | null;
    link: string;
}

