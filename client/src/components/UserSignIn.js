import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import Context from '../Context';


function UserSignIn(props){
    const [password,setPassword]=useState('');
    const [emailaddress,setEmailAddress]=useState('');
    const context =useContext(Context)
    const [errors,setErrors]=useState([]);



    function handleSubmit(e){
        e.preventDefault();
        context.actions.signIn(emailaddress,password)
        .then( user => {
            console.log(user)
            if (user) {
                props.history.push('/');
                console.log(`SUCCESS! is now signed in!`);
            }else{
              setErrors('The username or password are not correct')
            }
          })
          .catch( err => {
            console.log(err);
            props.history.push('/error');
          })
        
          

    }
    function changeEmail(e){
        setEmailAddress(e.target.value)
    }
    function changePassword(e){
        setPassword(e.target.value);
    }
    return (
        <div className="form--centered">
                <h2>Sign In</h2>
                {
                        errors.length>0
                        ?<><div className="validation--errors">
                            <h3>Validation Errors</h3>
                                <ul>
                                    <li >{errors}</li>
                    
                                </ul>
                            </div>
                        </>
                        :null
                    }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue=""onChange={changeEmail}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue=""onChange={changePassword}/>
                    <button className="button" type="submit" >Sign In</button><Link to='/' className="button button-secondary" >Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>
                
            </div>
    )
}

export default UserSignIn;