import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import Context from '../Context';


function CreateCourse(props){
    const context =useContext(Context)
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [estimatedTime,setTime]=useState('');
    const [materialsNeeded,setMaterials]=useState('');
    const [errors,setErrors]=useState([]);

    async function handleSumit (e){
        e.preventDefault();
        await axios.post('http://localhost:5000/api/courses',{
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
        .catch(error => {
            console.log( error.response.data.errors);
            setErrors(error.response.data.errors);
          });
    }

    function change(e){
        const name = e.target.name;
        const value = e.target.value;
        if(name==="title"){
            setTitle(value)
            console.log(value)

        }
        else if(name==='description'){
            setDescription(value)
            console.log(value)

        }else if(name==='estimatedTime'){
            console.log(value)
            setTime(value)
        }else if(name==='materialsNeeded'){
            console.log(value)

            setMaterials(value)
        }

    }
    return(
        <div id="root">
            <main>
                <div className='wrap'>
                    <h2>Create Course</h2>
                    <div className="validation--errors">
                        {
                            errors.length>0
                            ?<><h3>Validation Errors</h3>
                                <ul>
                                    {(errors.map((error,index)=>{
                                    return(
                                        <li key={index}>{error}</li>
                                    )
                                }))}
                                </ul>
                            </>
                            :null
                        }
                            {/* <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li> */}
                    </div>
                    <form onSubmit={handleSumit}>
                        <div className="main--flex">
                            <div>
                                 <label htmlFor="courseTitle">Course Title</label>
                                 <input id="courseTitle" name="title" type="text" defaultValue="" onChange={change}/>
                                 <p>By Joe Smith</p>

                                 <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="description" onChange={change}></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" defaultValue=""onChange={change}/>

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" onChange={change}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit" >Create Course</button><Link to='/' className="button button-secondary" >Cancel</Link>
                    </form>
                </div>
            </main>
        </div>
    )
}
export default CreateCourse;