export const errorMessage = (errorResponseStatus) => {
    let errMsg = "";

    switch (errorResponseStatus) {
        case 413:
            errMsg = "Post zajmuje zbyt dużą ilość pamięci! Maksymalnie 16Mb";
            break;
        case 429:
            errMsg =
                "Osiągnięto maksymalną liczbę prób. Sporóbuj ponownie za 3 minuty";
            break;
        default:
            errMsg = "Nieudana próba";
            break;
    }
    return errMsg;
};
