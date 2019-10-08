import React from 'react';
import './ResultsList.css';

export default class ResultList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {data} = this.props;
        return (
            <div className="resultsListDiv">
                {data.map(x => 
                    <div key={x.id} className ="resultsListItemDiv">
                        <h4>{x.name}</h4>
                        <p>Distance from marker: {x.distanceToUser.toFixed(3)} Km</p>
                    </div>
                )}
            </div>
        );
    }
}