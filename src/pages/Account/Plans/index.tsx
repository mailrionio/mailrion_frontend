import React from "react";
import { Link } from "react-router-dom";
import badIcon from "../../../assets/bad.svg";
import goodIcon from "../../../assets/good.svg";
import sqirlIcon from "../../../assets/squrl-arrow.svg";
import GeneralModal from "../../../components/GeneralModal";
import RadioInput from "../../../components/RadioInput";
import "./plans.scss";

const plans = [
  {
    id: 1,
    name: "Freebie",
    description:
      "Ideal for individuals who need quick access to basic features.",
    price: "0",
    interval: "month",
    link: "#",
    features: [
      {
        id: 1,
        name: "20+ projects",
        available: true,
      },
      {
        id: 2,
        name: "Access to all templates",
        available: true,
      },
      {
        id: 3,
        name: "Uploading of custom templates",
        available: false,
      },
      {
        id: 4,
        name: "Video presentations",
        available: false,
      },
      {
        id: 5,
        name: "Unlimited organizations",
        available: false,
      },
      {
        id: 6,
        name: "Instant access to our community chat",
        available: false,
      },
      {
        id: 7,
        name: "Use of our API",
        available: false,
      },
      {
        id: 8,
        name: "AI powered suggestions",
        available: false,
      },
    ],
  },
  {
    id: 2,
    name: "Professional",
    description:
      "Ideal for individuals who who need advanced features and tools for client work.",
    price: "25",
    interval: "month",
    link: "#",
    features: [
      {
        id: 1,
        name: "Unlimited projects",
        available: true,
      },
      {
        id: 2,
        name: "Access to all templates",
        available: true,
      },
      {
        id: 3,
        name: "Uploading of custom templates",
        available: true,
      },
      {
        id: 4,
        name: "Video presentations",
        available: true,
      },
      {
        id: 5,
        name: "AI powered solutions",
        available: true,
      },
      {
        id: 6,
        name: "Unlimited organizations",
        available: false,
      },
      {
        id: 7,
        name: "Use of our API",
        available: false,
      },
      {
        id: 8,
        name: "Create teams to collaborate",
        available: false,
      },
    ],
  },
];

const Plans = () => {
  const [selected, setSelected] = React.useState("monthly");

  return (
    <GeneralModal
      title="Powerful features for your organization"
      subTitle="Choose a plan that’s right for you"
      width="900px"
      height="650px"
      handleClose={() => console.log("close")}
    >
      <div className="Plans">
        <div className="frequent">
          {[
            { id: 1, name: "Pay Monthly", value: "monthly" },
            { id: 2, name: "Pay Yearly", value: "yearly" },
          ].map((item) => (
            <div className="frequent__item" key={item.id}>
              <RadioInput
                name="select_plan"
                value={item.value}
                checked={selected === item.value}
                onChange={() => setSelected(item.value)}
                htmlFor={item.value}
              />
              <label htmlFor={item.value} className="frequent__item__name">
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <div className="percentage-off">
          <div />
          <div />
          <div className="percentage-off__item">
            <div className="img">
              <img src={sqirlIcon} alt="sqirl" />
            </div>
            <p>Get some percentage off</p>
          </div>
        </div>
        <div className="plans-cards">
          {plans.map((item) => (
            <div
              className={`plans-cards__card ${
                item.name === "Professional" ? "active" : ""
              }`}
              key={item.id}
            >
              <div className="header">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div className="price">
                <h3>${item.price}</h3>
                <span>/ {item.interval}</span>
              </div>
              <div className="btn">
                <Link to={item.link}>Get started</Link>
              </div>
              <div className="features">
                {item.features.map((feature) => (
                  <div className="features__item" key={feature.id}>
                    <div className="features__item__img">
                      {feature.available ? (
                        <img src={goodIcon} alt="good" />
                      ) : (
                        <img src={badIcon} alt="bad" />
                      )}
                    </div>
                    <p
                      className={`${
                        feature.available ? "available" : "not-available"
                      }`}
                    >
                      {feature.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GeneralModal>
  );
};

export default Plans;
