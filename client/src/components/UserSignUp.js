import React from 'react'
import {Link} from 'react-router-dom'

function UserSignUp(){
    function handleSubmit(e){
        e.preventDefault();
    }
    return (
        <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" defaultValue=""/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" defaultValue=""/>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue=""/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue=""/>
                    <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button><Link to='/courses' className="button button-secondary" >Cancel</Link>
                </form>
                <p>Already have a user account? Click here to <Link to='signin' >sign in</Link>!</p>
            </div>
    )

}
export default UserSignUp;