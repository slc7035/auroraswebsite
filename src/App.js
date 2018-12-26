import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Map from "./Map";

// Icons
import { FacebookBox, Instagram } from "mdi-material-ui";

// Images
import SplashImage from "./images/family_adjusted.jpg";
import ProductShelfImage from "./images/products_shelf.jpg";
// import MilkshakeImage from './images/products_shelf_milkshake.jpg'
import MilkshakeImage from "./images/milkshake.jpg";
import RibbonCuttingImage from "./images/ribbon_cutting.jpg";
import NailpolishImage from "./images/nailpolishes.jpg";

import "./App.css";

const typographyTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ["Cinzel", "sans-serif"].join(",")
  },
  overrides: {
    MuiGridListTile: {
      root: {
        padding: "0px !important"
      }
    }
  }
});

const styles = theme => ({
  app: {
    background: "#fff"
  },
  section: {
    "padding-top": theme.spacing.unit * 12,
    "padding-bottom": theme.spacing.unit * 12
  },
  sectionTitle: {
    "align-self": "middle",
    "padding-bottom": theme.spacing.unit * 12
  },
  appBar: {
    background: "transparent",
    "padding-top": theme.spacing.unit,
    "box-shadow": "none"
  },
  header: {
    display: "flex",
    color: "#fff"
  },
  headerSectionBtnOverride: {
    color: theme.palette.common.white,
    "&:hover": {
      "background-color": "transparent",
      color: theme.palette.text.disabled
    }
  },
  headerTitle: {
    color: theme.palette.common.white
  },
  socialMediaButtons: {
    float: "right",
    "&:hover": {
      "background-color": "transparent"
    }
  },
  socialMediaIcons: {
    color: "#fff",
    "&:hover": {
      color: theme.palette.text.disabled
    }
  },
  splashImage: {
    width: "100%"
  },
  imageContainer: {
    position: "relative",
    "text-align": "center",
    "padding-bottom": "0px !important"
  },
  imageGrid: {
    width: "100%",
    height: "450px",
    "overflow-y": "hidden"
  },
  imageText: {
    color: theme.palette.common.white,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  service: {
    color: theme.palette.common.black
  },
  serviceCard: {
    width: theme.spacing.unit * 35
  },
  serviceCardDescription: {
    "padding-top": theme.spacing.unit
  },
  mapContainer: {
    width: "60%",
    height: "500px",
    margin: "auto"
  }
});

function ServiceCard({ classes, icon, name, description }) {
  return (
    <Card className={classes.serviceCard}>
      <CardContent>
        <Grid container justify="space-between" direction="column">
          {icon}
          <Typography variant="h5">{name}</Typography>
          <Typography
            component="p"
            color="textSecondary"
            className={classes.serviceCardDescription}
          >
            {description}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}

ServiceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

class App extends Component {
  state = {
    servicesTabValue: 0
  };

  componentDidMount() {
    // TODO: Check if we need to navigate the user to the right position on the page
  }

  handleServicesChange = (e, servicesTabValue) => {
    this.setState({ servicesTabValue });
  };

  handleServicesChangeIndex = index => {
    this.setState({ servicesTabValue: index });
  };

  render() {
    const { classes } = this.props;

    const services = [
      {
        icon: <Icon />,
        name: "Haircuts & Styling",
        description:
          "Men, women, and children haircuts, shampoo, shaving and hair treatments"
      },
      {
        icon: <Icon />,
        name: "Color & Chemicals",
        description: "Coloring, highlights, lowlights, straightening, and perms"
      },
      {
        icon: <Icon />,
        name: "Waxes",
        description: "You need it waxed, we wax it"
      },
      {
        icon: <Icon />,
        name: "Spa and other",
        description:
          "Manicures, pedicures, ear piercing, eyelashes, make up and glitter tattoos"
      }
    ];

    return (
      <MuiThemeProvider theme={typographyTheme}>
        <div className={classes.app}>
          <Grid container spacing={0}>
            <Grid container item>
              <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.header}>
                  <Grid container item>
                    <Grid item xs>
                      <Button
                        href="#services"
                        variant="text"
                        size="large"
                        disableRipple={true}
                        className={classes.headerSectionBtnOverride}
                      >
                        Services
                      </Button>
                      <Button
                        href="#contact"
                        variant="text"
                        size="large"
                        disableRipple={true}
                        className={classes.headerSectionBtnOverride}
                      >
                        Contact
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h3"
                        align="center"
                        className={classes.headerTitle}
                      >
                        Aurora's Barber and Beauty Shop
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <IconButton
                        href="https://www.facebook.com/awing67"
                        className={classes.socialMediaButtons}
                        aria-label="Facebook page"
                      >
                        <FacebookBox className={classes.socialMediaIcons} />
                      </IconButton>
                      <IconButton
                        href="#"
                        className={classes.socialMediaButtons}
                        aria-label="Instagram page"
                      >
                        <Instagram className={classes.socialMediaIcons} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item className={classes.imageContainer}>
              <img
                className={classes.splashImage}
                src={SplashImage}
                alt="Family"
              />
              <Typography variant="h4" className={classes.imageText}>
                A family haircare salon
              </Typography>
            </Grid>
            <Grid container item className={classes.imageContainer}>
              <GridList cellHeight={450} cols={3} className={classes.imageGrid}>
                <GridListTile key="products-image-tile" col={1}>
                  <img src={ProductShelfImage} alt="Hair products" />
                </GridListTile>
                <GridListTile key="milkshake-image-tile" col={1}>
                  <img src={MilkshakeImage} alt="Milkshake products" />
                </GridListTile>
                <GridListTile key="nailpolish-image-tile" col={1}>
                  <img src={NailpolishImage} alt="Nailpolishes" />
                </GridListTile>
              </GridList>
            </Grid>
            <Grid
              id="services"
              container
              item
              spacing={24}
              justify="center"
              className={classes.section}
            >
              <Typography variant="h3" className={classes.sectionTitle}>
                Services
              </Typography>
              <Grid container item justify="space-around">
                <Grid container item xs={6} justify="space-around">
                  <ServiceCard
                    classes={classes}
                    name={services[0].name}
                    description={services[0].description}
                    icon={services[0].icon}
                  />
                  <ServiceCard
                    classes={classes}
                    name={services[1].name}
                    description={services[1].description}
                    icon={services[1].icon}
                  />
                </Grid>
                <Grid container item xs={6} justify="space-around">
                  <ServiceCard
                    classes={classes}
                    name={services[2].name}
                    description={services[2].description}
                    icon={services[2].icon}
                  />
                  <ServiceCard
                    classes={classes}
                    name={services[3].name}
                    description={services[3].description}
                    icon={services[3].icon}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              id="about"
              container
              item
              spacing={24}
              justify="center"
              className={classes.section}
            >
              <Typography variant="h3" className={classes.sectionTitle}>
                About
              </Typography>
              <Grid item xs={12}>
                <Map
                  lat={42.9739765}
                  lng={-77.378867}
                  zoom={15}
                  style={styles(typographyTheme).mapContainer}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
