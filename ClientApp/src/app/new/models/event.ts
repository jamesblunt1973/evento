import { IEvent } from './event.model';
export class AppEvent implements IEvent {
    constructor(
        public id: number = 0,
        public userId: string = '',
        public title: string = '',
        public latitude: number = 0,
        public longitude: number = 0,
        public holdingDate: Date = null,
        public duration: number | null = null,
        public description: string = '',
        public capacity: number | null = null,
        public link: string = ''
    ) { }
}
