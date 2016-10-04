import React from 'react';
import classNames from "classnames";

let PropTypes = React.PropTypes;

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.getExtraColumn = this.getExtraColumn.bind(this);
    }

    getExtraColumn(elementId, line_id) {
        if (!this.props.extraColumn) {
            return "";
        }
        let extra = this.props.extraColumn.map((content, i) => {
            return React.DOM.div({
                    className: 'col-md-1 center',
                    key: 'field_' + line_id + '_' + i 
                },
                React.DOM.a({onClick: content.event.bind(this, elementId)}, React.DOM.i({className: content.style}, content.text))
            );
        });
        return extra;
    }

    getBodyNotFound() {
        return React.DOM.div({
                className: 'item-accordion'
            }, React.DOM.div({className: 'title-accordion'},
            React.DOM.div({className: 'row'},
                React.DOM.div({className: 'center'}, "No records found")
            )
        ));
    }

    getBody(content) {
        if (content.length === 0) {
            return this.getBodyNotFound();
        }

        let body = content.map((contentData, line_i) => {
            return React.DOM.div({
                    className: 'item-accordion', 
                    key: 'line_' + line_i
                }, React.DOM.div({className: 'title-accordion'},
                    React.DOM.div({className: 'row'},
                        this.props.content.map((content, field_i) => {
                            let field = content.field;
                            let value = contentData[field];
                            if (content.type === 'date') {
                                value = new Date(contentData[field]).toLocaleString();
                            }
                            return React.DOM.div({
                                className: content.style, 
                                key: "field_" + line_i + '_' + field_i
                            }, value)
                        }), this.getExtraColumn(contentData.id, line_i)
                    )
                )
            )
        });

        return body;
    }

    render() {

        let header = null;

        if (this.props.contentData.length > 0) {
            header = this.props.headers.map((content, i) => {
                let title = content.text;
                if (content.event !== undefined) {
                    title = React.DOM.a({
                        onClick: e => content.event(content.field)
                    }, content.text)
                }
                return React.DOM.div({
                    className: content.style,
                    key: 'header_' + i 
                }, title)
            });
        }

        let body = this.getBody(this.props.contentData);

        let content = React.DOM.div({className: 'table-accordion'},
            React.DOM.div({className: 'th-accordion'},
                React.DOM.div({className: 'row'},
                    header
                )
            ), body
        );

        return (content);
    }
}

Table.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Table;
