import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import StationsData from '../Data/StationsData';
import MapStationToEhsan from './MapStationToEhsan';

const styles = {
    root: {
        display: 'flex',
        height: 300,
    },
};

class ToEhsanMap extends Component {

    render() {
        return (


            <div>
                {StationsData.ListOfStations.map(w =>
                    <div key={w.StationID}>
                        <MapStationToEhsan station={w} direction='' currentTime={this.props.currentTime} />                        
                    </div>
                )}
            </div>


        );
    }
}

export default withStyles(styles)(ToEhsanMap);