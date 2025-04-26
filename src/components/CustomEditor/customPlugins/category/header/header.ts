import {
  headerBlockMedia1,
  headerBlockMedia2,
  headerBlockMedia3,
} from "./media";

const category = "Header";

export const header = [
  {
    id: "header-block-1",
    label: "",
    media: headerBlockMedia1,
    category,
    content: {
      type: "Header1",
    },
  },
  {
    id: "header-block-2",
    label: "",
    media: headerBlockMedia2,
    category,
    content: {
      type: "Header2",
    },
  },
  {
    id: "header-block-3",
    label: "",
    media: headerBlockMedia3,
    category,
    content: {
      type: "Header3",
    },
  },
];
