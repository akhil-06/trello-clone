import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TrelloCard from "./TrelloCard";
import TrelloHeaderBar from "./TrelloHeaderBar";
import AddCardContent from "./AddCardContent";
import "../style/TrelloBoard.css"

class TrelloBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            showEditCard: false,
            editCardObj: {
                cardId: "",
                cardTitle: "",
                cardDescription: ""
            }
        }
    }

    handleDragEnd = ({ source, destination, type }) => {
        if (!destination) return;

        const { dispatch } = this.props;
        if (source.index !== destination.index) {
            dispatch({
                type: "MOVE_CARD",
                payload: {
                    oldListIndex: source.index,
                    newListIndex: destination.index
                }
            });
        }
    };


    deleteTrelloCard = (e, id) => {
        const { dispatch } = this.props;
        dispatch({
            type: "DELETE_CARD",
            payload: { cardId: id }
        });
    }

    editTrelloCard = (e, id) => {
        const cards = [...this.props.board]
        const filterCard = cards.filter(card => card.cardId === id)[0];
        const newObj = { ...this.state.editCardObj };
        newObj.cardId = filterCard.cardId;
        newObj.cardTitle = filterCard.cardTitle;
        newObj.cardDescription = filterCard.cardDescription;

        this.setState({
            showEditCard: true,
            editCardObj: newObj
        });
    }

    toggleEditForm = () => {
        this.setState({showEditCard: false})
    }

    searchHandler = (e) => {
        let searchValue = e.target.value.toLowerCase();
        this.setState({
            searchValue: searchValue
        });
    }

    onClearSearchValue = () => {
        this.setState({
            searchValue : ''
        })
    }

    render() {
        let cards = this.props.board;
        if (this.state.searchValue.length > 0) {
            cards = cards.filter(card => {
                return card.cardTitle.toLowerCase().includes(this.state.searchValue)
            });
        }
        return (
            <div>
                <TrelloHeaderBar
                    onSearchHandler={this.searchHandler}
                    searchValue = {this.state.searchValue}
                    clearSearchHandler={this.onClearSearchValue}
                />
                <div>
                    <header>
                        {/*<div>
                            {cards.map((card, index) => {
                                return (
                                    <TrelloCard
                                        cardId={card.cardId}
                                        key={card.cardId}
                                        index={index}
                                        title={card.cardTitle}
                                        description={card.cardDescription}
                                        deleteNote={(e) => this.deleteTrelloCard(e, card.cardId)}
                                        editNote={(e) => this.editTrelloCard(e, card.cardId)}
                                    />
                                )
                            })}*/}

                        <DragDropContext onDragEnd={this.handleDragEnd}>
                            <Droppable droppableId="cards">
                                {(provided) => (
                                    <div className="cards" {...provided.droppableProps} ref={provided.innerRef}>
                                        {cards.map((card, index) => {
                                            return (
                                                <Draggable key={card.cardId} draggableId={card.cardId} index={index}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <TrelloCard
                                                                cardId={card.cardId}
                                                                key={card.cardId}
                                                                index={index}
                                                                title={card.cardTitle}
                                                                description={card.cardDescription}
                                                                deleteNote={(e) => this.deleteTrelloCard(e, card.cardId)}
                                                                editNote={(e) => this.editTrelloCard(e, card.cardId)}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </header>
                </div>
                <div>
                    {this.state.showEditCard &&
                        <AddCardContent
                            isUpdate={true}
                            id={this.state.editCardObj.cardId}
                            title={this.state.editCardObj.cardTitle}
                            description={this.state.editCardObj.cardDescription}
                            handleClose={this.toggleEditForm}/>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ board: state.board });
export default connect(mapStateToProps)(TrelloBoard);