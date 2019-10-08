import React from 'react';
import './rating.css';

export default class StarRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        }
    }
    render () {
        const iArr = [];
        const passedInRating = this.props.rating;
        for(let i=0; i<4; i++) {
            if(i < passedInRating) {
                iArr[i] = <span key={i} className="fa fa-star checked"></span>
            } else {
                iArr[i] = <span key={i} className="fa fa-star"></span>
            }
        }
        return (
            <div className = "StarRatingDiv">
                {iArr}
            </div>
        );
    }
}