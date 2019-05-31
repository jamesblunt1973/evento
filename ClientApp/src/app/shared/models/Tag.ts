import { ITag } from './tag.model';

export class Tag implements ITag {

    constructor(public id: number, public title: string) { }

}