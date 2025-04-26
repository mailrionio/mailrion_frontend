import Button from "../../components/Button";
import HeadingEffect from "../../components/TransitionEffects/Heading";
import bgImg from "./bgimg.png";
import "./home.scss";
import logoBrand from "./logo.webp";
import meshBg from "./mesh.webp";
const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${meshBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="img-section">
        <img src={bgImg} alt="bgimg" />
      </div>
      <div className="text-section">
        <div className="logo-section">
          <div style={{ overflow: "hidden" }}>
            <HeadingEffect>
              <img src={logoBrand} alt="logo" />
            </HeadingEffect>
          </div>
          <p>
            The right way to build and manage your business emails like a pro.
          </p>
        </div>
        <div className="button-group">
          <Button to="/organizations" text="Take Me In" />
        </div>
      </div>
    </div>
  );
};

export default Home;
