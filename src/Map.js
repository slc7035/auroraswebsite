import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Icons
import { Navigation } from "mdi-material-ui";

const styles = theme => ({
  infoWindowNavigationBtn: {
    "margin-top": theme.spacing.unit
  }
});
export class MapContainer extends Component {
  state = {
    showInfoWindow: false,
    activeMarker: null
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({ showInfoWindow: true, activeMarker: marker });
  };

  closeInfoWindow = props => {
    if (this.state.showInfoWindow) {
      this.setState({
        showInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMapClicked = props => {
    if (this.state.showInfoWindow) {
      this.setState({
        showInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { google, lat, lng, zoom, style, classes } = this.props;
    const { showInfoWindow, activeMarker } = this.state;
    return (
      <Map
        google={google}
        style={style}
        initialCenter={{
          lat,
          lng
        }}
        center={{ lat, lng }}
        zoom={zoom}
        onClick={this.onMapClick}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />
        <InfoWindow
          marker={activeMarker}
          onClose={this.closeInfoWindow}
          visible={showInfoWindow}
        >
          <div>
            <Typography variant="body1">
              150 Phoenix Mills Plaza
              <br />
              Victor, New York 14564
            </Typography>
            <Button
              size="small"
              target="_blank"
              href="https://www.google.com/maps/place/Auroras+Barber+and+Beauty+Shop/@42.9739765,-77.378867,17z/data=!3m1!4b1!4m5!3m4!1s0x89d12fd50b94d911:0x23e4773aa218c331!8m2!3d42.9739726!4d-77.3766783"
              className={classes.infoWindowNavigationBtn}
            >
              <Navigation />
              Get Directions
            </Button>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

MapContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCN_kz5kr9uW4yAL579SLznOu8LUhxltaY"
})(withStyles(styles)(MapContainer));
