import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import ToEhsanMap from './ToEhsanMap';
import ToDastgheibMap from './ToDastgheibMap';

class FullMap extends Component {

    render() {        
        return (

            <Grid container>
                <Grid item md={3} />
                <Grid item md={3} xs={6}>
                    <ToEhsanMap currentTime={this.props.currentTime} />
                </Grid>

                <Grid item xs={6} md={3}>
                    <ToDastgheibMap currentTime={this.props.currentTime} />
                </Grid>
                <Grid item md={3} />
            </Grid>



        );
    }
}

export default (FullMap);