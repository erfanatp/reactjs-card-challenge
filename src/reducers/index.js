import { combineReducers } from "redux";
import { cards, cardsHasErrored, cardsIsLoading } from "./CardsReducer";

const rootReducer = combineReducers({
    cards,
    cardsHasErrored,
    cardsIsLoading
});

export default rootReducer;
