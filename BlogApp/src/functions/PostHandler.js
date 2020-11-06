
const PostCreator = (name, email, body) => {
    let d = new Date();
    let genDate = d.getDate() + " " + Monther(d.getMonth()) + " " + d.getFullYear()
    let post = {
        author: name,
        mail: email,
        date: genDate,
        postBody: body,
        key: body,
        likes: [],
        comments: []
    }
    return post;
};

const Monther = (count) => {
    switch (count) {
        case 0:
            return "January"
            break;
        case 1:
            return "February"
            break;
        case 2:
            return "March"
            break;
        case 3:
            return "April"
            break;
        case 4:
            return "May"
            break;
        case 5:
            return "June"
            break;
        case 6:
            return "July"
            break;
        case 7:
            return "August"
            break;
        case 8:
            return "September"
            break;
        case 9:
            return "October"
            break;
        case 10:
            return "November"
            break;
        case 11:
            return "December"
            break;
        default:
            return "invalid Month"
            break;
    }
}

export { PostCreator };