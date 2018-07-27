import React, { Component } from 'react'
import { Typography, Grid, Hidden } from '@material-ui/core'
import Texts from '../Data/Texts';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Schedule from './Schedule'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StationsData from '../Data/StationsData';
import FullMap from './FullMap';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background,
    },
});



class Station extends Component {

    state = {
        value: 0,
        isShowAll: false
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const stationID = this.props.match.params.ID;
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Hidden mdDown>
                        <Grid item xs={6}>
                            <div>
                                {
                                    //<Image src={`/Images/${stationID}.jpg`}/>
                                }
                                <FullMap currentTime={this.props.currentTime} />


                            </div>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} lg={6}>
                        <Typography variant='headline' style={{ textAlign: 'right', fontFamily: 'B Titr' }}>
                            {`${Texts.StationTitle} ${StationsData.ListOfStations.find(w => w.StationID.toString() === stationID).StationName}`}
                        </Typography>
                        <br />
                        <div className={classes.root} style={{
                            margin: '0px auto',
                            width: '100%'
                        }}>
                            <Tabs
                                indicatorColor="secondary"
                                textColor="secondary"
                                value={value}
                                centered
                                onChange={this.handleChange}>

                                <Tab style={{ fontFamily: "B Titr", fontSize: "20px", width: '150px', float: 'right' }} label="به سمت ایستگاه احسان" />
                                <Tab style={{ fontFamily: "B Titr", fontSize: "20px" }} label="به سمت ایستگاه شهید دستغیب" />
                            </Tabs>
                            {value === 0 && <Schedule currentTime={this.props.currentTime} stationID={stationID} showAllTimes={this.state.isShowAll} onChangeTimeType={(val) => { this.setState({ isShowAll: val }) }} direction="west" />}
                            {value === 1 && <Schedule currentTime={this.props.currentTime} stationID={stationID} showAllTimes={this.state.isShowAll} onChangeTimeType={(val) => { this.setState({ isShowAll: val }) }} direction="east" />}
                        </div>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

Station.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Station);