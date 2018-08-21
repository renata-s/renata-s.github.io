import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps"

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
    defaultZoom={8}
    defaultCenter={{ lat: 54.896870, lng: 23.892429 }}
  >
      <Marker position={{ lat: 54.896870, lng: 23.892429 }} onClick={props.onMarkerClick}>
      {props.isOpen && 
      <InfoWindow onCloseClick={props.onInfoClose}>
        <h4>Kaunas</h4>
    </InfoWindow>
      }
      </Marker>
  </GoogleMap>
)

export default class Map extends React.PureComponent {
  state = {
    isOpen: false
  }

  Toggle = () => {
    this.setState({isOpen :!this.state.isOpen  })
  }
  render() {
    return (
      <MyMapComponent
        isOpen={this.state.isOpen}
        onMarkerClick={this.Toggle}
        onInfoClose ={this.Toggle}
      />
    )
  }
}