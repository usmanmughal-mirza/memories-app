import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Container} from '@material-ui/core'; 
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom'
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails'

const App = () =>{
const user=JSON.parse(localStorage.getItem("profile"));

  return(
    <>           
<Container maxWidth="xl">
  <Navbar />
  <Switch>
    <Route path="/" exact component={()=><Redirect to="/posts" /> } />
    <Route path="/posts" exact component={Home} />
    <Route path="/posts/search" exact component={Home} />
    <Route path="/posts/:id" exact component={PostDetails} />

    <Route  path="/auth" exact component={() =>(!user ?<Auth /> :<Redirect to="/posts" /> ) } />
  </Switch>
  
</Container>


    </>
  )
}
export default App;