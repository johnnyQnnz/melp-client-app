import React from 'react';
import './ResultsDetails.css';

export default class ResultsDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    calculateAverage(arr) {
        let sum = arr.reduce(function(sum, value){
            return sum + value;
          }, 0);
        
          var avg = sum / arr.length;
          return avg;
    }
    calculateStdDev(arr) {
        var avg = this.calculateAverage(arr);
        var squareDiffs = arr.map(function(value){
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });
        
        var avgSquareDiff = this.calculateAverage(squareDiffs);

        var stdDev = Math.sqrt(avgSquareDiff);
        console.log(stdDev);
        return stdDev;
    }
    render() {
        const {data} = this.props;
        let arr = [];
        for(let i = 0; i<data.length; i++) {
            arr.push(data[i].rating);
        }
        const avrg = this.calculateAverage(arr);
        const stdDev = this.calculateStdDev(arr);
        return (
            <div className="resultsDetailsDiv">
                <p>Restaurants found: {data.length}</p>
                <p>Average rating: {avrg.toFixed(2)}</p>
                <p>Rating standard deviation: {stdDev.toFixed(2)}</p>
            </div>
        );
    }
}