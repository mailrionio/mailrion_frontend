import { CreatePageAPI } from "@/redux/features/PagesSlice/services";
import { setLandingPages } from "@/redux/features/PagesSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { dispatch, useAppSelector } from "@/redux/store";
import { TemplateData, templateData } from "@/templates";
import { MdKeyboardBackspace } from "react-icons/md";
import { PiNoteBlankThin } from "react-icons/pi";
import { FcTemplate } from "react-icons/fc";
import { FiSearch } from "react-icons/fi";
import { useRef, useState } from "react";
import {
  setIsNewsLetter,
  setTemplate,
  setToggleStep,
} from "@/redux/features/utilSlice";
import "./designwebsite.scss";

const DesignWebsiteOptions = () => {
  const { pageName, step } = useAppSelector((state) => state.utils);
  const { isLoading } = useAppSelector((state) => state.landingPage);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();  
  const allTemplates = "All Templates";
  const categoryParam = params.get("category") || allTemplates;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScrollLimit, setIsScrollLimit] = useState(false);
  const { pageId } = useParams();

  const handleGoBack = () => {
    if (step[1]) {
      dispatch(setToggleStep(1));
    }

    if (step[2]) {
      dispatch(setToggleStep(2));
      dispatch(setToggleStep(1));
    }
  };

  const handleOnScroll = () => {
    if (containerRef.current) {
      setIsScrollLimit(containerRef.current.scrollTop >= 180);
    }
  };

  const createPage = async (category?: string, label?: string) => {
    if (pageName === "") return;
    const resp = await CreatePageAPI(pageName.trim());
    if (!resp || !resp.success) return;
    const page = resp?.Pages;
    const pageId = page?.id;

    if (!page.attributes) return;

    dispatch(setToggleStep(1));
    localStorage.setItem("isNewsLetter", JSON.stringify(false));
    dispatch(setIsNewsLetter(false));
    localStorage.setItem("initialized", "true");
    localStorage.setItem("pageName", pageName);

    // Dispatch if in Step Two
    if (category && label && step[2]) {
      localStorage.setItem("category", JSON.stringify(category));
      localStorage.setItem("label", JSON.stringify(label));
      dispatch(setTemplate({ category, label }));
    }

    navigate(`/editor/${pageId}`);
  };

  const activateInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOnCategoryClick = (item: string) => {
    setParams({ category: item });
  };

  const filteredTemplateData = () => {
    if (categoryParam === allTemplates) {
      return Object.keys(templateData) as (keyof TemplateData)[];
    }
    return (Object.keys(templateData) as (keyof TemplateData)[]).filter(
      (key) => key.toLowerCase() === categoryParam.toLowerCase()
    );
  };

  const moveToSecondStep = () => {
    dispatch(setToggleStep(1));
    dispatch(setToggleStep(2));
  };

  const navigateToPreview = (category: string, label: string) => {
    localStorage.setItem("isNewsLetter", JSON.stringify(false));
    dispatch(setIsNewsLetter(false));
    navigate(`/editor/${category}/${label}?currentPage=${pageId}`);
  };

  const stepOne = () => (
    <div className="content">
      <h2 className="title">How would you like to design your Landing Page?</h2>
      <div className="cardContainer">
        <div className="card">
          <span>
            <PiNoteBlankThin size={50} />
          </span>
          <h4>Create a Blank Design</h4>
          <p>Start your website design from scratch</p>
          <button onClick={() => createPage()} disabled={isLoading || !pageName}>
            {isLoading ? `Creating Page...` : `Create Blank Design`}
          </button>
        </div>
        <div className="card">
          <span>
            <FcTemplate size={50} />
          </span>
          <h4>Customize a Template</h4>
          <p>Browse designs, then select one to customize</p>
          <button onClick={moveToSecondStep}>Select a Template</button>
        </div>
      </div>
    </div>
  );

  const stepTwo = () => (
    <div className="contentTwo">
      <h2 className="title">Select the Landing Page Template You Like</h2>
      <div className="inputContainer">
        <FiSearch size={25} onClick={activateInput} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for template..."
        />
      </div>

      <div className="categoryContainer">
        {[allTemplates, ...filteredTemplateData()].map((item) => (
          <p
            key={item}
            className={`item ${categoryParam === item ? "active" : ""}`}
            onClick={() => handleOnCategoryClick(item)}
          >
            {item}
          </p>
        ))}
      </div>

      <div className="templateContainer">
        {filteredTemplateData().map((category) => (
          <section key={category}>
            {categoryParam === allTemplates && (
              <h3 className="templateTitle">{category}</h3>
            )}
            <ul className="gridContainer">
              {Object.entries(templateData[category]).map(
                ([key, { media, label }]) => (
                  <li className="gridItem" key={key}>
                    <div className="imgContainer">
                      <img src={media} alt={label} />
                      <div className="btnContainer">
                        <button
                          className="btnView"
                          onClick={() => navigateToPreview(category, label)}
                        >
                          View
                        </button>
                        <button
                          className="btnEdit"
                          onClick={() => createPage(category, label)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <p>{label}</p>
                  </li>
                )
              )}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );

  return step[1] || step[2] ? (
    <div ref={containerRef} onScroll={handleOnScroll} className="container">
      <div
        className={`back ${isScrollLimit ? "active" : ""}`}
        onClick={handleGoBack}
      >
        <MdKeyboardBackspace />
        <p>Back</p>
      </div>
      {step[1] && stepOne()}
      {step[2] && stepTwo()}
    </div>
  ) : null;
};

export default DesignWebsiteOptions;
