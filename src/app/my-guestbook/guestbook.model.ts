/**
 * An image represents comment made by a user
 */

import { uuid } from '../util/uuid';

export class Guestbook {

    guestbookid: number;
    title: string;
    content: string;
    createdAt: string;
    hasprofanity: number;

    constructor(obj?: any) {

        this.guestbookid = obj && obj.guestbookid || 0;
        this.title = obj && obj.title || null;
        this.content = obj && obj.content || null;
        this.createdAt = obj && obj.createdAt || null;
        this.hasprofanity = obj && obj.hasprofanity || 0;

    }

}
