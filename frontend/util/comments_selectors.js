export const numComments = (comments, photoId) => {
    let arr = Object.values(comments);
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].photo_id === photoId) {
            count += 1;
        }
    }

    return count;
};