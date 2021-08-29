import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import { Consumer} from '../Context';



function CourseDetail(props){
    const [data,setData] = useState()
    let {id} = useParams();
    const[materials,setMaterials]=useState([])

    let password ='';
    let username = '';
    useEffect( ()=>{
          axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                console.log(response.data)
                setData(response.data)
                const material =response.data.materialsNeeded.split('\n');
                setMaterials(material);
            })
            .catch(error => {
              console.log('Error fetching and parsing data', error);
            });

      },[])

        function deleteCourse(){
            axios.delete(`http://localhost:5000/api/courses/${id}`,{
                auth: {
                  password:password,
                  username:username
                }})
            .then(response => {
                props.history.push('/');
                
            })
            .catch(error => {
              console.log('Error fetching and parsing data', error);
            });
        }
      
        return (
            <Consumer>
                { context =>{
                    console.log(materials)
                    password=context.state.password;
                    username=context.state.username;
                        return(
                        <div id="root">
                            <main>
                                <div className="actions--bar">
                                    <div className="wrap">
                                        {context.state.authenticatedUser && data?.User.id && context.state.authenticatedUser.data?.id==data.User.id &&<>
                                            <Link to={`/courses/${id}/update`} className="button" >Update Course</Link>
                                            <button className="button"  onClick={deleteCourse}>Delete Course</button>
                                        </>
                                        }
                                        <Link to ='/'className="button button-secondary" >Return to List</Link>
                                    </div>
                                </div>
                                
                                <div className="wrap">
                                    <h2>Course Detail</h2>
                                    <form>
                                        <div className="main--flex">
                                            <div>
                                                <h3 className="course--detail--title">Course</h3>
                                                <h4 className="course--name">{data?.title}</h4>
                                                <p>{data?.User.firstName} {data?.User.lastName}</p>
                        
                                                <p>{data?.description}</p>

                                            </div>
                                            <div>
                                                <h3 className="course--detail--title">Estimated Time</h3>
                                                <p>{data?.estimatedTime}</p>                       
                                                <h3 className="course--detail--title">Materials Needed</h3>
                                                <ul className="course--detail--list">
                                                    {materials.map((material,index)=>{
                                                        return(
                                                            <li key={index}>{material}</li>
                                                        )
                                                    })}
                                                           
                                                </ul>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </main>
                        </div>
                    )
                    }
                    
                }
            </Consumer>
            )

    
}


export default CourseDetail;