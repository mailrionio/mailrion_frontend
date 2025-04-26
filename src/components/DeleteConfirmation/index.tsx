import Button from "../Button";
import ButtonSpinner from "../ButtonSpiner";
import GeneralModal from "../GeneralModal";
import "./confirmation.scss";

interface props {
  title: string;
  subtitle?: string;
  content: string;
  handleClose: () => void;
  actionBtnClick: () => void;
  isLoading: boolean;
  width: string;
  height: string;
  deleteBtnText?: string;
}
const DeleteConfirmation = ({
  actionBtnClick,
  content,
  handleClose,
  isLoading,
  title,
  subtitle,
  height,
  width,
  deleteBtnText,
}: props) => {
  return (
    <GeneralModal
      title={`  ${title}`}
      width={width}
      height={height}
      handleClose={handleClose}
    >
      <div className="confirmation">
        <div className="confirmation__content">
          <p>{content}</p>
          <h2>{subtitle}</h2>
          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <div className="confirmation__content__btns">
              <Button text="cancel" className="outline" onClick={handleClose} />

              <Button
                text={deleteBtnText || "Delete"}
                onClick={actionBtnClick}
              />
            </div>
          )}
        </div>
      </div>
    </GeneralModal>
  );
};

export default DeleteConfirmation;
