export class Note {
    constructor(
        public id: string,
        public title: string,
        public body: string,
        public tags: string[],
        public createdAt: string,
        public updatedAt: string,
        public username?: string
    ) { }

    static fromDB(row: any): Note {
        return new Note(
            row.id,
            row.title,
            row.body,
            row.tags,
            row.created_at,
            row.updated_at,
            row.username
        )
    }
}