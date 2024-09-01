export const translateType = (type) => {
    switch (type) {
        case 'NOVEL':
            return '소설';
        case 'ESSAY':
            return '수필';
        case 'POEM':
            return '시';
        default:
            return type;
    }
};


export const translateCondition = (type) => {
    switch (type) {
        case 'FIXED':
            return '승인';
        case 'UNFIXED':
            return '미승인';
        default:
            return type;
    }
};
