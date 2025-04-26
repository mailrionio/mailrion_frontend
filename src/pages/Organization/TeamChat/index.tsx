import { ChangeEvent, useState } from "react";
import fileicon from "../../../assets/file.svg";
import memojiIcon from "../../../assets/memoji.svg";
import sendIcon from "../../../assets/send.svg";
import HeadingEffect from "../../../components/TransitionEffects/Heading";
import usePageMetadata from "../../../components/UsePageMetadata";
import "./team-chat.scss";
const TeamChat = () => {
  usePageMetadata({
    title: "Team Chat | Mailrion",
    description: "Chat with your team members here",
  });
  const [chatValue, setChatValue] = useState("");
  return (
    <div className="teamchat">
      <div className="title">
        <HeadingEffect>Team Chat</HeadingEffect>
      </div>
      <div className="filter-wrap">
        <div className="filter-options">
          <div className="filter-elements">
            <div className="filter-option active">All</div>
            <div className="filter-option">New message</div>
            <div className="filter-option">Past 7 days</div>
          </div>
        </div>
      </div>
      <div className="members">
        <div className="count-tag">
          Team Members
          <span className="count">1</span>
        </div>
        <div className="members-list">
          <div className="member-image">
            <img src="https://picsum.photos/200" alt="member" />
          </div>
        </div>
      </div>
      <div className="chat-container">
        <div className="chats-wrapper">
          <div className="chats">
            <div className="chat-wrapper">
              <div className="chat">
                <div className="chat-image">
                  <img src="https://picsum.photos/200" alt="member" />
                </div>
                <div className="chat-content">
                  <div className="chat-header">
                    <h4 className="chat-name">John Doe</h4>
                    <p className="chat-time">12:00 PM</p>
                  </div>
                  <div className="chat-message">
                    Hey Olivia, can you please review the latest design when you
                    can?
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-wrapper me">
              <div className="chat">
                <div className="chat-content">
                  <div className="chat-header">
                    <h4 className="chat-name">Me</h4>
                    <p className="chat-time">12:00 PM</p>
                  </div>
                  <div className="chat-message">
                    Hey Olivia, can you please review the latest design when you
                    can?
                  </div>
                </div>
                <div className="chat-image">
                  <img src="https://picsum.photos/200" alt="member" />
                </div>
              </div>
            </div>
            <div className="chat-wrapper">
              <div className="chat">
                <div className="chat-image">
                  <img src="https://picsum.photos/200" alt="member" />
                </div>
                <div className="chat-content">
                  <div className="chat-header">
                    <h4 className="chat-name">John Doe</h4>
                    <p className="chat-time">12:00 PM</p>
                  </div>
                  <div className="chat-message">
                    Hey Olivia, can you please review the latest design when you
                    can?
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-wrapper me">
              <div className="chat">
                <div className="chat-content">
                  <div className="chat-header">
                    <h4 className="chat-name">Me</h4>
                    <p className="chat-time">12:00 PM</p>
                  </div>
                  <div className="chat-message">
                    Hey Olivia, can you please review the latest design when you
                    can?
                  </div>
                </div>
                <div className="chat-image">
                  <img src="https://picsum.photos/200" alt="member" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="chat-input">
          <div className="input-wrap">
            <input
              type="text"
              placeholder="Type a message"
              value={chatValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setChatValue(e.target.value)
              }
            />
          </div>
          <div className="chat-input-options">
            {chatValue.length > 0 && (
              <button className={`chat-input-options__btn`} type="submit">
                Send
                <img src={sendIcon} alt="" />
              </button>
            )}
            <div className="chat-icon">
              <img src={fileicon} alt="" />
            </div>
            <div className="chat-icon">
              <img src={memojiIcon} alt="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamChat;
