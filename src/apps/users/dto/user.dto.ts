export class UserDto {
    private id: number
    private name: string
    private email: string
    public User(_id, _name, _email) {
        this.id = _id;
        this.name = _name;
        this.email = _email;
    }
}
