import React from 'react';
import ReactDOM from "react-dom";
import { Link } from 'react-router';
import classNames from "classnames";

let menuItems = [
    { route: '/example', text: 'Example', style: 'fa-sitemap' },
];

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    getItems() {
        let items = menu.map((item, itinerator) => {
            return React.DOM.li({key: "menu_" + itinerator},
                <Link to={item.route} activeClassName="active">
                    <i className={classNames('fa', item.style)}></i>{item.text}
                </Link>)
        });

        return items;
    }

    render() {
        
        return (
            React.DOM.aside({className: classNames('horizontal-menu')},
                React.DOM.ul({},
                    React.DOM.li({}, 
                        <div class="logo"><b>Example</b> Service</div>
                    ), this.getItems()
                )
            )
        );
    }
}

Menu.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Menu;
