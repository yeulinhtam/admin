import { Button, Grid, Paper, Switch, TextField, Typography } from '@material-ui/core';
import cyan from '@material-ui/core/colors/cyan';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createCategoryRequest, createCategorySuccess, createCategoryError } from './../../actions/category';
import categoryApi from './../../api/categoryApi.js';
import { useHistory } from 'react-router-dom';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan[700],
        },
        secondary: {
            main: '#f44336',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh'
    },
    paperRoot: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        borderRadius: 15
    },
    btnRoot: {
        padding: 10,
        borderRadius: 10,
        width: "100%"
    }
}));

const schema = yup.object().shape({
    name: yup.string().required('Category name is a required field'),
    publish: yup.boolean().required(),
});

function CreateCategory(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { loading } = useSelector(state => state.categories);

    const formik = useFormik({
        initialValues: {
            name: '',
            publish: true,
        },
        validationSchema: schema,
        onSubmit: (values, { setSubmitting, setFieldError }) => {
            const { name, publish } = values;
            dispatch(createCategoryRequest());
            categoryApi.create({ name, publish }).then(res => {
                dispatch(createCategorySuccess(res.data));
                history.push('/category');
            }).catch(err => {
                const { errors } = err?.response?.data;
                dispatch(createCategoryError(err))
                errors.forEach(error => {
                    let field = Object.keys(error)[0];
                    let value = Object.values(error)[0];
                    setFieldError(field, value)
                });

            })
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Grid container className={classes.root}>
                <form style={{ display: 'contents' }} onSubmit={formik.handleSubmit}>
                    <Grid item lg={7}>
                        <Paper className={classes.paperRoot}>
                            <Grid className="app" container spacing={3} direction="column">
                                <Grid item lg={12}>
                                    <TextField
                                        label="Category name"
                                        variant="outlined"
                                        name="name"
                                        value={formik.values.name}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth />
                                </Grid>
                                <Grid item lg={12} container justify="space-between" alignItems="center">
                                    <div>
                                        <Typography>Publish</Typography>
                                    </div>
                                    <div>
                                        <Switch
                                            checked={formik.values.publish}
                                            onChange={(event) => {
                                                formik.setFieldValue("publish", event.target.checked);
                                            }}
                                            color="primary"
                                            name="publish"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item lg={12} container justify="space-between">
                                    <Grid item lg={5}>
                                        <Button
                                            startIcon={
                                                loading ?  <CircularProgress color="secondary" size={20}/> : null
                                            }
                                            className={classes.btnRoot}
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            color="primary">
                                            Create Category
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </form>
            </Grid>
        </ThemeProvider>
    );
}

export default CreateCategory;