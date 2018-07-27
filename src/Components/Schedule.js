import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Data from '../Data/StationsData'
import { Typography, Switch, FormControlLabel } from '../../node_modules/@material-ui/core';
import { deepPurple } from '@material-ui/core/colors/';
import Texts from '../Data/Texts';
import {CompareTime, CalcNextTrainTime} from '../Data/Functions'

const CustomTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    colorSwitchBase: {
        '&$colorChecked': {
            color: deepPurple.A700,
            '& + $colorBar': {
                backgroundColor: deepPurple.A100,
            },
        },
    },
    colorBar: {},
    colorChecked: {},
});


class Schedule extends Component {

    handleChangeCheck = (e) => {
        this.props.onChangeTimeType(e.target.checked)
    }


    

    render() {
        const { classes, stationID, direction } = this.props

        const StationSchedule = Data.ListOfStations.find(w => w.StationID === stationID);

        return (
            <Paper className={classes.root}>

                <Typography variant="title" align="right" style={{ padding: '20px' }}>
                    {`${Texts.NextTrain} : ${CalcNextTrainTime(StationSchedule,direction,this.props.currentTime)}`}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell numeric>
                                <FormControlLabel
                                    style={{ float: 'left' }}
                                    control={
                                        <Switch
                                            checked={this.props.showAllTimes}
                                            onChange={this.handleChangeCheck}
                                            value="checkedA"
                                            classes={{
                                                switchBase: classes.colorSwitchBase,
                                                checked: classes.colorChecked,
                                                bar: classes.colorBar,
                                            }}
                                        />
                                    }
                                />


                                <Typography color="inherit" variant='subheading' style={{ height: '50px', lineHeight: '50px', fontFamily: 'B Titr' }}>
                                    {this.props.showAllTimes ? Texts.ScheduleTimeAll : Texts.ScheduleTimeFutureTime}
                                </Typography>

                            </CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {StationSchedule[direction === 'east' ? 'ToDastgheib' : 'ToEhsan'].filter(w =>
                            this.props.showAllTimes || CompareTime(w + ':00', this.props.currentTime) >= 0
                        ).map(n => {
                            return (
                                <TableRow className={classes.row} key={n}>
                                    <CustomTableCell numeric>{n}</CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

Schedule.propTypes = {
    stationID: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['west', 'east']).isRequired,
    onChangeTimeType: PropTypes.func,
    showAllTimes: PropTypes.bool.isRequired,
    currentTime: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(Schedule);
