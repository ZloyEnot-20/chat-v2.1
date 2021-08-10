import React from 'react';
import './Chat.css';
import SideMenu from '../SideMenu/SideMenu';
import InputEmoji from 'react-input-emoji';
import { useDispatch, useSelector } from 'react-redux';
import { addData, editData, deleteData } from '../../actions';
import { IoMdSend, IoMdShareAlt, IoMdCreate } from 'react-icons/io';
import { ImBin } from 'react-icons/im';
import { FcCheckmark, FcCancel } from 'react-icons/fc';

const Chat = () => {
  const dispatch = useDispatch();
  const [isReplied, setIsReplied] = React.useState('');
  const [inputMessage, setInputMessage] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(null);
  const sendButton = React.useRef(null);
  const repliedMessage = React.useRef(null);
  const input = React.useRef(null);
  const messagesRef = React.useRef(null);
  const messageDetails = React.useReducer(null);

  const users = useSelector((state) => state.users);
  const data = useSelector((state) => state.data);
  const getTime = () => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();

    return `${hours < 10 ? '0' + hours : hours} : ${
      minutes < 10 ? '0' + minutes : minutes
    }`;
  };

 
  const handleReply = ({ user, text }) => {
    repliedMessage.current.style.visibility = 'visible';
    setIsReplied(`${user}: ${text}`);
    input.current.focus();
    repliedMessage.current.innerHTML = `<p>${user}: ${text}</p>`;
  };

  const handleEdit = (message, index) => {
    console.log(index);
    setIsEditing(index);
    handleReply(message);
    setInputMessage(message.text);
  };

  const deleteMessage = (index) => {
    dispatch(
      deleteData({
        text: inputMessage,
        user: users.me.name,
        time: getTime(),
        edited: false,
        mine: true,
        replied: isReplied,
        index: index,
      })
    );
  };

  const detailWindow = (status) => {
    messageDetails.current.style.visibility = status;
  };

  const handleSend = () => {
    if (!isEditing && inputMessage) {
      sendButton.current.style.left = '10px';
      setTimeout(() => {
        sendButton.current.style.left = '0px';
      }, 500);

      dispatch(
        addData({
          text: inputMessage,
          user: users.me.name,
          time: getTime(),
          edited: false,
          mine: true,
          replied: isReplied,
        })
      );
      setIsReplied('');
      setInputMessage('');
      repliedMessage.current.style.visibility = 'hidden';
    }
    if (inputMessage) {
      dispatch(
        editData({
          text: inputMessage,
          user: users.me.name,
          time: getTime(),
          edited: true,
          mine: true,
          replied: isReplied,
          index: isEditing,
        })
      );
      setIsReplied('');
      setInputMessage('');
      setIsEditing(null);
      repliedMessage.current.style.visibility = 'hidden';
    }
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [data]);

  return (
    <div className="body">
      <div className="chat-body">
        <div className="title">Флудилка</div>

        <div className="chat-section">
          <div className="menu">
            <SideMenu setInputMessage={setInputMessage} input={input} />
          </div>
          <div className="main-chat">
            <div className="search">Search</div>

            <div className="chat-window" ref={messagesRef}>
              {data.map((message, index) => (
                <div
                  className={`${
                    message.mine ? 'message-mine' : 'message-wrap'
                  }`}
                >
                  <div className="icon-cover">
                    <div className="user-icon">
                      <div className="icon">{message.user[0]}</div>
                    </div>
                  </div>
                  <div className="message-cover">
                    <li
                      className="message"
                      style={
                        message.mine
                          ? { borderBottomRightRadius: '0' }
                          : { borderBottomLeftRadius: '0' }
                      }
                    >
                      <p className="top-reply">{message.replied}</p>
                      <div className="test">
                        <p> {message.text}</p>

                        {!message.mine ? (
                          <IoMdShareAlt
                            size="14px"
                            onClick={() => handleReply(message)}
                            className="reply-message"
                          />
                        ) : (
                          <div className="message-action">
                            <div className="delete-button" ref={messageDetails}>
                              <FcCheckmark
                                className="delete-yes"
                                onClick={() => deleteMessage(index)}
                              />
                              <FcCancel
                                className="delete-no"
                                onClick={() => detailWindow('hidden')}
                              />
                            </div>
                            <ImBin
                              size="10px"
                              className="delete"
                              onClick={() => detailWindow('visible')}
                            />
                            <IoMdCreate
                              size="12px"
                              className="edit-button"
                              onClick={() => handleEdit(message, index)}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className="message-deatils"
                        style={{ textAlign: 'end' }}
                      >
                        <span className="time">{message.time}</span>
                        {message.edited && (
                          <span className="edited">Edited</span>
                        )}
                      </div>
                    </li>
                  </div>
                </div>
              ))}
            </div>
            <div className="message-section">
              <div className="message-input-wrap">
                <div className="replied-message" ref={repliedMessage}></div>
                <InputEmoji
                  value={inputMessage}
                  onChange={setInputMessage}
                  className="message-input"
                  ref={input}
                  onEnter={handleSend}
                  type="text"
                />
              </div>
              <div className="message-input-button-wrap" ref={sendButton}>
                <IoMdSend
                  size="30px"
                  className="message-input-button"
                  onClick={handleSend}
                />
              </div>
            </div>
          </div>
          <div className="options"></div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
