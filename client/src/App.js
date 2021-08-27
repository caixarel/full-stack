
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

function App({context}) {
  const [data,setData] = useState([])

useEffect(async ()=>{
  await axios.get(`http://localhost:5000/api/courses`)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
},[])

  return (
    <CreateCourse />
  //  <ul>
  //   {data.map((element,index)=>{
  //     return <li key={index}>{element.title}</li>
  //   })}
  //  </ul>
  );
}

export default App;
