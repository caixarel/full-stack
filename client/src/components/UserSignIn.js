import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import Context from '../Context';


function UserSignIn(props){
    const [password,setPassword]=useState('');
    const [emailaddress,setEmailAddress]=useState('');
    const context =useContext(Context)


    function handleSubmit(e){
        e.preventDefault();
        context.actions.signIn(emailaddress,password)
        .then( user => {
            if(user === null) {

            }else{
                props.history.push('/');

          }})

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