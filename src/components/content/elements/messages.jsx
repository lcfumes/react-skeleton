import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import classNames from "classnames";

let PropTypes = React.PropTypes;

class AlertMessages extends React.Component {

    constructor(props) {
        super(props);

        this.style = {
            overlay : {
                backgroundColor: 'rgba(0, 0, 0, 0.55)'
            },
            content : {
                border:   '1px solid #ccc',
                padding:  '0px',
                position: 'fixed',
                height: '200px',
                width: '320px',
                display: 'block',
                top: '35%',
                left: '40%'
            }
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleClose(){
        document.removeEventListener("keypress", this.handleKeyPress, false);
        this.props.handleCloseModal();
    }

    handleOpen(){
        document.addEventListener("keypress", this.handleKeyPress, false);
    }

    handleKeyPress(e) {
        if (e.keyCode === 27 || e.keyCode === 13) {
            this.handleClose();
        }
    }

    render() {
        let content = React.DOM.div({},
            React.DOM.div({className: classNames('modal-header')}, this.props.title),
            React.DOM.div({className: classNames('modal-content')}, this.props.message, 
                React.DOM.br({}), 
                React.DOM.br({}),
                React.DOM.button({
                    className: classNames('dft', 'button', 'close'),
                    onClick: this.props.handleCloseModal
                }, "OK")
            )
        );

        return (
            <Modal isOpen={this.props.openModal} onAfterOpen={this.handleOpen} onRequestClose={this.handleClose} style={this.style}>
                {content}
            </Modal>
        );
    }
}


AlertMessages.propTypes = {
  title: PropTypes.string.isRequired,
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
}

export default AlertMessages;