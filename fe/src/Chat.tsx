import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import './Chat.css';

type User = {
  name: string
}

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [joined, setJoined] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3003');

    // Listen for 'message' events from the server
    newSocket.on('message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    newSocket.on('user', userData => {
      const _users = JSON.parse(userData);
      console.log('received users', _users);
      setUsers(_users);
    });

    newSocket.on('system', message => {
      console.log(message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinChat = () => {
    if (!socket || !inputValue.trim()) return;

    // Send a message to the server
    console.log('sending name', inputValue)
    socket.emit('name', inputValue);

    // Clear input field after sending message
    setInputValue('');
    setJoined(true);
  };

  // const chat = () => {
  //   return (
  //       <div>
  //       {messages.map((message, index) => (
  //         <div key={index}>{message}</div>
  //       ))}
  //     </div>
  //   )
  // };

  const lobby = () => {
    return (
      <div className="lobby-container">
        <h4 className="subtitle">Connected Players:</h4>
        <div className={'lobby'}>
          {users && users.map(user => user.name && <div key={user.name}>{user.name}</div>)}
        </div>
      </div>
    )
  }

  return (
    <div className="join">
      <h4 className="subtitle">Join tahe Chat:</h4>
      <button onClick={joinChat}>Enter</button>
      <input
        disabled={joined}
        placeholder='Your name'
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {lobby()}
    </div>
  );
};

export default Chat;
