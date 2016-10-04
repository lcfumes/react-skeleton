import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import classNames from "classnames";

let PropTypes = React.PropTypes;

class Confirmation extends React.Component {

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
                width: '300px',
                display: 'block',
                top: '35%',
                left: '40%'
            }
        };
    }

    render() {
        let content = React.DOM.div({},
            React.DOM.div({className: classNames('modal-header')}, this.props.title),
            React.DOM.div({className: classNames('modal-content')}, this.props.message, 
                React.DOM.br({}), 
                React.DOM.br({}),
                React.DOM.button({
                    className: classNames('dft', 'button', 'close'),
                    onClick: this.props.handleClickCancel
                }, "No"),
                React.DOM.button({
                    className: classNames('dft', 'button', 'primary'),
                    onClick: this.props.handleClickConfirm
                }, 'Yes')
            )
        );

        return (
            <Modal isOpen={this.props.openModal} onRequestClose={this.props.handleClickCancel} style={this.style}>
                {content}
            </Modal>
        );
    }
}


Confirmation.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClickCancel: PropTypes.func.isRequired,
  handleClickConfirm: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
}

export default Confirmation;