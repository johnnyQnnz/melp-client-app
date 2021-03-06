import React from 'react';
import './RestaurantList.css';
import StarRating from '../StarRating';

export default class RestaurantList extends React.Component {
    constructor (props){
        super(props);
    }
    getRandomImage(){
        const arr = [
            "https://res.cloudinary.com/dipt6v4xr/image/upload/v1570469514/restaurant-chocolat.jpg",
            "https://res.cloudinary.com/dipt6v4xr/image/upload/v1570537769/restaurant04.jpg",
            "https://res.cloudinary.com/dipt6v4xr/image/upload/v1570537769/restaurant02.jpg",
            "https://res.cloudinary.com/dipt6v4xr/image/upload/v1570537768/restaurant03.jpg",
            "https://res.cloudinary.com/dipt6v4xr/image/upload/v1570537769/restaurant05.jpg"
        ];
        return arr[Math.floor(Math.random() * 5)];
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
                                    {/* <p>Rating: {x.rating} / 4</p> */}
                                    <StarRating rating = {x.rating}/>
                                </div>
                            </div>
                            <div className="imageAddressDiv">
                                <div className="imageDiv">
                                    <img 
                                    src = {this.getRandomImage()}
                                    alt = "Restaurant "
                                    />
                                </div>
                                <div className="fbDiv">
                                <div className="fb-like" 
                                data-href="https://johnnyqnnz.github.io/melp-client-app/" 
                                data-width="" data-layout="button_count" data-action="like" 
                                data-size="small" data-show-faces="true" data-share="true"></div>
                                </div>
                                <div className="addressDiv">
                                    <h4><span className="fa fa-map-marker checked"/>  Address:</h4>
                                    <p>{x.address.street}</p>
                                    <p>{x.address.city}</p>
                                    <p>{x.address.state}</p>
                                </div>
                            </div>
                            <div className="contactIdDiv">
                                <div className="contactDiv">
                                    <h4><span className="fa fa-user checked"/> Contact:</h4>
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