
import React,{ Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component{
    constructor(){
        super();
        this.data ='Hello world';
        this.cookie = Cookies.get('authenticatedUser');
        this.state={
            authenticatedUser:this.cookie ? JSON.parse(this.cookie) : null,
            username:this.cookie ? JSON.parse(this.cookie).config.auth.username : null,
            password:this.cookie ? JSON.parse(this.cookie).config.auth.password : null,
        }
    }
    render(){
        const value={
            data:this.data,
            actions:{
                signIn:this.signIn,
                signOut:this.signOut
            },
            state:this.state
        }
        return(
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
        )
    }
    signIn =async(emailaddress,password)=>{
        const user = await axios.get('http://localhost:5000/api/users',{
            auth: {
              password:password,
              username:emailaddress
            }})
            if(user){
                console.log(`SUCCESS! ${user}  is now signed in!`);
                this.setState(()=>{
                    return{
                        authenticatedUser:user,
                        username:emailaddress,
                        password:password,
                    }
                })
                Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
            }
        return user;
        
    }
    signOut=()=>{
        this.setState(()=>{
            return{
                authenticatedUser:null,
                username:null,
                password:null,
            }
        });
        Cookies.remove('authenticatedUser');
    }

}
export const Consumer = Context.Consumer;
export default Context;