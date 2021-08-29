import React,{useState,useEffect,useContext} from "react";
import { useParams,Link } from "react-router-dom";
import { Consumer} from '../Context';
import Context from '../Context';

import axios from "axios";


function UpdateCourse(props){
    const context =useContext(Context)
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [estimatedTime,setTime]=useState('');
    const [materialsNeeded,setMaterials]=useState('');
    const [data,setData] = useState()
    let {id} = useParams();

    useEffect( ()=>{
        axios.get(`http://localhost:5000/api/courses/${id}`)
          .then(response => {
            setData(response.data);
            setMaterials(response.data.materialsNeeded);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setTime(response.data.estimatedTime);
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });
    },[])

    async function handleSumit(e){
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/courses/${id}`,{
            title,description,estimatedTime,materialsNeeded
        },{
            auth: {
              password:context.state.password,
              username:context.state.username
            }})
        .then(response=>{
            props.history.push('/');
        }
        )
    }
    function change(e){
        const name = e.target.name;
        const value = e.target.value;
        if(name=="title"){
            setTitle(value)
            console.log(value)
        }
        else if(name=='description'){
            setDescription(value)
            console.log(value)

        }else if(name=='estimatedTime'){
            console.log(value)
            setTime(value)
        }else if(name=='materialsNeeded'){
            const material =value.split('\n');
            console.log(material);
            setMaterials(value)
        }

    }
   
    return (
        <Consumer>
        {context=>{
            return(
                <div className="wrap">
                    <h2>Update Course</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="title" type="text" defaultValue={data?.title} onChange={change}/>
 

                                <p>By Joe Smith</p>

                                <label htmlFor="courseDescription">Course Description</label>
                    
                                    <textarea id="courseDescription" name="description" defaultValue={data?.description} onChange={change}></textarea>
                                
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={data?.estimatedTime} onChange={change}/>

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={materialsNeeded}onChange={change}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit" onClick={handleSumit}>Update Course</button><Link to='/' className="button button-secondary" >Cancel</Link>
                    </form>
                </div>
            )
        }}
    </Consumer>
    )
}
export default UpdateCourse;