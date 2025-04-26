import Button from "../../components/Button";
import usePageMetadata from "../../components/UsePageMetadata";
import notfoundImg from "./Illustration.png";
import "./not-found.scss";

const NotFound = () => {
  usePageMetadata({
    title: "oops :), Page not found",
    description: "The page you are looking for does not exist",
  });
  return (
    <div className="not-found">
        <h1>Page not found</h1>
      <div className="not-found-img">
        <img src={notfoundImg} alt="404" />

      </div>
      <h3>404 Error</h3>
      <p>Sorry, the page you are looking for doesn’t exist or has been removed.</p>
      <Button to={-1} text="Go back" />
    </div>
  );
};

export default NotFound;
