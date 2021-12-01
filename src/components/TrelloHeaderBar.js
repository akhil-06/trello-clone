import React, {useState} from 'react';
import '../style/TrelloHeaderBar.css';
import RelevelLogo from '../assets/relevel.jpeg'
import {SearchOutline, CloseOutline} from 'react-ionicons'
import { Button } from 'react-bootstrap'
import AddCardContent from "./AddCardContent";

const TrelloHeaderBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    let style;
    if(props.searchValue.length > 0){
        style = {
            marginRight: '5px',
            opacity: '1'
        }
    }
    else{
        style = {
            marginRight: '5px',
            opacity: '0'
        }
    }

    return (
        <div className="HeaderApp">
            <header id="Header">
                <div className="logo">
                    <img src={RelevelLogo} alt="logo" />
                    <h4>Relevel Trello</h4>
                </div>
                {<div className="button-container">
                    <Button variant="primary" size="lg" active onClick={togglePopup} >
                        Add Card
                    </Button>
                </div>}
                <div className="searchBar-container">
                    <SearchOutline
                        name="search-outline"
                        height="25px"
                        width="25px"
                    />
                    <input type="text"
                           name="search"
                           placeholder="Search..."
                           value={props.searchValue}
                           onChange={props.onSearchHandler}/>
                    <CloseOutline
                        name="close-outline"
                        style={style}
                        onClick={props.clearSearchHandler}></CloseOutline>
                </div>
                <div>
                    {isOpen &&
                    <AddCardContent
                        isUpdate={false}
                        id=''
                        title=''
                        description=''
                        handleClose={togglePopup}/>}
                </div>
            </header>
        </div>
    )
}

export default TrelloHeaderBar;
