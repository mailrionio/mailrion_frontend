/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import GeneralModal from "@/components/GeneralModal";
import Toast from "@/components/Toast";
import { IEmailResultsType } from "@/config";
import { ConvertFileNumberToSize, truncateText } from "@/helpers";
import { setEmailDetails } from "@/redux/features/emailValidationSlice";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
interface props {
  handleclose: () => void;
  // fileSelected: (file: File) => void;
}
export function MultipleEmailVerifier({ handleclose }: props) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File>();
  const [cancelTokenSource, setCancelTokenSource] = useState(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>("idle");
  const { adminToken } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleUpload = async (fileObj: File) => {
    setUploadStatus("ready");

    if (fileObj === undefined) {
      return;
    }

    const formData = new FormData();
    formData.append("excel", fileObj);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source as any);
    try {
      const res = await axios.post(
        "organizations/tools/emails/cleaners",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            setUploadStatus("ready");
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setProgress(percentCompleted);
          },
          cancelToken: source.token,
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${adminToken}`,
          },
        }
      );

      setUploadStatus("done");
      if (res?.status === 200 || res?.status === 201) {
        console.log(res?.data?.message);

        dispatch(setEmailDetails(res.data.message as IEmailResultsType));
        navigate(`/organization/${id}/email-validation/email-details`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle errors appropriately
      setUploadStatus("failed");

      if (
        (error as any)?.response?.data?.message ===
        'Undefined array key "emails"'
      ) {
        Toast({
          type: "error",
          message:
            "The file, must contain a single header called emails, and emails are listed below it for filteration and mx verification",
        });
      } else {
        Toast({
          type: "error",
          message: `Email validation failed: ${
            (error as any)?.response?.data?.message
              ? (error as any).response?.data?.message
              : (error as any)?.response?.data?.message[0]
          }`,
        });
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      if (
        droppedFile.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        Toast({ type: "error", message: "Invalid file type" });
        return;
      }

      setFile(droppedFile);
      handleUpload(droppedFile);
    }
  };

  const handleCancel = () => {
    setFile(undefined);
    setUploadStatus("idle");
    if (cancelTokenSource) {
      (cancelTokenSource as any).cancel("Upload canceled by user");
    }
    Toast({ type: "error", message: "Upload canceled" });
  };
  return (
    <GeneralModal
      title="Multiple Email Verification"
      handleClose={handleclose}
      width={"600px"}
      height={
        uploadStatus === "ready" || uploadStatus === "failed"
          ? "250px"
          : uploadStatus === "idle"
          ? "400px"
          : "400px"
      }
    >
      {file?.name === undefined ? (
        <form className="multiple-email">
          <p>
            Upload a file containing the Email address you want to validate
            <br />
            <span style={{ color: "var(--primary-color)", marginTop: "1rem" }}>
              Note: The file, must contain a single header called emails, and
              emails are listed below it for filteration and mx verification
            </span>
          </p>
          <div
            className="upload__container__file"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <div className="upload__container__file__icon">
              <AiOutlineCloudUpload className="upload_icon" />
            </div>
            <div className="upload__container__file__text">
              <h3>Drag and drop your file here</h3>
              <input
                type="file"
                name="file"
                id="clound_file"
                hidden
                accept=".csv, .xlsx, .xls"
                onChange={handleFileChange}
              />
              <p>or</p>
              <Button
                text="Browse file"
                onClick={() => {
                  document.getElementById("clound_file")?.click();
                }}
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="upload__container__info">
          <div className={`upload__container__info__progress ${uploadStatus}`}>
            <div className="progress-icon">
              {uploadStatus === "idle" || uploadStatus === "ready" ? (
                <i className="fas fa-file"></i>
              ) : uploadStatus === "done" ? (
                <i className="fas fa-check" style={{ color: "#00c853" }}></i>
              ) : (
                <i className="fas fa-times" style={{ color: "red" }}></i>
              )}
            </div>
            <div className="upload-progress-container">
              <div className="upload-progress-bar-container">
                <div
                  className="upload-progress-bar"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: `${
                      uploadStatus === "done"
                        ? "#00c853"
                        : uploadStatus === "failed"
                        ? "red"
                        : ""
                    }`,
                  }}
                ></div>

                <p>{progress}%</p>
              </div>
              <div className="upload-container-file-info">
                <h4>{truncateText(file.name, 30)}</h4>
                <p>{ConvertFileNumberToSize(file.size)}</p>
              </div>
            </div>
          </div>
          {uploadStatus === "failed" && (
            <div
              className="upload-error"
              style={{
                marginTop: "1rem",
              }}
            >
              <p>
                <span style={{ color: "red" }}>Error:</span> Email validation
                failed
              </p>
              <Button
                text="Retry"
                onClick={() => {
                  setFile(undefined);
                  setUploadStatus("idle");
                  setProgress(0);
                }}
              />
            </div>
          )}
          <div className="upload-container-actions">
            {uploadStatus === "ready" && (
              <Button
                text="Cancel"
                className="outline"
                onClick={handleCancel}
              />
            )}
          </div>
          {uploadStatus === "ready" && (
            <p
              style={{
                color: "var(--primary-color)",
                marginTop: "1rem",
                textAlign: "center",
                fontSize: "1rem",
              }}
            >
              Validating emails...
            </p>
          )}
        </div>
      )}
    </GeneralModal>
  );
}
