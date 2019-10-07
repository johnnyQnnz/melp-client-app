import React from 'react';

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
                <p>Order by: </p>
                <select onChange={this.handleChange}>
                    <option>ABC...</option>
                    <option>Rating</option>
                </select>
            </div>
        );
    }
}