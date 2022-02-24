import React, { Component } from 'react';
import { MapContainer, TileLayer, Circle, FeatureGroup, Popup, useMap } from 'react-leaflet'
import './react-leaflet.css';
import 'leaflet/dist/leaflet.css'
import './table-style.css'

class MapView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 38.71, lng: -0.48 },
      zoom: 12,
      urlData: {features: []},
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/locations')
    .then((response) => response.json())
    .then((response) => {
       this.setState({ urlData: response })
    })
  }

  handleClick(latitude,longitude){
    this.setState({currentLocation :{ lat: latitude, lng: longitude}})
  }
  
  render() {

    console.log(this.state)

    function ChangeView({ center, zoom }) {
      const map = useMap()
      map.setView( center, zoom )
      return null
    }

    return (
        <div>
          <table className="styled-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Altitude</th>
                    <th>Description</th>
                    <th>Show</th>
                </tr>
            </thead>
            <tbody>
              {this.state.urlData.features.map((feature, index)=>{
                  return (<tr key={index}><td>{feature.properties.name}</td>
                                          <td>{feature.properties.alt} m</td>
                                          <td>{feature.properties.desc}</td>
                                          <td><button onClick={() => 
                                            this.handleClick(
                                              feature.geometry.coordinates[1],
                                              feature.geometry.coordinates[0])}>GO!</button></td>
                        </tr>)
                })}
            </tbody>
          </table>
          <MapContainer center={this.state.currentLocation} zoom={this.state.zoom}>
            <ChangeView center={this.state.currentLocation} zoom={this.state.zoom}/>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {this.state.urlData.features.map((feature, index) => {
              return (
                <FeatureGroup key={index}>
                  <Popup>
                      <h1> {feature.properties.name}</h1>
                      <p><b>Altitude:</b> {feature.properties.alt} m</p>
                      <p><b>Description:</b> {feature.properties.desc}</p>
                  </Popup>
                  <Circle
                    center={[
                      feature.geometry.coordinates[1],
                      feature.geometry.coordinates[0]
                    ]}
                    fillColor="#808080"
                    radius={feature.properties.alt}
                    color={"#696969"}
                    weight={1}
                    fillOpacity={0.8}
                  />
                </FeatureGroup>
              );
            })}
        </MapContainer>
    </div>
    );
  }
}

export default MapView;