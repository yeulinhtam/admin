import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Menu from './components/Menu';
import PrimarySearchAppBar from './components/Header';
import Breadcumb from './components/Breadcumb';
import HomeContainer from "./containers/Homecontainer";
import PostContainer from './containers/PostContainer';
import PostCreateContainer from './containers/PostCreateContainer';
import CategoryContainer from './containers/CategoryContainer';
import CategoryCreateContainer from './containers/CategoryCreateContainer';
import MoneyContainer from './containers/MoneyContainer';



import CalendarContainer from './containers/CalendarContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: fade('#e3e4e9', 0.55),
  }
}));

function App() {

  const classes = useStyles();

  const [token, setToken] = useState('');





  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact component={LoginContainer} />
          <Route path="/register" exact component={RegisterContainer} />
          <Route path={["/", "/post", "/post/create", "/category", "/category/create"]}>
            <Grid container className={classes.container}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid item lg={2}>
                  <Menu />
                </Grid>
                <Grid item lg={10}>
                  <Grid container direction="column"
                    justify="flex-start"
                    alignItems="stretch">
                    <Grid item lg={12}>
                      <PrimarySearchAppBar />
                    </Grid>
                    <Grid item lg={12} container style={{ background: 'white', marginTop: 10 }}>
                      <Grid item lg={12}>
                        <Breadcumb />
                      </Grid>
                      <Switch>
                        <Grid item lg={12}>
                          <Route path="/" exact component={HomeContainer} />
                          <Route path="/post/" exact component={PostContainer} />
                          <Route path="/post/create" exact component={PostCreateContainer} />
                          <Route path="/category" exact component={CategoryContainer} />
                          <Route path="/category/create" exact component={CategoryCreateContainer} />
                          <Route path="/money" exact component={MoneyContainer} />
                        </Grid>
                      </Switch>
                    </Grid>
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
