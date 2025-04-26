import Button from "@/components/Button";
import GeneralModal from "@/components/GeneralModal";
import InputField from "@/components/InputField";
import PageHeader from "@/components/PageHeader";
import usePageMetadata from "@/components/UsePageMetadata";
import { useQueryParams } from "@/helpers";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./white-label.scss";
const Whitelabel = () => {
  usePageMetadata({
    title: "White label",
    description: "Create and manage white label users here.",
  });
  const { theme } = useAppSelector((state) => state.utils);
  const selectedQuery = useQueryParams("selected");
  const [selected, setSelected] = useState<string>(selectedQuery || "");
  const [custom_domain, setCustom_domain] = useState("");
  const [custom_url, setCustom_url] = useState("");
  const [brand_name, setBrand_name] = useState("");
  const [brand_theme, setBrand_theme] = useState("");

  const handleClose = () => {
    setSelected("");
    window.history.replaceState({}, "", `${window.location.pathname}?`);
  };
  function ConfigfureWhitelabel() {
    return (
      <GeneralModal
        title="Configure White Label"
        subTitle="Setup a custom name for your mailrion account to personalize your links to match your brand."
        handleClose={() => setSelected("")}
        width={"850px"}
        height="550px"
      >
        <form className="mt-2 configure-white-label">
          <h3>
            Create a NAME record from your domain registrar and point it to{" "}
            <span className="color-primary">mailrion.com</span> or A record to{" "}
            <span className="color-primary">38.242.153.189</span>
          </h3>
          <InputField
            placeholder="Customize your mailrion domain"
            type="text"
            name="custom_domain"
            label="Customize subdomain (e.g. mail.yourdomain.com)"
            classes="input-field"
            value={custom_domain}
            required
            handleChange={(e) => setCustom_domain(e.target.value)}
          />
          <InputField
            placeholder="Custom url"
            type="text"
            name="custom_url"
            label="your custom url"
            classes="input-field"
            value={custom_url}
            required
            handleChange={(e) => setCustom_url(e.target.value)}
          />{" "}
          <InputField
            placeholder="Enter brand name"
            type="text"
            name="brand_name"
            label="Your brand name"
            classes="input-field"
            value={brand_name}
            required
            handleChange={(e) => setBrand_name(e.target.value)}
          />{" "}
          <InputField
            placeholder="enter your brand theme (e.g Purple or #800080 in hex)"
            type="text"
            name="email"
            label="Your brand theme (e.g Purple or #800080 in hex)"
            classes="input-field"
            value={brand_theme}
            required
            handleChange={(e) => setBrand_theme(e.target.value)}
          />
          <div className="btns">
            <Button text="Cancel" className="outline" onClick={handleClose} />
            <div className="flex-items">
              <Button text="Upload brand logo" className="outline" plusIcon />
              <Button text="Save brand details" arrIcon />
            </div>
          </div>
        </form>
      </GeneralModal>
    );
  }

  return (
    <div className="white-label" data-theme={theme}>
      <PageHeader title="White Label" useBackArrow backLink={-1} />
      {selected === "" ? (
        <div className="choose-option">
          <h3>What do you have in mind?</h3>
          <div className="option">
            <div
              className="option-item"
              onClick={() => {
                setSelected("configure-white-label");
                window.history.replaceState(
                  {},
                  "",
                  `${window.location.pathname}?configure-white-label`
                );
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 2.25V3.84451C7.29392 4.17755 8.25 5.35212 8.25 6.75C8.25 8.14788 7.29392 9.32245 6 9.65549V15.75C6 16.1642 5.66421 16.5 5.25 16.5C4.83579 16.5 4.5 16.1642 4.5 15.75L4.5 9.65549C3.20608 9.32245 2.25 8.14788 2.25 6.75C2.25 5.35212 3.20608 4.17755 4.5 3.84451L4.5 2.25C4.5 1.83579 4.83579 1.5 5.25 1.5C5.66421 1.5 6 1.83579 6 2.25ZM3.75 6.75C3.75 5.92157 4.42157 5.25 5.25 5.25C6.07843 5.25 6.75 5.92157 6.75 6.75C6.75 7.57843 6.07843 8.25 5.25 8.25C4.42157 8.25 3.75 7.57843 3.75 6.75Z"
                  fill="var(--secondary-color)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 14.1555V15.75C12 16.1642 12.3358 16.5 12.75 16.5C13.1642 16.5 13.5 16.1642 13.5 15.75V14.1555C14.7939 13.8225 15.75 12.6479 15.75 11.25C15.75 9.85212 14.7939 8.67755 13.5 8.34451V2.25C13.5 1.83579 13.1642 1.5 12.75 1.5C12.3358 1.5 12 1.83579 12 2.25V8.34451C10.7061 8.67755 9.75 9.85212 9.75 11.25C9.75 12.6479 10.7061 13.8225 12 14.1555ZM14.25 11.25C14.25 10.4216 13.5784 9.75 12.75 9.75C11.9216 9.75 11.25 10.4216 11.25 11.25C11.25 12.0784 11.9216 12.75 12.75 12.75C13.5784 12.75 14.25 12.0784 14.25 11.25Z"
                  fill="var(--secondary-color)"
                />
              </svg>

              <div className="option-item__text">
                <h4>Configure white label</h4>
              </div>
            </div>
            <Link className="option-item" to={"/white-label/manage-users"}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5 2.25C8.0147 2.25 5.99998 4.26472 5.99998 6.75C5.99998 9.23528 8.0147 11.25 10.5 11.25C12.9853 11.25 15 9.23528 15 6.75C15 4.26472 12.9853 2.25 10.5 2.25ZM7.49998 6.75C7.49998 5.09315 8.84313 3.75 10.5 3.75C12.1568 3.75 13.5 5.09315 13.5 6.75C13.5 8.40685 12.1568 9.75 10.5 9.75C8.84313 9.75 7.49998 8.40685 7.49998 6.75Z"
                  fill="var(--secondary-color)"
                />
                <path
                  d="M6.11653 15.3954C5.89816 15.7474 5.4358 15.8557 5.08383 15.6373C4.73185 15.4189 4.62355 14.9566 4.84192 14.6046C5.86898 12.9492 7.97008 11.25 10.5 11.25C13.0299 11.25 15.131 12.9492 16.1581 14.6046C16.3764 14.9566 16.2681 15.4189 15.9162 15.6373C15.5642 15.8557 15.1018 15.7474 14.8834 15.3954C14.0418 14.0389 12.3632 12.75 10.5 12.75C8.63674 12.75 6.95815 14.0389 6.11653 15.3954Z"
                  fill="var(--secondary-color)"
                />
                <path
                  d="M5.92337 4.91979C6.10575 5.29169 5.9521 5.74102 5.58019 5.92339C4.89869 6.25758 4.49998 6.86384 4.49998 7.5C4.49998 8.13616 4.89869 8.74242 5.58019 9.07661C5.9521 9.25898 6.10575 9.70831 5.92337 10.0802C5.741 10.4521 5.29167 10.6058 4.91977 10.4234C3.81216 9.88026 2.99998 8.80015 2.99998 7.5C2.99998 6.19985 3.81216 5.11974 4.91977 4.57661C5.29167 4.39423 5.741 4.54788 5.92337 4.91979Z"
                  fill="var(--secondary-color)"
                />
                <path
                  d="M3.11653 15.3954C2.89816 15.7474 2.4358 15.8557 2.08383 15.6373C1.73185 15.4189 1.62355 14.9566 1.84192 14.6046C2.27625 13.9046 2.97115 13.3203 3.74641 12.867C4.10398 12.6579 4.56334 12.7782 4.77243 13.1358C4.98151 13.4934 4.86114 13.9527 4.50357 14.1618C3.85579 14.5406 3.37919 14.9721 3.11653 15.3954Z"
                  fill="var(--secondary-color)"
                />
              </svg>

              <div className="option-item__text">
                <h4>Manage users</h4>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        selected === "configure-white-label" && <ConfigfureWhitelabel />
      )}
    </div>
  );
};

export default Whitelabel;
