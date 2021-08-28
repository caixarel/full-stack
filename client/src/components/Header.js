import React from 'react'
import {Link} from 'react-router-dom'
import { Consumer } from '../Context'


function Header(){
    return(
        <Consumer>
            {context=>{
                if(context.state.authenticatedUser){
                    console.log(context.state.authenticatedUser.data.firstName)
                    return(
                        <header>
                        <div className="wrap header--flex">
                            <h1 className="header--logo"><Link to="/Courses">Courses</Link></h1>
                            <nav>
                                <ul className="header--signedin">
                                    <li>{context.state.authenticatedUser.data.firstName}</li>
                                    <li><Link to="/signout">Sign Out</Link></li>
                                </ul>
                            </nav>
                        </div>
                        </header>
                    )
                }else{
                    return(
                        <header>
                        <div className="wrap header--flex">
                            <h1 className="header--logo"><Link to="/Courses">Courses</Link></h1>
                            <nav>
                                <ul className="header--signedin">
                                    <li><Link to="/signin">Sign In</Link></li>
                                    <li><Link to="/signout">Sign Out</Link></li>
                                </ul>
                            </nav>
                        </div>
                        </header>
                    )
                }
                }
                }
                
        </Consumer>
        
    )
}

export default Header;