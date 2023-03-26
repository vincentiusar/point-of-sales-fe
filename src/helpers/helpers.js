function redirectByKey(user, key) {
    if (key === 'back') {
        return `/restaurant`;
    }
    
    return `/restaurant/${user.restaurant_id}/${key}`;
    // switch (Number(key)) {
    //     case 1:
    //         return `/restaurant/${user.restaurant_id}/dashboard`;
    //     case 2:
    //         return `/restaurant/${user.restaurant_id}/table`;
    //     case 6:
    //         return `/restaurant`;
    //     default:
    //         break;
    // }
}

export { redirectByKey };