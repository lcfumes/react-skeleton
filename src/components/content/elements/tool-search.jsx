import React from "react";
import classNames from "classnames";
import TagsInput from 'react-tagsinput'
import AutosizeInput from 'react-input-autosize'
import 'react-tagsinput/react-tagsinput.css'

let PropTypes = React.PropTypes;

class ToolSearch extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }

        this.defaultField = 'name';

        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    search() {
        this.props.handleSearch(this.state.tags);
    }

    handleChange(tags) {
        let error = false;
        let validate = /^((([nN][aA][mM][eE]|[sS][lL][uU][gG]):[a-zA-ZA-zÀ-úA-zÀ-ÿ0-9-\s]{1,})|([a-zA-ZA-zÀ-úA-zÀ-ÿ0-9-\s]{1,}))$/
        let search = []
        tags.forEach((tag) => {
            if (validate.test(tag)) {
                tag = (tag.indexOf(':') === -1) ? `${this.defaultField}:${tag}`: `${tag.split(':')[0].toLowerCase()}:${tag.split(':')[1]}`;
                search.push(tag);
            }
        })
        this.setState({tags: search}, () => {
                this.search();
            }
        );
    }


    render() {
        return (
             React.DOM.div({className: classNames('box-choose', 'fluid', 'form', 'col-md-12')},
                React.DOM.div({className: classNames('col-md-3', 'search-div-field')},
                    <TagsInput value={this.state.tags} onChange={this.handleChange} maxTags={10} className={`tool-search`} inputProps={{placeholder: 'Search'}} />
                ),
                React.DOM.a({className:classNames('tooltip', 'tool-search-help')}, 
                    React.DOM.i({className:classNames('fa fa-question')}), 
                    React.DOM.span({className:classNames('custom help')}, 
                        'Brand Name',
                        React.DOM.br({}),
                        'name:Brand Name',
                        React.DOM.br({}),
                        'slug:brand-slug'
                    )
                )
            )
        );
    }
}

ToolSearch.propTypes = {
  handleSearch: PropTypes.func.isRequired
}

export default ToolSearch;