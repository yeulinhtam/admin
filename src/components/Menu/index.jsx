import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import PaymentIcon from '@material-ui/icons/Payment';
import GroupIcon from '@material-ui/icons/Group';
import FolderIcon from '@material-ui/icons/Folder';
import BookIcon from '@material-ui/icons/Book';
import { Link } from 'react-router-dom';
import React from 'react';



const useStyles = makeStyles((theme) => ({
    menuContainer: {
        minHeight: '100vh',
        height: '100%',
        backgroundColor: '#3F4D67'
    },
    textHome: {
        fontSize: 22,
        color: 'white'
    },
    menuItem: {
        padding: theme.spacing(1, 2, 1, 2),
        borderLeft: '3px solid transparent',
        '&:hover': {
            backgroundColor: '#333F54',
            marginLeft: 0,
            paddingRight: 13,
            borderLeftColor: '#1DC6E4'
        }
    },
    textMenu: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'cursive'
    },
    iconMenu: {
        color: 'white'
    }
}));



function Menu(props) {

    const classes = useStyles();

    return (
        <Grid container
            justify="center"
            alignItems="stretch"
            className={classes.menuContainer}>
            <Grid item lg={12}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <HomeIcon fontSize="large" className={classes.iconMenu} />
                        </ListItemIcon>
                        <ListItemText primary="HOME" className={classes.textHome} />
                    </ListItem>
                    <Divider />
                    <ListItem button className={classes.menuItem}>
                        <ListItemIcon className={classes.iconMenu}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" className={classes.textMenu} />
                    </ListItem>
                    <ListItem button className={classes.menuItem}>
                        <ListItemIcon className={classes.iconMenu}>
                            <PaymentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Money" className={classes.textMenu} />
                    </ListItem>
                    <ListItem button className={classes.menuItem}>
                        <ListItemIcon className={classes.iconMenu}>
                            <AssignmentTurnedInIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tasks" className={classes.textMenu} />
                    </ListItem>
                    <ListItem button className={classes.menuItem}>
                        <ListItemIcon className={classes.iconMenu}>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" className={classes.textMenu} />
                    </ListItem>
                    <ListItem button className={classes.menuItem} component={Link} to="/post">
                        <ListItemIcon className={classes.iconMenu}>
                            <BookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Post" className={classes.textMenu} />
                    </ListItem>
                    <ListItem button className={classes.menuItem} component={Link} to="/category">
                        <ListItemIcon className={classes.iconMenu}>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Category" className={classes.textMenu} />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}

export default Menu;