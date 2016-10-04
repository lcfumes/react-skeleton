import React from 'react';
import classNames from "classnames";

let PropTypes = React.PropTypes;

class Pagination extends React.Component {

    constructor(props) {
        super(props);

        this.maxPage = 3;
    }

    render() {
        if (this.props.totalPages === 0) {
            return React.DOM.div({});
        }

        let totalPages = new Array(this.props.totalPages).fill('');
        let actualPage = this.props.page;
        let showMoreDown = null;
        let showMoreUp = null;

        let pages = totalPages.map(function(value, i) {
            let page = i + 1;
            if (page > actualPage && (page > (actualPage + this.maxPage))) {
                showMoreUp = true;
                return false;
            }

            if (page < actualPage && (page < (actualPage - this.maxPage))) {
                showMoreDown = true;
                return false;
            }

            let attr = {
                onClick: this.props.setCurrentPage.bind(this, page)
            }

            let link = React.DOM.a(attr, page);
            let active = false;
            if (page == this.props.page) {
                let active = true;
                link = React.DOM.span({}, page);
            }

            return React.DOM.li({key: 'page-' + page, className: classNames({'active': active})}, link);
        }.bind(this));

        let attrFirst = {
            className: 'btn',
            onClick: this.props.setCurrentPage.bind(this, 1),
            key: 'first-page',
            id: 'pagination-first-page'
        };
        let attrLast = {
            className: 'btn',
            onClick: this.props.setCurrentPage.bind(this, this.props.totalPages),
            key: 'page-back',
            id: 'pagination-last-page'
        };
        let attrBack = {
            className: 'btn',
            onClick: this.props.setCurrentPage.bind(this, (parseInt(this.props.page) - 1)),
            key: 'page-back'
        };
        let attrNext = {
            className: 'btn',
            onClick: this.props.setCurrentPage.bind(this, (parseInt(this.props.page) + 1)),
            key: 'page-next'
        };
        let first = null;
        let last = null;

        if (showMoreDown) {
            showMoreDown = React.DOM.li({}, React.DOM.span({}, '...'));
        }
        if (showMoreUp) {
            showMoreUp = React.DOM.li({}, React.DOM.span({}, '...'));
        }
        let pagination = React.DOM.div({className: 'pagination'}, 
            React.DOM.ul({id: 'pagination'}, 
                React.DOM.li({}, React.DOM.a(attrFirst, React.DOM.i({className: classNames('fa', {'fa-angle-double-left': (this.props.page > 1)})}))),
                React.DOM.li({}, React.DOM.a(attrBack, React.DOM.i({className: classNames('fa', {'fa-angle-left': (this.props.page != 1)})}))),
                showMoreDown,
                pages,
                showMoreUp,
                React.DOM.li({}, React.DOM.a(attrNext, React.DOM.i({className: classNames('fa', {'fa-angle-right': (this.props.page != this.props.totalPages)})}))),
                React.DOM.li({}, React.DOM.a(attrLast, React.DOM.i({className: classNames('fa', {'fa-angle-double-right': (this.props.page < this.props.totalPages)})})))
            )
        );
        return (pagination);
    }
}

Pagination.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
}

export default Pagination;