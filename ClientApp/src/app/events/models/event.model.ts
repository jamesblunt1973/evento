export interface IEvent {
  id: number;
  userId: string;
  title: string;
  latitude: number;
  longitude: number;
  holdingDate: Date;
  time: string,
  duration: number | null;
  description: string;
  capacity: number | null;
  link: string;
  tags: number[];
}

export class AppEvent implements IEvent {
  constructor(
    public id: number = 0,
    public userId: string = '',
    public title: string = '',
    public latitude: number = 0,
    public longitude: number = 0,
    public holdingDate: Date = null,
    public time: string = '',
    public duration: number | null = null,
    public description: string = '',
    public capacity: number | null = null,
    public link: string = '',
    public tags: number[] = []
  ) { }
}
