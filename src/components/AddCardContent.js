import React from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { Button } from 'react-bootstrap'
import '../style/AddCardContent.css';

class AddCardContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description,
            titleErrorMsg: "Title should be between 1-30 character in length",
            descErrorMsg: "Description should be between 1-150 character in length",
            isValidTitle: false,
            isValidDescription: false
        };
    }

    handleChangeTitle = (e) => {
        let title = e.target.value;
        if (title.length > 0 && title.length <=30) {
            this.setState({
                title: e.target.value,
                isValidTitle: true
            });
        } else {
            this.setState({
                title: e.target.value,
                isValidTitle: false
            });
        }
    }

    handleChangeDesc = (e) => {
        let title = e.target.value;
        if (title.length > 0 && title.length <=150) {
            this.setState({
                description: e.target.value,
                isValidDescription: true
            });
        } else {
            this.setState({
                description: e.target.value,
                isValidDescription: false
            });
        }
    }

    createCard = (e) => {
        e.preventDefault();
        const { title, description } = this.state;
        const { dispatch, isUpdate } = this.props;

        if(isUpdate) {
            dispatch({
                type: "EDIT_CARD",
                payload: { cardId: this.props.id, cardTitle: title, cardDescription: description }
            });
        } else {
            dispatch({
                type: "ADD_CARD",
                payload: { cardId: shortid.generate(), cardTitle: title, cardDescription: description }
            });
        }
        this.props.handleClose();
    };

    render() {
        return (
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.props.handleClose}>x</span>
                    <form>
                        <div className="form-group">
                            {this.props.isUpdate ? <label>Edit Card</label> : <label>New Card</label>}
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle} />
                            {!this.state.isValidTitle && <span className="errorMsg">{this.state.titleErrorMsg}</span>}
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" value={this.state.description} onChange={this.handleChangeDesc} />
                            {!this.state.isValidDescription && <span className="errorMsg">{this.state.descErrorMsg}</span>}
                        </div>
                        {this.state.isValidTitle && this.state.isValidDescription ?
                            <Button variant="primary" size="lg" active onClick={this.createCard} >
                                Save
                            </Button> :
                            <Button variant="primary" size="lg" disabled onClick={this.createCard} >
                                Save
                            </Button>
                        }
                        {' '}
                        <Button variant="secondary" size="lg" active onClick={this.props.handleClose} >
                            Close
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(AddCardContent);