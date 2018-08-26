import React from "react"
import { Marker, InfoWindow } from "react-google-maps"
import GoogleMapsWrapper from './GoogleMapsWrapper.js';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

export default class Map extends React.PureComponent {
  state = {
    locations: [
      { title: 'Kaunas Castle', address: 'Pilies gatvė, Kaunas', highlight: false, location: { lat: 54.8989236, lng: 23.8854064 } },
      { title: 'Žalgirio Arena', address: 'Karaliaus Mindaugo prospektas, Kaunas', highlight: false, location: { lat: 54.8904589, lng: 23.9145647 } },
      { title: 'Oak-wood Park', address: 'Radvilėnų plentas, Kaunas', highlight: false, location: { lat: 54.8995381, lng: 23.9457049 } },
      { title: 'KTU Technology Center', address: 'Studentų gatvė, Kaunas', highlight: false, location: { lat: 54.9049311, lng: 23.9566562 } },
      { title: 'Flugplatz Aleksotas', address: 'Veiverių g., Kaunas', highlight: false, location: { lat: 54.8775545, lng: 23.8821133 } }
    ],
    search: '',
    markers: ''
  }
  handleValueChange = (e) => {
    this.setState({ search: e.target.value })
  }

  handleClick = (loc) => {
    const items = this.state.locations.map(m => {
      if (m.title == loc.title) {
        console.log('found');
        m.highlight = !m.highlight;
      }

      return m
    });

    console.log(loc);
    this.setState({
      locations: items
    });
  }
  Toggle = (loc) => {
    const items = this.state.locations.map(m => {
      if (m.title == loc.title) {
        m.isOpen = !m.isOpen;
      }
      return m
    });

    this.setState({
      locations: items
    });
  }
  render() {
    var goldStar = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: 0.2,
      strokeColor: 'gold',
      strokeWeight: 1
    };
    if (this.state.search) {
      this.state.markers = this.state.locations.filter(m => m.title.toLowerCase().includes(this.state.search.toLowerCase())).map(l => {
        return l;
      });
    } else {
      this.state.markers = this.state.locations;
    }
    const that = this;
    return (
      <div className="container">
        <div className="sidebar">
          <div className="text-input">
            <input role="search" type='text' onChange={this.handleValueChange} />
            {
              <ul className="locations-list">{
                this.state.markers.map(function (m, i) {
                  return (<li key={i}><a href='javascript:void(0)' onClick={that.handleClick.bind(that, m)}>{m.title}</a></li>)
                })
              }
              </ul>
            }
          </div>
        </div>
        <div className="map">
          <GoogleMapsWrapper
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDfEhgi4c_HGJNjrKa4EMisx-l71acyiWY"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100vh` }} />}
            defaultZoom={13}
            defaultCenter={{ lat: 54.8904589, lng: 23.9145647 }}>
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              gridSize={60}>
              {this.state.markers.map(function (loc, i) {
                return (
                  <Marker icon={loc.highlight ? goldStar : undefined}
                    key={i}
                    position={{ lat: loc.location.lat, lng: loc.location.lng }}
                    onClick={that.Toggle.bind(that, loc)}>
                    {loc.isOpen &&
                      <InfoWindow onCloseClick={that.Toggle.bind(that, loc)}>
                        <h4>{loc.title}</h4>
                      </InfoWindow>
                    }
                  </Marker>)
              })}
            </MarkerClusterer>
          </GoogleMapsWrapper>
        </div>
      </div>
    )
  }
}