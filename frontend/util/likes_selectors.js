
export const likesPhoto = (likes, currentUser, photoId) => {
    let arr = Object.values(likes);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].liker_id === currentUser && arr[i].photo_id === photoId) {
            return arr[i].id;
        }
    }

    return null;
};

export const numLikes = (likes, photoId) => {
    let arr = Object.values(likes);
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].photo_id === photoId) {
            count += 1;
        }
    }

    return count;
};