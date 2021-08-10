import React from 'react';
import '../components/Login.css';
import { addMe } from '../actions';
import { useDispatch } from 'react-redux';

const Login = ({ setJoin }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const userName = React.useRef(null);
  const userOccupation = React.useRef(null);

  const onEnter = (e) => {
    if (!userOccupation.current.value || !userName.current.value) {
      return alert('Неверные данные');
    }
    dispatch(
      addMe({
        name: userName.current.value,
        occupation: userOccupation.current.value,
      })
    );
    setJoin(true)
    setLoading(prev=> !prev);
  };

  return (
    <div className="login-wrapper">
      <form className="login-form">
        <h1>Login</h1>
        <input
          type="text"
          className="id-input"
          placeholder="Ваше имя"
          ref={userName}
        />
        <input
          type="text"
          placeholder="Ваша должность"
          ref={userOccupation}
          className="name-input"
        />
        <button disabled={loading} onClick={onEnter} className="enter-room">
          {loading ? 'ВХОД...' : 'ВОЙТИ'}
        </button>
      </form>
    </div>
  );
};

export default Login;
