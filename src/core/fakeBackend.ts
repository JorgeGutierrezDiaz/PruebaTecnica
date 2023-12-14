//Guardamos la base de datos, despues esto lo usamos para guardarlo todo el objeto completo en localstorage simulando una api

export let backend = {
    content: [],
    pageable: {
        sort: {
            empty: false,
            sorted: true,
            unsorted: false,
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 100,
        paged: true,
        unpaged: false,
    },
    totalPages: 1,
    totalElements: 6,
    last: true,
    number: 0,
    sort: {
        empty: false,
        sorted: true,
        unsorted: false,
    },
    size: 10,
    numberOfElements: 6,
    first: true,
    empty: false,
};
