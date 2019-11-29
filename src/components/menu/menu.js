import React, {Component} from "react";
import {menuService} from "../../shared/menu-service";
import {MDBListGroup, MDBListGroupItem} from "mdbreact";


export default class Menu extends Component{

    state = {
      items: [],
      child: []
    };

    componentDidMount() {
        const fetchItems = async () => {


            const result = await menuService.getCategories();
            this.setState({
                items:result
            });

        };
        fetchItems()
    }

    render(){
        let {items} = this.state;
        console.log(items);
        return (
            <div>
                <ul className="nav navbar-nav">
                    {items.map((r) => (
                        <li key={r.category_id} className={r.child.length ? "has-children" : ''}>
                            <a href={"/category/" + r.category_id}>{r.name}</a>
                            {
                                r.child.length ?
                                    <ul>
                                        {r.child.map((child) => (
                                            <li key={child.category_id}>
                                                <a href={"/category/" + child.category_id}>
                                                    {child.name}
                                                </a>
                                                {   child.child.length > 0 ?
                                                    <div>
                                                        <span className="dropdown-toggle visible-xs visible-sm"><i
                                                            className="fa fa-plus" aria-hidden="true"></i><i
                                                            className="fa fa-minus" aria-hidden="true"></i></span>
                                                        <div className="third-level dropdown-menu">
                                                            <div className="dropdown-inner">
                                                                <ul className="list-unstyled child">
                                                                    {child.child.map((itemms) => (
                                                                        <li key={itemms.category_id}>
                                                                            <a href={"/category/" + itemms.category_id}>{itemms.oc_category_description.name}</a>
                                                                        </li>

                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                        :''}
                                            </li>

                                        ))}
                                    </ul>
                                : ''}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

};

