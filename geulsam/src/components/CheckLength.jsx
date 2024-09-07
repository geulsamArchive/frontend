export const CheckTitleLength = (title = '', len) => {

    let result = ''
    if (title.length > len) {
        result = title.substr(0, len - 2) + '...';
    } else {
        result = title;
    }
    return result
}

