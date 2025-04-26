import {
  setIsNewsLetter,
  setPageName,
  setToggleStep,
} from "@/redux/features/utilSlice";
import ButtonSpinner from "../../../components/ButtonSpiner";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import GeneralModal from "../../../components/GeneralModal";
import { dispatch, useAppSelector } from "@/redux/store";
import InputField from "../../../components/InputField";
import { useNavigate } from "react-router-dom";
import Toast from "../../../components/Toast";
import { FaArrowRight } from "react-icons/fa";
import {
  IPages,
  setLandingPagesEdit,
} from "@/redux/features/PagesSlice";
import "./createLandingPage.scss";

interface props {
  handleClose: () => void;
  isEdit: boolean;
  page: IPages | undefined;
}

const CreateLandingPage: FC<props> = ({ handleClose, isEdit, page }) => {
  const [pageName, setPagename] = useState<string>(
    isEdit ? page?.pageName || "" : ""
  );
  const { isLoading } = useAppSelector((state) => state.organization);
  const { admin: user } = useAppSelector((state) => state.user);
  const [projExist, setProjExit] = useState(false);
  const navigate = useNavigate();
  const pages: IPages[] =
    JSON.parse(localStorage.getItem("pages") || "[]") || [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pageName) {
      Toast({
        type: "error",
        message: "Please enter page name.",
      });
      return;
    }

    if (isEdit && page) {
      const { pageId, userId } = page;
      const index = pages.findIndex(
        (proj) => proj.pageId === pageId && proj.userId === userId
      );

      setProjExit(true);

      localStorage.setItem("isNewsLetter", JSON.stringify(false));
      dispatch(setIsNewsLetter(false));

      localStorage.setItem("initialized", "false");

      handleClose();
      navigate(`/editor/${pageId || ""}`);

      if (index !== -1) {
        // pages[index] = {
        //   ...pages[index],
        //   pageName: pageName.trim(),
        //   updatedDate: new Date().toISOString(),
        // };
        // localStorage.setItem("pages", JSON.stringify(pages));
        // dispatch(setLandingPagesEdit(pages[index]));
      }

      return;
    }

    handleClose();
    dispatch(setToggleStep(1));
    dispatch(setPageName(pageName));
  };

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setPagename(value);

    const index = pages.findIndex(
      (proj) => proj.pageName === value.trim() && proj.userId === user.id
    );

    setProjExit(
      index !== -1 && (isEdit && page?.pageName === value.trim() ? false : true)
    );
  };

  return (
    <GeneralModal
      title={`${isEdit ? "Edit" : "Create"} Page`}
      subTitle="Provide details about your page to start"
      width="600px"
      height="auto"
      handleClose={handleClose}
    >
      <form className="new-org" onSubmit={handleSubmit}>
        <div className="org-modal-inputs">
          <InputField
            handleChange={handleOnChange}
            name={"pageName"}
            classes={""}
            value={pageName}
            placeholder={"Page Name"}
            label={"Page Name"}
            required={true}
          />
        </div>
        <div className="org-modal-btns">
          <div />
          <div className="btns">
            <div className="cancel" onClick={handleClose}>
              Cancel
            </div>
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <button
                type={"submit"}
                disabled={pageName === "" || projExist}
                className="create"
              >
                {`${isEdit ? "Edit" : "Create"} Page`} <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </form>
    </GeneralModal>
  );
};

export default CreateLandingPage;
