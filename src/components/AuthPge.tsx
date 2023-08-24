import { auth,provider } from "../config/firebase";
import {signInWithPopup} from "firebase/auth"
import "../style/AuthPge.css"

export const AuthPge = () => {
    const signInWithGoogle =  async () =>{
     const result=  await signInWithPopup(auth, provider);
     console.log(result)
    }

  return (
    <div className='auth'>
      <h1>Welcome!</h1>
        <h2>Sign In With Google To Continue...</h2>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default AuthPge