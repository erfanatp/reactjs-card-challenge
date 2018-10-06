export function cardsHasErrored(bool) {
    return {
        type: "CARDS_HAS_ERRORED",
        hasErrored: bool
    };
}
export function cardsIsLoading(bool) {
    return {
        type: "CARDS_IS_LOADING",
        isLoading: bool
    };
}
export function cardsFetchDataSuccess(cards) {
    return {
        type: "CARDS_FETCH_DATA_SUCCESS",
        cards
    };
}

export function cardsFetchData(url) {
    return (dispatch) => {
        dispatch(cardsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(cardsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) =>  dispatch(cardsFetchDataSuccess(data.cards)))
            .catch(() => dispatch(cardsHasErrored(true)));
    };
}