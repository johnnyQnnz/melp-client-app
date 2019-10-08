import React from 'react';
import './RestaurantList.css';

export default class RestaurantList extends React.Component {
    constructor (props){
        super(props);
    }
    render () {
        const {data} = this.props;
        //console.log(data);

        // const divArray = data.map((res) => {
        //    return ( 
        //         <div key={res.id}>
        //             <h1>{res.name}</h1> 
        //         </div>
        //     )
        // });

        return (
            <div>
                <div className="restaurantListDiv">
                    {data.map(x => 
                        <div key={x.id} className ="restaurantDiv">
                            <div className="nameRatingDiv">
                                <div className ="nameDiv"><h3>{x.name.toUpperCase()}</h3></div>
                                <div className ="ratingDiv">
                                    <p>Rating: {x.rating} / 5</p>
                                </div>
                            </div>
                            <div className="imageAddressDiv">
                                <div className="imageDiv">
                                    <img 
                                    src = "https://res.cloudinary.com/dipt6v4xr/image/upload/v1570469514/restaurant-chocolat.jpg"
                                    alt = "Restaurant "
                                    />
                                </div>
                                <div className="addressDiv">
                                    <h4>Address:</h4>
                                    <p>{x.address.street}</p>
                                    <p>{x.address.city}</p>
                                    <p>{x.address.state}</p>
                                </div>
                            </div>
                            <div className="contactIdDiv">
                                <div className="contactDiv">
                                    <h4>Contact:</h4>
                                    <p><a href={x.contact.site} target="_blank">{x.contact.site}</a></p>
                                    <p>{x.contact.email}</p>
                                    <p>{x.contact.phone}</p>
                                </div>
                                {/* <div className="idDiv">
                                    <p>{x.id}</p>
                                </div> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };
}