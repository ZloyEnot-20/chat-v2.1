import React from 'react';
import './SideMenu.css';
import { IoIosApps, IoIosPaperPlane } from 'react-icons/io';
import { useSelector } from 'react-redux';

const SideMenu = ({ setInputMessage, input }) => {
  const users = useSelector((state) => state.users);

  const handleReply = (name) => {
    console.log(name);
    setInputMessage(name + ', ');
    input.current.focus();
  };

  return (
    <div className="menu-section">
      <div className="menu-options">
        <IoIosApps size="23" style={{ flex: 1 }} />
        <span style={{ flex: 4, textAlign: 'start' }}>Участники</span>
      </div>
      <div className="users-menu">
        {users.all.map(
          (user, index) =>
            users.me.name !== user.name && (
              <div className="user-info">
                <div className="user" key={user.name + index}>
                  {user.name}
                </div>
                <IoIosPaperPlane
                  className="reply-button"
                  onClick={() => handleReply(user.name)}
                  key={user.name}
                />
              </div>
            )
        )}
      </div>
      <div className="users-me">
        <div className="icon-wrap">
          <div className="icon">{users.me.name[0]}</div>
        </div>
        <div className="my-info">
          <span className="name">{users.me.name}</span>
          <span className="occupation">{users.me.occupation}</span>
          <span className="status">В сети</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
