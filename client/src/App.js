
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


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
              <Route exact path='/courses/create'>
                <CreateCourse />
              </Route>
              <Route exact path='/courses/:id/update'>
                <UpdateCourse />
              </Route>
              <Route exact path='/courses/:id'>
                <CourseDetail />
              </Route>
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
