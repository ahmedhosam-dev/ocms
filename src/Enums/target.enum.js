export const likeOn = {
    CONTENT: 'content',
    COMMENT: 'comment',
}

export const notificationAbout = {
    ...likeOn,
    USER: 'user'
}

export const activityOn = {
    ...notificationAbout,
    TAG: 'tag',
    CATEGORY: 'category',
}