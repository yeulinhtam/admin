import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Breadcumb(props) {

    const classes = useStyles();
    const location = useLocation();

    const [breadcumbs, setBreadCumbs] = useState([]);


    useEffect(() => {
        const getBreadcumbs = () => {
            let pathname = location.pathname;
            pathname = pathname.slice(1, pathname.length);
            let links = pathname.split("/");

            let outputs = [
                {
                    parent: true,
                    name: 'Home',
                    href: "/"
                }
            ];
            links.forEach((item, index) => {
                let link = {
                    parent: index !== links.length - 1 ? true : false,
                    name: capitalizeFirstLetter(item),
                    href: "/" + links.slice(0, index + 1).join("/")
                };
                outputs.push(link)
            })
            setBreadCumbs(outputs);
        }
        getBreadcumbs();

    }, [location])

    return (
        <Grid container className={classes.root}>
            <Grid item lg={12}>
                <Typography variant="h4">Post List</Typography>
            </Grid>
            <Grid item lg={12} className={classes.breadCumbRoot}>
                <Breadcrumbs aria-label="breadcrumb">
                    {breadcumbs && breadcumbs.map((link, index) => {
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