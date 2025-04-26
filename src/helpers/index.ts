/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import Toast from "@/components/Toast";

export const getCurrentDate = (): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const currentDate = new Date().toLocaleDateString(undefined, options);

  return currentDate;
};

export const extractFirstNameUptoSpace = (name: string) => {
  return name && name.substring(0, name.indexOf(" "));
};

export function getFirstLetters(name: string): string {
  const names = name && name.split(" ");
  const firstInitial = (names?.[0]?.charAt(0) || "").toUpperCase();
  const lastInitial =
    names?.length > 1
      ? (names[names?.length - 1]?.charAt(0) || "").toUpperCase()
      : "";
  const initials = `${firstInitial}${lastInitial}`;

  return initials.length >= 2 ? initials.slice(0, 2) : initials.padEnd(2, " ");
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  const truncatedText =
    text.length < maxLength ? text : `${text.substring(0, maxLength - 3)}...`;
  return truncatedText;
}

export const getURLPaths = () => {
  const pathname = window.location.pathname.split("/").filter(Boolean).pop();
  const search = window.location.search;
  return { pathname: `/${pathname}`, search };
};

export const getTimeOfDay = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Morning";
  } else if (currentHour >= 12 && currentHour < 16) {
    return "Afternoon";
  } else {
    return "Evening";
  }
};

export const calculatePercentage = (value: number, total: number) => {
  return ((value / total) * 100).toFixed(2);
};

export const formatDateAndTime = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export function formatTimeOrDate(dateString: string) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();
  const diffMinutes = Math.floor(timeDiff / (1000 * 60));
  const diffHours = Math.floor(timeDiff / (1000 * 60 * 60));

  if (diffHours < 24) {
    if (diffMinutes === 1 || diffMinutes === 0) {
      return "Just now";
    }
    if (diffMinutes < 60) {
      return diffMinutes + " mins ago";
    } else {
      return diffHours + " hrs ago";
    }
  } else {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options as any);
  }
}

export function dateWithTime(dateString: string) {
  const date = new Date(dateString || Date.now());
  const now = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  // Calculate the time difference in hours and minutes
  const timeDiff = Math.abs(now.getTime() - date.getTime());
  const diffMinutes = Math.floor(timeDiff / (1000 * 60));
  const diffHours = Math.floor(timeDiff / (1000 * 60 * 60));

  // Construct the final output based on the time difference
  if (diffHours < 24) {
    if (diffMinutes < 60) {
      return `${formattedDate} (${diffMinutes} minutes ago)`;
    } else {
      return `${formattedDate} (${diffHours} hours ago)`;
    }
  } else {
    // Calculate the difference in days between the date and current date
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return `${formattedDate} (${
      diffDays === 1 ? "1 day ago" : `${diffDays} days ago`
    })`;
  }
}

export function extractEmail(senderEmail: string) {
  const emailRegex = /(?<=<)[^>]+/; // Regex pattern to extract the email between < and >

  // skip the email if it is not in the format <email>
  if (!senderEmail.includes("<")) {
    return senderEmail;
  }
  const extractedEmail = senderEmail?.match(emailRegex)?.[0];
  return extractedEmail;
}

