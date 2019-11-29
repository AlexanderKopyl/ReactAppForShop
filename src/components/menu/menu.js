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
            this.setState({items:result});

            let {items} = this.state;
            console.log(result);
            result.map((elem) =>{
                // elem.child.map((ch) => {
                //     console.log(ch)
                // })
                console.log(elem);

                // elem.child.then(
                //     e =>{
                //         this.setState({
                //             child:e
                //         })
                //         elem.child = this.state.child;
                //     }
                // );

            });



            console.log(this.state)
        };
        fetchItems();
    }

    render(){
        let {items} = this.state;
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
                                                {child.oc_category_description.name}
                                            </a>
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

