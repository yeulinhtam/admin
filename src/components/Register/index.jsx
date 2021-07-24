import { Typography } from '@material-ui/core';
import { Grid, Paper, Button, TextField, IconButton, FormControl, FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles, withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Divider from '@material-ui/core/Divider';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Link } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';
// import userApi from '../../api/userApi';
// import { signUpError, signUpRequest, signUpSuccess } from './../../actions/user';
import { useDispatch } from 'react-redux';

Register.propTypes = {

};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "rgb(0,171,85)",
        },
        secondary: {
            main: '#f44336',
        },
    },
});

const SocialButton = withStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '12px 16px',
        width: 145,
        borderRadius: 8,
        lineHeight: 1.5,
        border: '1px solid rgba(145, 158, 171, 0.32)',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#f7f7f7',
            border: '1px solid rgba(145, 158, 171, 0.32)',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#f7f7f7',
            border: '1px solid rgba(145, 158, 171, 0.32)',
        },
        [theme.breakpoints.down('sm')]: {
            width: "30%",
        },
    },
    startIcon: {
        display: 'flex',
        justifyContent: "center",
        margin: 0
    }
}))(Button);



const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2, 0, 5, 0),
        display: 'flex',
        justifyContent: "center"
    },
    root: {
        padding: theme.spacing(1)
    },
    paperRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(1),
        height: "90vh",
        color: "black",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: 16,
        maxWidth: 464,
        boxShadow: "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    title: {
        margin: "80px 0px 40px",
        fontFamily: "Public Sans, sans-serif",
        fontWeight: 700
    },
    form: {
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        },
    },
    titleLogin: {
        fontFamily: "Public Sans, sans-serif",
        fontWeight: 600
    },
    subTitleLogin: {
        color: "gray"
    },
    txtRemember: {
        fontFamily: "Public Sans, sans-serif",
        fontWeight: 400,
        fontSize: "0.875rem",
        lineHeight: 1.57143
    },
    txtForgot: {

    },
    btnLogin: {
        padding: 10,
        borderRadius: 10,
        width: "100%"
    }
}));

const registerValidation = yup.object({
    firstName: yup.string("Enter you first name")
        .required("First name is required"),
    lastName: yup.string("Enter you last name")
        .required("Last name is required"),
    email: yup.string('Enter you email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup.string('Password')
        .required('Password is required')
        .min(8, "Password must be at least 8 characters "),
})



function Register(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [hide, setHide] = useState(true);


    const togglePassword = () => {
        setHide(!hide)
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: registerValidation,
        onSubmit: (values, { setSubmitting, setFieldError }) => {
            const { firstName, lastName, email, password } = values;
            // dispatch(signUpRequest());
            // userApi.signUp({ email, password, firstName, lastName }).then(res => {
            //     dispatch(signUpSuccess(res.data));
            //     history.push('/')
            // }).catch(err => {
            //     const { errors } = err?.response?.data;
            //     errors.forEach(error => {
            //         let field = Object.keys(error)[0];
            //         let value = Object.values(error)[0];
            //         setFieldError(field, value)
            //         dispatch(signUpSuccess(err));   
            //     });
            // });
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Grid container className={classes.root}>
                <Grid item lg={4}>
                    <Paper className={classes.paperRoot}>
                        <Typography variant="h4" className={classes.title}>Hi, Welcome Back</Typography>
                        <img src="https://minimals.cc/static/illustrations/illustration_login.png" alt="home" width={550} height='auto'/>
                    </Paper>
                </Grid>
                <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                    <Grid item lg={8} container justify="center" alignContent="center" className={classes.form}>
                        <Grid item lg={6} container spacing={3}>
                            <Grid item lg={12} xs={12} sm={6}>
                                <Typography variant="h5" className={classes.titleLogin}>Get started absolutely free.</Typography>
                            </Grid>
                            <Grid item variant="body1">
                                <Typography className={classes.subTitleLogin}>Free forever. No credit card needed.</Typography>
                            </Grid>
                            <Grid item lg={12} container alignItems="center" direction="row">
                                <Grid item lg={5}>
                                    <Divider />
                                </Grid>
                                <Grid item lg={2} container justify="center">
                                    <p>OR</p>
                                </Grid>
                                <Grid item lg={5}>
                                    <Divider />
                                </Grid>
                            </Grid>
                            <Grid item lg={12} container justify="space-between">
                                <SocialButton variant="outlined"
                                    startIcon={<FacebookIcon size="large" style={{ color: "blue" }} />}>
                                </SocialButton>
                                <SocialButton variant="outlined"
                                    startIcon={<TwitterIcon size="large" style={{ color: "#1C9CEA" }} />}>
                                </SocialButton>
                                <SocialButton variant="outlined"
                                    startIcon={<InstagramIcon size="large" style={{ color: "#EF4A5A" }} />}>
                                </SocialButton>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    name="firstName"
                                    value={formik.values.firstName}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Email address"
                                    variant="outlined"
                                    name="email"
                                    value={formik.values.email}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel
                                        style={{ color: formik.touched.password && Boolean(formik.errors.password) ? "red" : "green" }}>
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        label="Password"
                                        variant="outlined"
                                        type={hide ? "password" : "text"}
                                        name="password"
                                        value={formik.values.password}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePassword}
                                                    aria-label="toggle password visibility"
                                                >
                                                    {hide ? <VisibilityOffIcon /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        fullWidth />
                                    <FormHelperText style={{ color: "red" }}>
                                        {formik.touched.password && formik.errors.password}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item container alignItems="center">
                                <FormControlLabel
                                    className={classes.txtRemember}
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="I Agree to  Privacy Policy"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    className={classes.btnLogin}>
                                    Register
                                </Button>
                            </Grid>
                            <Grid item container justify="center" alignItems="center">
                                <Typography>Already have an account?
                                    <Link underline="none" to="/login" color="secondary" component={RouterLink}> Login</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </ThemeProvider>
    );
}

export default Register;
