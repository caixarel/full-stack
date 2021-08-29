
import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import Context from '../Context';

function UserSignUp(props){
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [password,setPassword]=useState('');
    const [errors,setErrors]=useState([]);
    const [emailAddress,setEmailAddress]=useState('');
    const context =useContext(Context)




    async function handleSubmit(e){
        e.preventDefault();
        await axios.post(`http://localhost:5000/api/users`,{
            firstName,lastName,emailAddress,password
        })
        .then(response=>{
            context.actions.signIn(emailAddress,password)
            props.history.push('/');
        }
        ).catch(error => {
            console.log( error.response.data.errors);
            setErrors(error.response.data.errors);
          });
    }


    function change(e){
        const name = e.target.name;
        const value = e.target.value;
        if(name==="firstName"){
            setFirstName(value)
            console.log(value)
        }
        else if(name==='lastName'){
            setLastName(value)
            console.log(value)

        }else if(name==='emailAddress'){
            console.log(value)
            setEmailAddress(value)
        }else if(name==='password'){
            console.log(value)
            setPassword(value)
        }
    }
    return (
        <div className="form--centered">
                <h2>Sign Up</h2>
                {
                    errors.length>0
                    ?<><div className="validation--errors">
                        <h3>Validation Errors</h3>
                            <ul>
                                {(errors.map((error,index)=>{
                                return(
                                    <li key={index}>{error}</li>
                                )
                            }))}
                            </ul>
                        </div>
                    </>
                    :null
                }
                <form>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" defaultValue=""onChange={change}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" defaultValue=""onChange={change}/>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue=""onChange={change}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue=""onChange={change}/>
                    <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button><Link to='/' className="button button-secondary" >Cancel</Link>
                </form>
                <p>Already have a user account? Click here to <Link to='/signin' >sign in</Link>!</p>
            </div>
    )

}
export default UserSignUp;