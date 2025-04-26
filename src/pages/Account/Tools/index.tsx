import { useState } from "react";
import { Link } from "react-router-dom";
import GeneralModal from "../../../components/GeneralModal";
import "./tools.scss";
const Tools = () => {
  const [selected, setSelected] = useState<string>("SMTP");
  const toolsList = [
    { id: 1, name: "SMTP", link: "/smtp" },
    { id: 2, name: "Cloud storage", link: "/cloud-storage" },
    { id: 3, name: "AI chat", link: "/ai-chat" },
    {
      id: 4,
      name: "AI split testing mailing",
      link: "/ai-split-testing-mailing",
    },
    {
      id: 5,
      name: "Email scraping with keyword search",
      link: "/email-scraping-with-keyword-search",
    },
    {
      id: 6,
      name: "Email validation/Verifcation cleaning system",
      link: "/email-validation-verifcation-cleaning-system",
    },
  ];
  return (
    <GeneralModal
      title={"Tools"}
      subTitle="A wide range of tool to use"
      width={"700px"}
      height={"400px"}
      handleClose={function (): void {
        throw new Error("Function not implemented.");
      }}
    >
      <div className="Tools-grid">
        {toolsList.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            onClick={() => setSelected(item.name)}
            className={`tool-item ${selected === item.name ? "active" : ""}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </GeneralModal>
  );
};

export default Tools;
