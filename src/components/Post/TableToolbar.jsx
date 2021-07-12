import { Button, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { useState } from 'react';

const TableToolbarStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 25,
        marginRight: theme.spacing(2)
    },
    icon: {
        marginRight: theme.spacing(1)
    }
})
);


const TableToolbar = (props) => {
    const classes = TableToolbarStyles();

    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(!open)
    }

    return (<React.Fragment>
        <Toolbar className={classes.root}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Tasks List
            </Typography>
            <div>
                <Button startIcon={<FilterListIcon />} color="default" variant="contained" className={classes.icon}>
                    ADD FILTER
                </Button>
                <Button
                    onClick={handleOpen}
                    startIcon={<AddIcon />}
                    color="primary"
                    variant="contained"
                    className={classes.icon}>
                    Create
                </Button>
                <Button startIcon={<GetAppIcon />} color="secondary" variant="contained" className={classes.icon}>
                    Export
                </Button>
            </div>
        </Toolbar>
    </React.Fragment>
    )
}

export default TableToolbar;