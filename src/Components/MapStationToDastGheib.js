import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import MyTheme from './MyTheme';
import { CompareTime, CalcNextTrainTime } from '../Data/Functions'
import { Link } from 'react-router-dom'
import { Tooltip, Zoom, Typography } from '@material-ui/core';
import Data from '../Data/StationsData'

const styles = theme => ({
    root: {
        height: 50,
    },
});

function isTrainInStopState(currentTime, rowTime, dif, min) {
    let difSec = CompareTime(currentTime, rowTime);
    return (difSec <= dif && difSec > min);
}

function isContainTrainNow(station, currentTime, direction) {
    return station.ToDastgheib.filter(w => isTrainInStopState(currentTime, w + ':00', 30, 0)).length > 0
}

function isStationNextRoadContaionTrain(station, currentTime) {
    let toNext = station.NextStationToDastgheib
    let time = station.ToDastgheib.find(w => isTrainInStopState(currentTime, w + ':00', toNext, 30))
    if (time === undefined) return 0
    else
        return CompareTime(currentTime, time + ':00');
}

function MapStationToDastGheib(props) {
    const { classes, station, currentTime, direction } = props;

    const StationSchedule = Data.ListOfStations.find(w => w.StationID === station.StationID);

    return (
        <div>
            {station.StationID !== '1' ?
                <div className={classes.root} >

                    <Slider
                        trackStyle={{ backgroundColor: MyTheme.palette.secondary.main }}
                        handleStyle={{ visibility: 'hidden' }}
                        railStyle={{ backgroundColor: MyTheme.palette.grey["300"] }}
                        max={station.NextStationToDastgheib}
                        value={
                            isStationNextRoadContaionTrain(station, currentTime)
                        }
                        vertical={true}
                        style={{ marginLeft: '13px' }} />

                </div>
                :
                <Fragment />
            }
            <Link to={`/station/${station.StationID}`} style={{ textDecoration: 'none', fontFamily: 'B Nazanin', fontSize: 12, color: '#555555' }}>
                {
                    isContainTrainNow(station, currentTime, direction) ?
                        <div style={{ marginTop: '5px' }}>
                            <Tooltip TransitionComponent={Zoom} title={
                                <div style={{ direction: 'rtl' }}>
                                    <Typography style={{ fontFamily: 'B Nazanin', color: '#FFFFFF' }} variant='subheading'>{`ایستگاه ${station.StationName}`}</Typography>
                                    <Typography style={{ fontFamily: 'B Nazanin', color: '#FFFFFF' }} variant='caption'>{`قطار بعدی: ${CalcNextTrainTime(StationSchedule, 'east', currentTime)}`}</Typography>
                                </div>
                            }
                            >
                                <CircularProgress color="secondary" />
                            </Tooltip>
                            {station.StationName}
                        </div>
                        :
                        <div style={{ marginTop: '5px' }}>
                            <Tooltip style={{ fontFamily: 'B Titr', fontSize: 14 }} TransitionComponent={Zoom} title=
                                {
                                    <div style={{ direction: 'rtl' }}>
                                        <Typography style={{ fontFamily: 'B Nazanin', color: '#FFFFFF' }} variant='subheading'>{`ایستگاه ${station.StationName}`}</Typography>
                                        <Typography style={{ fontFamily: 'B Nazanin', color: '#FFFFFF' }} variant='caption'>{`قطار بعدی: ${CalcNextTrainTime(StationSchedule, 'east', currentTime)}`}</Typography>
                                    </div>
                                }>
                                <CircularProgress variant="static" value={100} />
                            </Tooltip>
                            {station.StationName}
                        </div>
                }
            </Link>
        </div>

    );
}

MapStationToDastGheib.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapStationToDastGheib);