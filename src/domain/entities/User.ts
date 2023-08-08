export class User {
    constructor(
        public id: string,
        public title: string,
        public body: string,
        public tags: string[],
        public createdAt: string,
        public updatedAt: string,
    ) { }

    static fromDB(row: any): User {
        return new User(
            row.id,
            row.title,
            row.body,
            row.tags,
            row.created_at,
            row.updated_at,
        )
    }
}