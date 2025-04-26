/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import GeneralModal from "@/components/GeneralModal";
import Toast from "@/components/Toast";
import { truncateText } from "@/helpers";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./upload.scss";

interface props {
  handleClose: () => void;
}
const UploadFile = ({ handleClose }: props) => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>("idle");
  const { adminToken } = useAppSelector((state) => state.user);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  const handleUpload = async (files: any) => {
    if (files === undefined) {
      Toast({ type: "error", message: "Please select a file." });
      return;
    }

    const formData = new FormData();
    formData.append("cloud", files);
    formData.append("folder", "documents");
    const source = axios.CancelToken.source();
    setCancelTokenSource(source as any);
    try {
      await axios.post("/clouds/storages", formData, {
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
      });

      setUploadStatus("done");
      Toast({ type: "success", message: "File uploaded successfully" });
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle errors appropriately
      setUploadStatus("failed");
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
      title={"Upload a file"}
      subTitle="Upload a file to your cloud storage"
      width={"700px"}
      height={"400px"}
      handleClose={handleClose}
    >
      <div className="upload">
        <div className="upload__container">
          {file === undefined ? (
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
          ) : (
            <div className="upload__container__info">
              <div
                className={`upload__container__info__progress ${uploadStatus}`}
              >
                <div className="progress-icon">
                  {uploadStatus === "idle" || uploadStatus === "ready" ? (
                    <i className="fas fa-file"></i>
                  ) : uploadStatus === "done" ? (
                    <i
                      className="fas fa-check"
                      style={{ color: "#00c853" }}
                    ></i>
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
                    <p>{(file.size / (1024 * 1024)).toFixed(2)}mb</p>
                  </div>
                </div>
              </div>
              {uploadStatus === "failed" && (
                <p className="upload-error">Upload failed! Try again</p>
              )}
              <div className="upload-container-actions">
                {uploadStatus === "done" ? (
                  <Button
                    text="Done"
                    onClick={() => {
                      setUploadStatus("done");
                      setFile(undefined);
                      handleClose();
                    }}
                  />
                ) : (
                  <Button
                    text="Cancel"
                    className="outline"
                    onClick={handleCancel}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </GeneralModal>
  );
};

export default UploadFile;
