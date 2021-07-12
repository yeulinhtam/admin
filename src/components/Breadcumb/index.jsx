import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

Breadcumb.propTypes = {
    links: PropTypes.array.isRequired
};


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2, 1, 2),
    },
    breadCumbRoot: {
        marginTop: theme.spacing(1)
    }
})
);

function Breadcumb(props) {

    const { links } = props;
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item lg={12}>
                <Typography variant="h4">Post List</Typography>
            </Grid>
            <Grid item lg={12} className={classes.breadCumbRoot}>
                <Breadcrumbs aria-label="breadcrumb">
                    {links && links.map((link, index) => {
                        if (link.parent) {
                            return <Link href={link.href} key={index}>
                                <Typography variant="body2">{link.name}</Typography>
                            </Link>
                        }
                        return <Typography color="textPrimary" key={index} variant="body2">{link.name}</Typography>
                    })}
                </Breadcrumbs>
            </Grid>
        </Grid>
    );
}

export default Breadcumb;