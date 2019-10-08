import React from 'react';
import axios from 'axios';

import Nav from '../Nav';
import RestaurantList from '../RestaurantListComponent/RestaurantList';
import SortSelect from '../SortSelectComponent/SortSelect';
import ScrollUpButton from 'react-scroll-up-button';
import '../../App.css';


export default class Home extends React.Component {
    constructor (props) {
        super(props); 
        this.state = {
          data: [],
          orderBy: 'ABC...'
        }
          axios.get('../../data/data.json')
          //fetch('https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json')
          //axios.get('https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json', { method: 'GET', headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json', mode: 'no-cors'}})
          .then(x => {
          console.log(x.data);
          this.setState ({data: x.data});
          console.log(this.state);
        });
        this.handleSortChange = this.handleSortChange.bind(this)
      }
      handleSortChange(selectValue) {
        console.log('Selected value: ' + selectValue);
        this.setState({orderBy: selectValue})
        console.log(this.state);
        if(selectValue === 'ABC...') {
          this.sortAlphabetically(this.state.data);
        } else {
          this.sortByRating(this.state.data);
        }
      }
      sortAlphabetically(data)  {
        return data.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });
      }
      sortByRating(data) {
        return data.sort((a, b) => {
            var ratingA = a.rating;
            var ratingB = b.rating;
            return (ratingA > ratingB) ? -1 : (ratingA < ratingB) ? 1 : 0;
        });
      }
    render () {
        const {data} = this.state
        return (
            <div className="homeDiv">
                <Nav/>
                <SortSelect onChange={this.handleSortChange}/>
                <RestaurantList data = {data}/>
                <ScrollUpButton />
            </div>
            
        );
    }
}