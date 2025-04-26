import { useState } from "react";
import { Link } from "react-router-dom";
import { extractFirstNameUptoSpace, getCurrentDate } from "../../helpers";
import { useAppSelector } from "../../redux/store";
import GenerateImage from "../GenerateImage";
import SearchInput from "../SearchInput";
import ToolTip from "../ToolTip";
import TextEffect from "../TransitionEffects/Text";
import DropDownMenu from "./DropMenu";
import notification from "./imgs/notify.svg";
import "./topbar.scss";
interface props {
  openSidebar: () => void;
}
const TopNav = ({ openSidebar }: props) => {
  const datenow = getCurrentDate();
  const { admin } = useAppSelector((state) => state.user);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const { theme, usePageSearch } = useAppSelector((state) => state.utils);

  return (
    <div
      className={`generalTopNav ${toggleDropdown ? "showDropdown" : ""} ${
        theme === "dark" ? "dark" : ""
      }`}
      data-theme={theme}
    >
      <div className="toggle_logo">
        {window.location.pathname !== "/organizations" && (
          <div className={"TopNav_toggle"} onClick={openSidebar}>
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 2V0H18V2H0ZM0 7H18V5H0V7ZM0 12H18V10H0V12Z"
                fill="var(--text-color)"
              />
            </svg>
          </div>
        )}
        <div className={"TopNav_logo"}>
          <Link to="/" className={`logoLink`}>
            <img src="/Mailrion/Logo-main.png" alt="mailrion logo" />
          </Link>
          <div className="todays-date">
            <TextEffect>{datenow}</TextEffect>
          </div>
        </div>
      </div>
      <div className="topnav_user_search">
        <div className={"TopNav_user_btn"}>
          <div className={"TopNav_search"}>
            {usePageSearch.show && <SearchInput />}
          </div>
          <div className="action-icons">
            <img src={notification} alt="notification icon" />
          </div>
          <div className={"TopNav_user"}>
            <GenerateImage name={admin.name} />
            <p className="name ml-1">{extractFirstNameUptoSpace(admin.name)}</p>
            <ToolTip content="Account info" position="left">
              <div
                className="dropdown"
                onClick={() => setToggleDropdown(!toggleDropdown)}
              >
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z"
                    fill="var(--secondary-color)"
                  />
                </svg>
              </div>
            </ToolTip>
          </div>

          <div className={"TopNav_user_mobile"}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <GenerateImage name={admin.name} />
              <div
                className="dropdown"
                onClick={() => setToggleDropdown(!toggleDropdown)}
              >
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z"
                    fill="var(--secondary-color)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {toggleDropdown && (
          <div
            className="overlay"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          ></div>
        )}
        {toggleDropdown && (
          <div className="dropdownMenu">
            {<DropDownMenu open={toggleDropdown} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
