import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import Menu from './components/Menu';
import PrimarySearchAppBar from './components/Header';
import Breadcumb from './components/Breadcumb';
import HomeContainer from "./containers/Homecontainer";
import PostContainer from './containers/PostContainer';
import PostCreateContainer from './containers/PostCreateContainer';
import CategoryContainer from './containers/CategoryContainer';
import CategoryCreateContainer from './containers/CategoryCreateContainer';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: fade('#e3e4e9', 0.55),
  }
}));

function App() {
  const classes = useStyles();

  const links = [{
    parent: true,
    name: 'Home',
    href: "/google"
  },
  {
    parent: true,
    name: 'Post',
    href: "/google"
  },
  {
    parent: true,
    name: 'Detail',
    href: "/google"
  },
  {
    parent: false,
    name: 'Post',
    href: "/google"
  }];

  return (
    <Grid container className={classes.container}>
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
              <Breadcumb links={links} />
            </Grid>
            <Grid item lg={12}>
              <Router>
                <Switch>
                  <Route path="/" exact component={HomeContainer} />
                  <Route path="/post/" exact component={PostContainer} />
                  <Route path="/post/create" exact component={PostCreateContainer} />
                  <Route path="/category" exact component={CategoryContainer} />
                  <Route path="/category/create" exact component={CategoryCreateContainer} />
                </Switch>
              </Router>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
