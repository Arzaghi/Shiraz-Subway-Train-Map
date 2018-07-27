import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Stations from '../Data/StationsData'
import { List, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Texts from '../Data/Texts';


export const ListOfStations = (
    <List>
        <Link to={`/Map`} style={{ textDecoration: 'none' }}>
            <ListItem button key={0} style={{ textAlign: 'right' }}>
                <ListItemText>
                    {Texts.MenuMapTitle}
                </ListItemText>
            </ListItem>
        </Link>
        {Stations.ListOfStations.map(w =>
            <Paper key={w.StationID}>
                <Link to={`/station/${w.StationID}`} style={{ textDecoration: 'none' }}>
                    <ListItem button key={w.StationID} style={{ textAlign: 'right' }}>

                        <ListItemText>
                            {w.StationName}
                        </ListItemText>

                    </ListItem>
                </Link>
            </Paper>
        )}
    </List>
);