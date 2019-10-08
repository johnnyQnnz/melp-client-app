import React from 'react';
import axios from 'axios';
import Nav from '../Nav';
import ResultList from '../ResultsListComponent/ResultList';
import ResultsDetails from '../ResultsListComponent/ResultsDetails';
import './Location.css';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import ScrollUpButton from 'react-scroll-up-button';


export class Location extends React.Component {
    constructor (props) {
        super(props); 
        this.state = {
            data: [],
            nearbyRestaurants: [],
            userLocation: {
                lat: 19.432608,
                lng: -99.133209
            },
            searchRadius: 10.0,
            searched: false
        }
        if(process.env.NODE_ENV === "production") {
            axios.get('./data/data.json')
            //fetch('https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json')
            //axios.get('https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json', { method: 'GET', headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json', mode: 'no-cors'}})
            .then(x => {
            console.log(x.data);
            this.setState ({data: x.data});
            console.log(this.state);
            });
        } else if(process.env.NODE_ENV === "development") {
            axios.get('./data/data.json')
            //fetch('https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json')
            //axios.get('https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json', { method: 'GET', headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json', mode: 'no-cors'}})
            .then(x => {
            console.log(x.data);
            this.setState ({data: x.data});
            console.log(this.state);
            });
        }
        this.changeSearchRadius = this.changeSearchRadius.bind(this);
        this.searchRadius = this.searchRadius.bind(this)
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
            userLocation: {
                lat: location.lat(),
                lng: location.lng()
            }
        });
        console.log(this.state.userLocation)
        map.panTo(location);
    };
    changeSearchRadius(e) {
        //console.log(e);
        this.setState({
            searchRadius: e.target.value
        });
        //console.log(this.state);
    }
    render () {
        const mapStyles = {
            width: '100%',
            height: '300px',
        };
        let nearbyMarkers = this.state.nearbyRestaurants.map( x => {
            let markerPos = x.address.location;
            return <Marker key={x.id} position={markerPos}/>
        })
        return (
            <div>
                <Nav/>
                <div className="searchDiv">
                    <div>
                        <h3>Click on the map to add a marker!</h3>
                    </div>
                    <div>
                        <p>Search within a radius of: </p><input type="number" defaultValue={this.state.searchRadius} onChange={this.changeSearchRadius}/> meters
                    </div>
                    <div className="searchButtonDiv">
                        <button onClick={this.searchRadius}>Search</button>
                    </div>
                </div>
                <div className="mapDiv">
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: this.state.userLocation.lat, lng: this.state.userLocation.lng}}
                    onClick={(t, map, c) => {
                        this.addMarker(c.latLng, map)
                    }
                    }
                >
                    <Marker position={this.state.userLocation} icon = {"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"} />
                    {this.state.searched && nearbyMarkers}
                </Map>
                </div>
                {
                    this.state.searched && 
                    <div className="resultsDiv">
                        <h5>Reccomended nearby places: </h5>
                    </div>
                }
                { this.state.nearbyRestaurants.length > 0 && <ResultsDetails data={this.state.nearbyRestaurants}/>}
                { this.state.nearbyRestaurants.length > 0 && <ResultList className="resultsListDiv" data={this.state.nearbyRestaurants}/> }
                {
                    this.state.searched && this.state.nearbyRestaurants.length === 0 && <h3>No results. Try another point.</h3>
                }
                <ScrollUpButton />
            </div>
        );
    }
    searchRadius() {
        console.log(this.state);
        this.setState({searched: true});
        const radius = this.state.searchRadius;
        const restList = this.state.data;
        const current = this.state.userLocation;
        const nearbyRes = [];
        for(let i = 0; i < restList.length; i++) {
            let dist = this.distanceBetween(current.lat, current.lng, restList[i].address.location.lat, restList[i].address.location.lng, 'K');
            console.log(dist);
            console.log('distance between user marker and ' + restList[i].name + ': '+ dist);
            restList[i].distanceToUser = dist;
            if (dist <= radius) {
                nearbyRes.push(restList[i]);
            }
        }
        console.log(nearbyRes);
        this.setState({nearbyRestaurants: nearbyRes});
    }
    distanceBetween(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit==="K") { dist = dist * 1.609344 }
            if (unit==="N") { dist = dist * 0.8684 }
            return dist*1000;
        }
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBmX5reXyIC2aYXiVgg7kcoQZN1Be3WxFE'
  })(Location);