export default class Post {
    constructor(title, image) {
        this.title = title;
        this.date = new Date();
        this.img = image;
    }
    toString() {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
            image: this.img
        }, null, 2)
    }
}
