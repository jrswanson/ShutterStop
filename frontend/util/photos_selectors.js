
export const userPhotosSelector = (state) => {
    return Object.values(state.entities.photos).filter(el => state.session.id === el.user_id)
};