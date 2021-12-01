import React, {useState} from 'react';
import '../style/TrelloCard.css';
import { CreateOutline, TrashOutline } from 'react-ionicons'
import Popup from "./Popup";

const TrelloCard = (props) => {
    const [popup, setPopup] = useState(false);

    const handleCancel = (e) => {
        e.preventDefault();
        setPopup(false);
    }

    return (
        <>
        <div className="trello-card">
            <h4>{props.title}</h4>
            <div className="trello-content">
                <span className="text-wrap">{props.description}</span>
            </div>
            <div className="buttons-wrapper">
                <button className="delete-btn" title="delete"
                        onClick={() => setPopup(true)}>
                    <TrashOutline
                        color={'#00000'}
                        title=""
                        height="25px"
                        width="25px"
                    />
                </button>
                <button className="edit-btn" title="edit"
                        onClick={props.editNote}>
                    <CreateOutline
                        color={'#00000'}
                        title=""
                        height="25px"
                        width="25px"
                    />
                </button>
            </div>
        </div>
        <div>
            {popup && <Popup handleDeleteTrue={props.deleteNote} handleCancel={handleCancel} />}
        </div>
        </>
    );
}

export default TrelloCard;


