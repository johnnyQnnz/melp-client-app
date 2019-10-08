import React from 'react';
import Home from './Components/HomeComponent/Home';
import Location from './Components/LocationComponent/Location';
import { HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';

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