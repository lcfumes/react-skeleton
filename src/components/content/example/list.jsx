import React from "react";
import axios from "axios";
import { Link, browserHistory } from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';
import classNames from "classnames";
import Table from "../elements/table";
import AlertMessages from '../elements/messages';
import ToolSearch from '../elements/tool-search';
import Pagination from "../elements/pagination";
import { toArray } from "lodash";
import Confirmation from '../elements/confirmation';
import Config from 'Config';

class ExampleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            examples: [],
            loading: true,
            page: this.props.location.query.page ? this.props.location.query.page : 1,
            limit: this.props.location.query.limit ? this.props.location.query.limit : 10,
            search: "",
            sort: {
                by: "",
                order: ""
            },
            total: 0,
            totalPages: 0,
            alert: {
                modal: false,
                message: ''
            },
            remove: {
                modal: false,
                id: ''
            }
        };

        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.getAlertMessage = this.getAlertMessage.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleHeaderOrder = this.handleHeaderOrder.bind(this);

        this.tableHeader = [
            {'text': 'Name', 'style': 'col-md-2', 'field': 'name', 'event': this.handleHeaderOrder},
            {'text': 'Slug', 'style': 'col-md-2', 'field': 'slug', 'event': this.handleHeaderOrder},
            {'text': 'Created', 'style': 'col-md-3', 'field': 'created_at', 'event': this.handleHeaderOrder},
            {'text': 'Updated', 'style': 'col-md-3', 'field': 'updated_at', 'event': this.handleHeaderOrder},
            {'text': 'Remove', 'style': 'col-md-1 center'},
            {'text': 'Edit', 'style': 'col-md-1 center'}
        ];
        this.content = [
            {'field': 'name', 'style': 'col-md-2', type: 'text'},
            {'field': 'slug', 'style': 'col-md-2', type: 'text'},
            {'field': 'created_at', 'style': 'col-md-3 text-note', type: 'date'},
            {'field': 'updated_at', 'style': 'col-md-3 text-note', type: 'date'}
        ];
        this.extraColumn = [
            {'text': '', 'style': 'fa fa-trash', 'event': this.openConfirmModal},
            {'text': '', 'style': 'fa fa-pencil', 'event': this.handleClickEdit}
        ];
    }

    componentWillMount() {
        this.setCurrentPage(this.state.page);
    }

    setCurrentPage(page) {
        this.context.router.push({
            pathname: this.props.route.path,
            query: {
                page: page,
                limit: this.state.limit
            }
        });
        this.getExamples(page);
    }

    handleClickRemove() {
        if (!this.state.remove.id) {
            return false;
        }

        this.closeConfirmModal();
    }

    openConfirmModal(id) {
        this.setState({remove: {modal: true, id: id}});
    }

    closeConfirmModal() {
        this.setState({remove: {modal: false}});
    }

    handleClickEdit(id) {
    }

    getExamples(currentpage) {
        let page = currentpage;
        let limit = this.state.limit;

        let uri = `${this.uri}?`;
       
        if (Array.isArray(this.state.search)) {
            let param = "";
            this.state.search.forEach((search, i) => {
                param += `&filter=${Object.keys(search)}:${search[Object.keys(search)]}`;
            });
            uri += param;
        }

        if (this.state.sort.by !== "") {
            uri += `&sort=${this.state.sort.by}`;
        }

        if (this.state.sort.order !== "") {
            uri += `&order=${this.state.sort.order}`;
        }

        uri += `&page=${page}&limit=${limit}`;

    
	let mock = {
            name: "Example",
            slug: "Example",
            "created_at": new Date().now(),
            "updated_at": new Date().now()
        }

        this.setState({
           examples: [mock],
           total: 100, 
           totalPages: 10, 
           page: page,
           loading: false
        });
    }

    handleCloseModal() {
        this.setState({
            alert: {
                modal: false,
                message: ""
            }
        });
    }

    getAlertMessage(message) {
        return (
            React.DOM.span({}, this.state.alert.message)
        )
    }

    handleSearch(search) {
        let searchFields = [];
        search.forEach((value, i) => {
            let field = {};
            field[value.split(":")[0]] = value.split(":")[1];
            searchFields.push(field);
        });

        this.setState({
            search: searchFields,
            sort: {
                by: "",
                order: ""
            }
        }, () => {
            this.getExamples(1);
        });

    }

    handleHeaderOrder(order) {
        this.setState({
            sort: {
                by: order,
                order: (this.state.sort.order === 'asc' || this.state.sort.order === '') ? 'desc' : 'asc'
            }
        }, () => {
            this.getExamples(1);
        });
    }

    render() {
        if (this.state.loading === true) {
            return React.DOM.div({className: classNames('loader')})
        }

        let pagination = '';
        if (this.state.total > 0) {
            pagination = <Pagination setCurrentPage={this.setCurrentPage} page={Number(this.state.page)} totalPages={Number(this.state.totalPages)} />;
        }
        let content = React.DOM.div({},
            <AlertMessages title="Alert" message={this.getAlertMessage()} handleCloseModal={this.handleCloseModal} openModal={this.state.alert.modal} />,
            <Confirmation title="Remove Example" message="Are you sure do you want to remove this Example?" handleClickConfirm={this.handleClickRemove} handleClickCancel={this.closeConfirmModal} openModal={this.state.remove.modal} />,
            React.DOM.div({className: 'header-content'}, 
                React.DOM.div({className: 'row'}, 
                    React.DOM.div({className: 'col-md-6'},
                        React.DOM.h2({}, 'Examples'),
                        <Breadcrumbs routes={this.props.routes} params={this.props.params} />
                    )
                )
            ),
            React.DOM.div({className: 'section-content'}, 
                <ToolSearch handleSearch={this.handleSearch} />,
                <Table contentData={toArray(this.state.examples)} content={this.content} extraColumn={this.extraColumn} headers={this.tableHeader} />,
                pagination
            )
        );
        return (content);
    }
}

ExampleList.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ExampleList;
