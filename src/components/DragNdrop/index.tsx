import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./drag-drop.scss";

interface IDragNdropProps {
  onFilesSelected: (files: File[]) => void;
  width?: string;
  height?: string;
  accept?: string;
}

const DragNdrop: React.FC<IDragNdropProps> = ({
  onFilesSelected,
  width,
  height,
  accept,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <section className="drag-drop" style={{ width: width, height: height }}>
      <div
        className={`document-uploader ${
          files.length > 0 ? "upload-box active" : "upload-box"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <>
          <div className="upload-info">
            <AiOutlineCloudUpload />
            <div>
              <p>Drag and drop your files here</p>
              <p>
                Limit 15MB per file. Supported files:{" "}
                <b>{accept?.toUpperCase()}</b>
              </p>
            </div>
          </div>
          <input
            type="file"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept={accept}
            multiple
          />
          <p>OR</p>
          <label htmlFor="browse" className="browse-btn">
            Browse files
          </label>
        </>

        {files.length > 0 && (
          <div className="file-list">
            <div className="file-list__container">
              {files.map((file, index) => (
                <div className="file-item" key={index}>
                  <div className="file-info">
                    <p>{file.name}</p>
                    {/* <p>{file.type}</p> */}
                  </div>
                  <div className="file-actions">
                    <MdClear onClick={() => handleRemoveFile(index)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="success-file">
            <AiOutlineCheckCircle
              style={{ color: "#6DC24B", marginRight: 1 }}
            />
            <p>{files.length} file(s) selected</p>
          </div>
        )}
      </div>
    </section>
  );
};

export const SelectSingleFile: React.FC<{
  onFileSelected: (file: File) => void;
  accept: string;
}> = ({ onFileSelected, accept }) => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] as File;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFile = droppedFiles[0];
      setFile(newFile);
    }
  };

  useEffect(() => {
    if (file) {
      onFileSelected(file);
    }
  }, [file, onFileSelected]);

  return (
    <section className="drag-drop">
      <div
        className={`document-uploader ${
          file ? "upload-box active" : "upload-box"
        }`}
      >
        {file ? (
          <div
            className="file-list"
            style={{
              height: "100%",
            }}
          >
            <div className="file-list__container">
              <div className="file-item">
                <div className="file-info">
                  <p>{file.name}</p>
                </div>
                <div
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => setFile(undefined)}
                >
                  X
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className="upload-info"
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
            >
              <AiOutlineCloudUpload />
              <div>
                <p>Drag and drop your file here</p>
                <p>
                  Limit 15MB per file. Supported file:{" "}
                  <b style={{ textTransform: "uppercase" }}>{accept}</b>
                </p>
              </div>
            </div>
            <input
              type="file"
              hidden
              id="select_single"
              onChange={handleFileChange}
              accept={accept}
            />
            <p>OR</p>
            <label htmlFor="select_single" className="browse-btn">
              Browse file
            </label>
          </>
        )}
      </div>
    </section>
  );
};

export default DragNdrop;
