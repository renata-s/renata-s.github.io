import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import Map from './Map.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Map/>
      </div>
    );
  }
}
export default App;
























/*import React, {PropTypes} from "react"
 
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
 
import iconMarker from "./assets/iconMarker.svg"
import iconMarkerHover from "./assets/iconMarkerHover.svg"
 
import styles from "./styles.css"
 
const MY_API_KEY = "AIzaSyDfEhgi4c_HGJNjrKa4EMisx-l71acyiWY" // fake
 
const Map = ({googleMaps}) => (
  // GoogleMap component has a 100% height style.
  // You have to set the DOM parent height.
  // So you can perfectly handle responsive with differents heights.
  <div className={styles.map}>
    <GoogleMap
      googleMaps={googleMaps}
      // You can add and remove coordinates on the fly.
      // The map will rerender new markers and remove the old ones.
      coordinates={[
        {
          title: "Toulouse",
          position: {
            lat: 43.604363,
            lng: 1.443363,
          },
          onLoaded: (googleMaps, map, marker) => {
            // Set Marker animation
            marker.setAnimation(googleMaps.Animation.BOUNCE)
 
            // Define Marker InfoWindow
            const infoWindow = new googleMaps.InfoWindow({
              content: `
                <div>
                  <h3>Toulouse<h3>
                  <div>
                    Toulouse is the capital city of the southwestern
                    French department of Haute-Garonne,
                    as well as of the Occitanie region.
                  </div>
                </div>
              `,
            })
 
            // Open InfoWindow when Marker will be clicked
            googleMaps.event.addListener(marker, "click", () => {
              infoWindow.open(map, marker)
            })
 
            // Change icon when Marker will be hovered
            googleMaps.event.addListener(marker, "mouseover", () => {
              marker.setIcon(iconMarkerHover)
            })
 
            googleMaps.event.addListener(marker, "mouseout", () => {
              marker.setIcon(iconMarker)
            })
 
            // Open InfoWindow directly
            infoWindow.open(map, marker)
          },
        }
      ]}
      center={{lat: 43.604363, lng: 1.443363}}
      zoom={8}
      onLoaded={(googleMaps, map) => {
        map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
      }}
    />
  </div>
)
 
Map.propTypes = {
  googleMaps: PropTypes.object.isRequired,
}
 
export default GoogleMapLoader(Map, {
  libraries: ["places"],
  key: MY_API_KEY,
})






//import React, { Component } from "react";
//import styles from './styles.css';
//import scriptLoader from 'react-async-script-loader';



//https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require/41710341
/*@scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyDfEhgi4c_HGJNjrKa4EMisx-l71acyiWY'])
export default class Maps extends React.Component {
  constructor(props){
    super(props);
    this.map = null;    
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 20
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            this.map.setCenter(pos);

            const marker = new google.maps.Marker({
              position: pos,
              map: this.map,
              title: 'Hello World!'
            });                
          }, () => {
            console.log('navigator disabled');
          });
        } else {
          // Browser doesn't support Geolocation
          console.log('navigator disabled');
        }
      }
      else this.props.onError()
    }
  }

  render(){
    return (    
    <div>
      <div ref="map" style={{height: '80%', width: '100%'}}></div>
      { !this.map && <div className="center-md">Loading...</div> } 
    </div>
    )
  }
}

/*import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
class Map extends Component{
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps({isScriptLoadSucceed}){
        if (isScriptLoadSucceed) {
            var markers = [];

            var map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: {lat: 37.7749300, lng: -122.4194200}
            });
        }
        else{
            alert("script not loaded")
        }
    }

    render(){
        return(
            <div>
                <div id="map" style={{height: "600px"}}></div>
            </div>
        )
    }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key= APIKEY"]
)(Map)
*/