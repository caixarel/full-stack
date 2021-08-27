
import './App.css';
import React,{Component ,useState,useEffect} from "react";
import axios from "axios";
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Courses from './components/Courses';

function App({context}) {
 

  return (
    <Router>
    <Switch>
      <Route path='/api/courses/:id'>
        <CourseDetail />
      </Route>
      <Route exact path='/api/courses'>
        <Courses />
      </Route>
    </Switch>
      
      
    </Router>
    
  );
}

export default App;
