import React from 'react';
import axios from 'axios';
import Nav from '../Nav';
import './Location.css';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

export class Location extends React.Component {
    constructor (props) {
        super(props); 
        this.state = {
          data: [],
          nearbyRestaurants: [],
          userLocation: {
              lat: 0.0,
              lng: 0.0
          }
        }
        axios.get('../../data/data.json')
        //fetch('https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json')
        //axios.get('https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json', { method: 'GET', headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json', mode: 'no-cors'}})
        .then(x => {
        console.log(x.data);
        this.setState ({data: x.data});
        console.log(this.state);
        });
        // this.handleSortChange = this.handleSortChange.bind(this)
    }
    async componentDidMount() {
        const { lat, lng } = await this.getcurrentLocation();
        console.log('lat: ' + lat);
        this.setState({
            userLocation: {
                lat: lat,
                lng: lng
            }
        })
    }
    getcurrentLocation() {
        if (navigator && navigator.geolocation) {
            return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                resolve({
                lat: coords.latitude,
                lng: coords.longitude
                });
            });
            });
        }
        return {
            lat: 0,
            lng: 0
        };
    }
    addMarker = (location, map) => {
        this.setState({
            userLocation: location
        });
        map.panTo(location);
      };
    logCoordinates(e) {
        console.log(e.google);
    }
    render () {
        const mapStyles = {
            width: '100%',
            height: '400px',
        };
        return (
            <div>
                <Nav/>
                <div className="searchDiv">
                    <div>
                        <p>Search within a radius of: </p><input type="number"/> meters
                    </div>
                    <div>
                        <button>Search</button>
                    </div>
                </div>
                <div className="mapDiv">
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 47.444, lng: -122.176}}
                    onClick={(t, map, c) => {
                        // console.log('t: ');
                        // console.log(t);
                        // console.log('map: ');
                        // console.log(map);
                        // console.log('c: ');
                        // console.log(c);
                        this.addMarker(c.latLng, map)
                    }
                    }
                >
                    <Marker position={this.state.userLocation} />
                </Map>
                </div>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBmX5reXyIC2aYXiVgg7kcoQZN1Be3WxFE'
  })(Location);