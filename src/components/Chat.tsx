import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import "../style/Chat.css";

export const Chat = (props: any) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; id: string; createdAt: any; user: string }[]
  >([]);

  const messagesRef = collection(db, "messages");
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: {
        text: string;
        id: string;
        createdAt: any;
        user: string;
      }[] = [];
      snapshot.forEach((doc) => {
        messages.push({
          text: doc.data().text,
          id: doc.id,
          createdAt: doc.data().createdAt,
          user: doc.data().user,
        });
      });

      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (newMessage === "") return;

    // sending code to Firebase
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser ? auth.currentUser.displayName : null,
      room,
    });
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}</span>
            <p>{message.text}</p>
            <small>
              {message.createdAt ? message.createdAt.toDate().toDateString()
              : ""}
            </small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here."
          onChange={(event) => setNewMessage(event.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
