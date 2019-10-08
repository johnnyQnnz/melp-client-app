import React from 'react';
import { Link } from 'react-router-dom';
import './SortSelect.css';

export default class SortSelect extends React.Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        const selectValue = e.target.value;
        console.log(selectValue);
        this.props.onChange(selectValue);
        
    }
    render () {
        return (
            <div>
            <h2 className="sortSelectH2"><span className="fa fa-map-marker checked"/> Restaurant explore</h2>
            <div className="sortSelect">
                <div className="orderByDiv">
                    <p>Order by: </p>
                    <select onChange={this.handleChange}>
                        <option>ABC...</option>
                        <option>Rating</option>
                    </select>
                </div>
                <div className="locationButtonDiv">
                    <Link to="/location"><button>Search by location</button></Link>
                </div>
            </div>
            </div>
        );
    }
}