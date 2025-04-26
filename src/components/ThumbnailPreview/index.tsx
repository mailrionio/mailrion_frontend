import React, { useState } from "react";

interface ThumbnailPreviewProps {
  url: string; // URL of the website to generate a thumbnail for
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({ url }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThumbnail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Assuming the backend API endpoint is `/generate-thumbnail`
      const response = await fetch(`/generate-thumbnail?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch thumbnail");
      }

      const blob = await response.blob(); // Fetch the image as a blob
      const objectUrl = URL.createObjectURL(blob); // Create a local URL for the image
      setThumbnailUrl(objectUrl);
    } catch (err) {
      setError("Could not load thumbnail.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchThumbnail();
  }, [url]);

  return (
    <div style={{ textAlign: "center" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <img
          src={thumbnailUrl || ""}
          alt="Thumbnail Preview"
          style={{
            width: 200,
            height: 150,
            objectFit: "cover",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
      )}
    </div>
  );
};

export default ThumbnailPreview;
