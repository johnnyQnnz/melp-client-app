import React from 'react';
import './ResultsList.css';
import StarRating from '../StarRating';

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
                        <h3>{x.name}</h3>
                        <StarRating rating={x.rating}/>

                        <p>Distance from marker: {x.distanceToUser.toFixed(3)} Km</p>
                        <div className="addressDiv">
                            <h4><span className="fa fa-map-marker checked"/> Address: </h4>
                            <p>Street: {x.address.street}</p>
                            <p>State: {x.address.state}</p>
                            <p>City: {x.address.city}</p>
                        </div>
                        <div className="contactDiv">
                            <h4><span className="fa fa-user checked"/> Contact: </h4>
                            <p>Email: {x.contact.email}</p>
                            <p>Phone: {x.contact.phone}</p>
                            <p>Site: {x.contact.site}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}