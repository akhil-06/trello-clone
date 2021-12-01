const BoardReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_CARD": {
            return [...state, action.payload];
        }
        case "EDIT_CARD": {
            const cards = [...state]
            const filterCard = cards.filter(card => card.cardId === action.payload.cardId)[0];
            filterCard.cardTitle=action.payload.cardTitle
            filterCard.cardDescription=action.payload.cardDescription
            return state;
        }
        case "DELETE_CARD": {
            const cards = [...state]
            cards.splice(cards.findIndex(function(card){
                return card.cardId === action.payload.cardId;
            }), 1);
            state=[...cards];
            return state;
        }
        case "MOVE_CARD": {
            const { oldListIndex, newListIndex } = action.payload;
            const newCards = [...state];
            const [removedCard] = newCards.splice(oldListIndex, 1);
            newCards.splice(newListIndex, 0, removedCard);
            state=[...newCards];
            return state;
        }
        default:
            return state;
    }
};

export default BoardReducer;