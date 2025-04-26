import { ChangeEvent, FC, useState } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import ButtonSpinner from "../../../components/ButtonSpiner";
import GeneralModal from "../../../components/GeneralModal";
import InputField from "../../../components/InputField";
import Toast from "../../../components/Toast";
import { CreateOrganization } from "../../../redux/features/OrganizationSlice/services";
import { useAppSelector } from "../../../redux/store";
import "./create-organization.scss";
import repImg from "./imgs/resImg.svg";
interface props {
  handleclose: () => void;
}

const CreateNewOrganization: FC<props> = ({ handleclose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [organizationName, setOrganizationName] = useState<string>("");
  const { isLoading } = useAppSelector((state) => state.organization);
  const [hostname, setHostname] = useState<string>("");
  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    // Check file size
    if (file.size > 2 * 1024 * 1024) {
      Toast({
        type: "error",
        message: "Image size should be less than 2MB.",
      });
      return;
    }

    // Create a promise to wait for the image to load
    const loadImage = (file: File) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = URL.createObjectURL(file);
      });
    };

    // Load the image and perform validation
    loadImage(file)
      .then((img: HTMLImageElement) => {
        // Check image dimensions
        if (img.width > 512 || img.height > 512) {
          Toast({
            type: "error",
            message: "Image dimensions should be less than 512x512.",
          });
          return;
        }
        setFile(file);
        setLogo(img.src);
      })
      .catch(() => {
        Toast({
          type: "error",
          message: "Failed to load the image.",
        });
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      Toast({
        type: "error",
        message: "Please upload a logo.",
      });
      return;
    }
    if (!organizationName) {
      Toast({
        type: "error",
        message: "Please enter organization name.",
      });
      return;
    }
    if (!hostname) {
      Toast({
        type: "error",
        message: "Please enter organization domain.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("logo", file);
    formData.append("organization", organizationName);
    formData.append("hostname", hostname);
    const res = await CreateOrganization(formData);
    if (res.status === 200 || res.status === 201) {
      // await FetchOrganization();
      handleclose();
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  };

  return (
    <GeneralModal
      title="Create organization"
      subTitle="Provide details about your organization to start"
      width="600px"
      height="505px"
      handleClose={handleclose}
    >
      <form className="new-org" onSubmit={handleSubmit}>
        <div className="org-modal-logo">
          <div className="logo-info">
            <div className="logo">
              {logo ? (
                <img src={logo} className="actLogo" alt="" />
              ) : (
                <img src={repImg} alt="" />
              )}
            </div>
            <div className="logo-req">
              <h4>Organization logo</h4>
              <p> 512px X 512px</p>
              <p>Max: 2mb</p>
            </div>
          </div>
          <label htmlFor="uploadLogo" className="logo-btn">
            <FaPlus className="add_icon" />
            upload photo
            <input
              type="file"
              name="upload_logo"
              onChange={handleLogoChange}
              id="uploadLogo"
              hidden
              accept="image/*"
            />
          </label>
        </div>
        <div className="org-modal-inputs">
          <InputField
            handleChange={(e) => setOrganizationName(e.target.value)}
            name={"organizationName"}
            classes={""}
            value={organizationName}
            placeholder={"company name"}
            label={"Organization name"}
            required={true}
          />
          {/* <InputField
            handleChange={(e) => setOrganizationSlug(e.target.value)}
            name={"organizationSlug"}
            classes={""}
            value={
              organizationSlug
                ? organizationSlug
                : organizationName.replace(/\s+/g, "-").toLowerCase()
            }
            placeholder={"company slug"}
            label={"Organization slug"}
            required={true}
          /> */}
          <div className="customInput">
            <label htmlFor="">Hostname *</label>
            <div className="input-group">
              <span>https://</span>
              <input
                type="text"
                name="hostname"
                placeholder="example.com"
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="org-modal-btns">
          <div />
          <div className="btns">
            <div className="cancel" onClick={handleclose}>
              Cancel
            </div>
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <button type={"submit"} className="create">
                Create organization <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </form>
    </GeneralModal>
  );
};

export default CreateNewOrganization;
