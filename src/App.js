import React from 'react';
import Home from './Components/HomeComponent/Home';
import Location from './Components/LocationComponent/Location';
import { HashRouter, Route, Link, Switch} from 'react-router-dom';
import RestaurantList from './Components/RestaurantListComponent/RestaurantList';
import Nav from './Components/Nav';
import SortSelect from './Components/SortSelectComponent/SortSelect'
import './App.css';
import ScrollUpButton from 'react-scroll-up-button';

export class App extends React.Component {
  
  render() {
    return (
      // <div className="App">
      //   <Nav/>
      //   <SortSelect onChange={this.handleSortChange}/>
      //   <RestaurantList data = {data}/>
      //   <ScrollUpButton />
      // </div>
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/location" component={Location}/>
          </Switch>
        </HashRouter>
      </div>
      
    );
  }

  
}

export default App;