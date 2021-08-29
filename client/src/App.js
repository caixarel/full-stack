
import './App.css';
import React from "react";
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import Header from './components/Header'
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import { Provider } from './Context';
import PrivateRoute from './components/PrivateRoute';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Courses from './components/Courses';

function App() {
 

  return (
    <Provider>
      <Router>
            <Header />
            <Switch>
              <Route exact path='/'>
                <Courses />
              </Route>
              <PrivateRoute exact path='/courses/create' component={CreateCourse}/>
              <PrivateRoute exact path='/courses/:id/update' component={UpdateCourse}/>
              <Route exact path='/courses/:id' component={CourseDetail}/>
              <Route exact path='/signin' component={UserSignIn}/>
              <Route exact path='/signup'>
                <UserSignUp />
              </Route>
              <Route exact path='/signout' component={UserSignOut}/>
            </Switch>
            
            
          </Router>
    </Provider>
    
    
  );
}

export default App;
