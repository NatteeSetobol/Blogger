export class Post
{
    constructor(
        public id: number,
        public autherId: number,
        public title: string,
        public text: object,
        public publish: Date,
        public created: Date,
        public updated: Date

    )
    {

    }
}