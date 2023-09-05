import "./App.css";
import { AuthPge } from "./components/AuthPge";
import { useState, useRef } from "react";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";

const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef<any>(null);
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return <AuthPge setIsAuth={setIsAuth} />;
  }
  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <h1>welcome to the chat room! &#128516;</h1>
          <p>
            Join the conversation and meet new people,and make connections in
            one shared room.
          </p>
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} type="text" autoFocus />
          <button
            onClick={() => {
              if (roomInputRef.current) {
                setRoom(roomInputRef.current.value);
              }
            }}
          >
            Enter chat
          </button>
        </div>
      )}
      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
