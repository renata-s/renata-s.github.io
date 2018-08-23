import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps"


class CustomMarker extends React.PureComponent {
  state = {
   isOpen: false
  }

  Toggle = () => {
    this.setState({isOpen :!this.state.isOpen})
  }
  componentWillMount(){
    this.setState({isOpen: this.props.isOpen});
  }
  render() {
    
    return (
    <Marker key={this.props.i} position={{ lat: this.props.loc.location.lat, lng: this.props.loc.location.lng }} onClick={this.Toggle}>
      { this.state.isOpen &&
      <InfoWindow onCloseClick={this.Toggle}>
          <h4>{this.props.loc.title}</h4>
        </InfoWindow>
      }
    </Marker>
    )
   }
  }


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDfEhgi4c_HGJNjrKa4EMisx-l71acyiWY",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 54.8989236, lng: 23.8854064 }}
  >
  {
     props.locations.map(function(loc, i){
      return (<CustomMarker key={i} loc= {loc} i={i}></CustomMarker>)
    })
  }
  </GoogleMap>
)

export default class Map extends React.PureComponent {
  state = {
    locations : [
      {title: 'Kaunas Castle', address: 'Pilies gatvė, Kaunas',  isOpen: false, location: {lat: 54.8989236, lng: 23.8854064}},
      {title: 'Žalgirio Arena', address: 'Karaliaus Mindaugo prospektas, Kaunas',  isOpen:false, location: {lat: 54.8904589, lng: 23.9145647}},
      {title: 'Oak-wood Park', address: 'Radvilėnų plentas, Kaunas', isOpen: false, location: {lat: 54.8995381, lng: 23.9457049}},
      {title: 'KTU E-learning Technology Center', address: 'Studentų gatvė, Kaunas', isOpen: false, location: {lat: 54.9049311, lng: 23.9566562}},
      {title: 'Flugplatz Aleksotas', address: 'Veiverių g., Kaunas', isOpen: false, location: {lat: 54.8775545, lng: 23.8821133}}
    ]
  }

  Toggle = () => {
    this.setState({isOpen :!this.state.isOpen  })
  }
  render() {
    return (
      <MyMapComponent locations={this.state.locations} />
    )
  }
}