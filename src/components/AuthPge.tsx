import { auth,provider } from "../config/firebase";
import {signInWithPopup} from "firebase/auth"
import "../style/AuthPge.css"

// importing cookies
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const AuthPge = (props:any) => {
  const {setIsAuth} = props;

    const signInWithGoogle =  async () =>{
      try{
     const result=  await signInWithPopup(auth, provider);
     cookies.set("auth-token", result.user.refreshToken);
     setIsAuth(true);
    }catch (err){
      console.error(err)
    }
  };

  return (
    <div className='auth'>
      <h1>Welcome!</h1>
        <h2>Sign In With Google To Continue...</h2>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default AuthPge