// extract just the name from the email
export function extractName(senderEmail: string) {
  // Regex pattern to extract the name between space and < or @
  const nameRegex = /(^[^<@]+)/;
  const extractedName = senderEmail?.match(nameRegex)?.[0];
  return extractedName;
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const handleCopy = (value: string) => {
  try {
    navigator.clipboard.writeText(value);
    Toast({ type: "success", message: "Copied to clipboard" });
  } catch (error) {
    console.error("Copy failed:", error);
  }
};

export function sortData<T>(
  data: T[],
  sortBy: (item: T) => Date,
  targetDate: Date
): T[] {
  const sortedData =
    data &&
    data.sort((a, b) => {
      const dateA = sortBy(a);
      const dateB = sortBy(b);
      const diffA = Math.abs(dateA.getTime() - targetDate.getTime());
      const diffB = Math.abs(dateB.getTime() - targetDate.getTime());
      return diffA - diffB;
    });

  return sortedData;
}

export function searchData<T>(data: T[], keyword: string, searchTerm: keyof T) {
  const lowercaseKeyword = keyword.toLowerCase();

  const searchedData =
    data &&
    data.filter((item) => {
      // Check if the searchTerm is a valid property of the item
      if ((item as any).hasOwnProperty(searchTerm)) {
        const fieldValue = String(item[searchTerm]).toLowerCase();

        return fieldValue.includes(lowercaseKeyword);
      }
      return false;
    });

  return searchedData;
}

export const useQueryParams = (query: string): string | null => {
  const searchParams = new URLSearchParams(window.location.search);
  const queryValue = searchParams.get(query);

  return queryValue;
};

export const setQueryParams = (query: string, value: string): void => {
  const searchParams = new URLSearchParams(window.location.search);
  if (!value) {
    searchParams.delete(query);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );
    return;
  }
  searchParams.set(query, value);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${searchParams.toString()}`
  );
};

export const sanitizeHTMLImages = (html: any): any => {
  // Filter out images with invalid file extensions
  return html.replace(
    /<img[^>]+src="([^">]+)"/g,
    (match: any, capture: any) => {
      const fileExtension = capture.split(".").pop();
      console.log(fileExtension);

      if (
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "png" ||
        fileExtension === "gif" ||
        fileExtension === "svg" ||
        fileExtension === "webp" ||
        fileExtension === "bmp" ||
        fileExtension === "ico" ||
        fileExtension === "tiff"
      ) {
        return match;
      } else {
        return "";
      }
    }
  );
};

export function convertResponseToEntity<T extends { attributes?: any }, U>(
  data: T[],
  desiredTypesToReturn: (keyof T & keyof T["attributes"])[]
): U[] {
  return (
    data &&
    data.map((item) => {
      return desiredTypesToReturn.reduce(
        (acc, key) => ({
          ...acc,
          [key]: key === "id" ? item[key] : item?.attributes?.[key],
        }),
        {} as U
      );
    })
  );
}

export const ConvertFileNumberToSize = (size: number) => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const convertedSize = (size / Math.pow(1024, i)).toFixed(2);
  return `${convertedSize} ${["B", "KB", "MB", "GB", "TB"][i]}`;
};

export const baseURL = (): string => {
  try {
    // Automatically use the current window URL
    const url = window.location.href;
    const parsedUrl = new URL(url);

    // Split the pathname into parts
    const parts = parsedUrl.pathname.split("/");
    // Filter out empty strings in case the URL has a leading or trailing slash
    const filteredParts = parts.filter((part) => part.length > 0);

    // Assuming the structure is always /organization/Stockrush/...
    if (filteredParts.length >= 2) {
      // Return the 'organization/Stockrush' part by joining the first two parts
      return filteredParts.slice(0, 2).join("/");
    }
    throw new Error("URL does not contain enough parts to extract base URL");
  } catch (error) {
    console.error("Failed to extract base URL:", error);
    return ""; // Return empty string or handle the error as needed
  }
};

// export const detectVideoType = (url: string) => {
// 	if (url.match(/\.(mp4|webm|ogg|mov|avi)$/)) {
// 		return 'video-link';
// 	} else return 'unknown';
// };

/**
 * Determines the type of file based on the URL extension.
 *
 * @param url - The URL of the file.
 * @returns - The type of the file (image, video, specific file type, or 'file').
 */
export const getFileTypeFromURL = (url: string): string => {
  // Define arrays of possible file types categorized by type.
  const imageTypes = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "svg",
    "webp",
    "bmp",
    "ico",
    "tiff",
  ];
  const videoTypes = ["mp4", "avi", "mkv", "mov"];
  const documentTypes = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "csv",
  ];
  const audioTypes = ["mp3", "wav", "flac", "aac", "ogg", "wma"];

  // Split the URL to get the file name and its extension.
  const urlParts = url?.split("/") || [];
  const fileName = urlParts[urlParts?.length - 1];
  const fileExtension = fileName?.split(".")?.pop() as string;

  // Determine the file type based on its extension.
  if (imageTypes.includes(fileExtension)) {
    return "image";
  } else if (videoTypes.includes(fileExtension)) {
    return "video";
  } else if (documentTypes.includes(fileExtension)) {
    return fileExtension;
  } else if (audioTypes.includes(fileExtension)) {
    return "audio";
  } else {
    return "file";
  }
};

// Function to transform text to title case
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Helper function to transform text content within a node
const transformTextNode = (
  node: Node,
  transformFn: (text: string) => string
) => {
  if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
    // Transform the text in the text node
    node.nodeValue = transformFn(node.nodeValue);
  } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
    // Recursively apply the transformation to child nodes
    for (let i = 0; i < node.childNodes.length; i++) {
      transformTextNode(node.childNodes[i], transformFn);
    }
  }
};

// Helper function to preserve highlight and transform text
export const transformSelection = (
  rte: any,
  transformFn: (text: string) => string
): void => {
  const selection = rte.selection(); // Get the editor's internal selection

  if (selection && selection.rangeCount > 0) {
    // Ensure a valid selection with ranges
    const range = selection.getRangeAt(0); // Get the range of selected text

    // Clone the selected HTML content
    const selectedContent = range.cloneContents();
    const wrapper = document.createElement("div");
    wrapper.appendChild(selectedContent); // Wrap the selected content in a temporary div

    // Recursively transform the text nodes within the wrapper
    transformTextNode(wrapper, transformFn);

    // Remove the original selection and insert the transformed content
    range.deleteContents();
    const frag = document.createDocumentFragment();
    while (wrapper.firstChild) {
      frag.appendChild(wrapper.firstChild);
    }
    range.insertNode(frag); // Insert the modified content back into the editor
  } else {
    console.warn("No valid selection found.");
  }
};

export const genRandomNum = (): number => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

export const formatDate = (date: Date | string) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
};

export const titleCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const stripHtmlTags = (input: string): string => {
  const result = input.replace(/<\/?[^>]+(>|$)/g, "");
  return truncateText(result, 200);
};

export const inlineStyles = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const styles = Array.from(doc.querySelectorAll("style"));
  styles.forEach((style) => {
    const cssRules = style.sheet?.cssRules || [];
    Array.from(cssRules).forEach((rule) => {
      if (rule.type === CSSRule.STYLE_RULE) {
        const styleRule = rule as CSSStyleRule;
        const elements = doc.querySelectorAll(styleRule.selectorText);
        elements.forEach((element) => {
          const currentStyle = element.getAttribute("style") || "";
          element.setAttribute(
            "style",
            `${currentStyle} ${styleRule.style.cssText}`
          );
        });
      }
    });
  });

  return doc.documentElement.outerHTML;
}


