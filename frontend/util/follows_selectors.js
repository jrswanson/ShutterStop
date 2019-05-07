
export const followsUser = (follows, currentUser, otherUser) => {
    let arr = Object.values(follows);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].follower_id === currentUser && arr[i].followee_id === otherUser) {
            return arr[i].id;
        }
    }

    return null;
};