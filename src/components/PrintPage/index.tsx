import { useEffect } from "react";

import "./print.scss"; // Import the print styles#

interface PrintPageProps {
  content: any;
}

const PrintPage = ({ content }: PrintPageProps) => {
  useEffect(() => {
    // Apply print styles when component mounts for printing
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "./print.scss"; // Path to your print.scss file
    link.media = "print";
    document.head.appendChild(link);

    // Clean up the link when component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      className="printable-content"
      // dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PrintPage;
