export class User {
    constructor(
        public id: string,
        public username: string,
        public fullname: string,
    ) { }

    static fromDB(row: any): User {
        return new User(
            row.id,
            row.username,
            row.fullname,
        )
    }
}