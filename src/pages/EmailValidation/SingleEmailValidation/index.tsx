/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import ButtonSpinner from "@/components/ButtonSpiner";
import GeneralModal from "@/components/GeneralModal";
import InputField from "@/components/InputField";
import Toast from "@/components/Toast";
import { validateEmail } from "@/helpers";
import { ValidateSingleEmail } from "@/redux/features/emailValidationSlice/services";
import { ChangeEvent, useState } from "react";

interface props {
  handleClose: () => void;
}

function SingleEmailValidation({ handleClose }: props) {
  const [singleEmailLoading, setSingleEmailLoading] = useState<boolean>(false);
  const [singleEmailData, setSingleEmailData] = useState<{
    status: string;
    remark: string;
  }>({
    status: "",
    remark: "",
  });
  const [verifyEmail, setVerifyEmail] = useState<string>("");

  const handleValidateSingleEmail = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSingleEmailLoading(true);
    setSingleEmailData({} as any);
    if (!validateEmail(verifyEmail)) {
      console.log("valid email");
      Toast({ type: "error", message: "Invalid email" });
      setSingleEmailLoading(false);
      return;
    }
    const res = await ValidateSingleEmail(verifyEmail);
    if (res?.status === 200 || res?.status === 201) {
      setSingleEmailData({
        status: res?.data?.status,
        remark: res?.data?.message,
      });
      // Toast({ type: "success", message: "Email verified successfully" });
      setVerifyEmail("");
      setSingleEmailLoading(false);
    }
  };

  return (
    <GeneralModal
      title="Single Email Verification"
      handleClose={handleClose}
      width={"450px"}
      height={singleEmailData.status ? "450px" : "350px"}
    >
      <form className="single-email" onSubmit={handleValidateSingleEmail}>
        <h3>Enter email address</h3>
        <InputField
          placeholder="Enter email address"
          type="text"
          name="email"
          label="Email"
          classes="input-field"
          value={verifyEmail}
          required
          handleChange={(e) => setVerifyEmail(e.target.value)}
        />
        {singleEmailLoading ? (
          <ButtonSpinner />
        ) : (
          <Button text="Validate" type="submit" className="mt-2" />
        )}
        {singleEmailData.status && (
          <div className="result">
            <div className="result__item">
              <p>
                Status: <span>{singleEmailData.status}</span>
              </p>
            </div>
            <div className="result__item">
              <p>
                Remark: <span>{singleEmailData.remark}</span>
              </p>
            </div>
          </div>
        )}
      </form>
    </GeneralModal>
  );
}

export default SingleEmailValidation;
