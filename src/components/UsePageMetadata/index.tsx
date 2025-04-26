import { useEffect } from "react";

interface PageMetadata {
  title: string;
  description: string;
}

const usePageMetadata = (metadata: PageMetadata) => {
  useEffect(() => {
    document.title = metadata.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", metadata.description);
    } else {
      const newDescriptionTag = document.createElement("meta");
      newDescriptionTag.name = "description";
      newDescriptionTag.content = metadata.description;
      document.head.appendChild(newDescriptionTag);
    }
  }, [metadata]);
};

export default usePageMetadata;
