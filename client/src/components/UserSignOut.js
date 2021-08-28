import React,{useEffect,useContext} from 'react'
import Context from '../Context';

function UserSignOut(props){
    const context =useContext(Context)

    useEffect(()=>{
        context.actions.signOut();
        props.history.push('/');
    },[])
    return null;;

}
export default UserSignOut;