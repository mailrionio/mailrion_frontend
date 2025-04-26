import Button from "../../components/Button";
import usePageMetadata from "../../components/UsePageMetadata";
import notfoundImg from "./Illustration.png";
import "./bad-protocol.scss";

const BadProtocal = () => {
  usePageMetadata({
    title: "oops :), 500 server error",
    description: "server erro, try again later.",
  });
  return (
    <div className="bad-protocol">
        <h1>Internal Server Error</h1>
      <div className="bad-protocol-img">
        <img src={notfoundImg} alt="404" />

      </div>
      <h3>500 Error</h3>
      <p>
              opps :) Internal Server Error, our technical team are working on
              it!
            </p>
      <Button to={-1} text="Go Home" />
    </div>
  );
};

export default BadProtocal;
