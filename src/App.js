import React from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import Login from './components/Login';

function App() {
  const [join,setJoin] = React.useState(!false)
 

  //

  return (
    <div className="App">
      {!join ? (
        <Login
          setJoin={setJoin}
        />
      ) : (
        <Chat />
      )}
    </div>
  );
}

export default App;
