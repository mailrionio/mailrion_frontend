import {
  newsletterBlockMedia1,
  newsletterBlockMedia10,
  newsletterBlockMedia11,
  newsletterBlockMedia12,
  newsletterBlockMedia2,
  newsletterBlockMedia3,
  newsletterBlockMedia4,
  newsletterBlockMedia5,
  newsletterBlockMedia7,
  newsletterBlockMedia8,
  newsletterBlockMedia9,
} from "./media";

const category = "Newsletter";

export const newsLetter = [
  {
    id: "newsletter-block-1",
    label: "1 Section",
    media: newsletterBlockMedia1,
    category,
    content: {
      type: "1-section",
    },
  },
  {
    id: "newsletter-block-2",
    label: "1/2 Section",
    media: newsletterBlockMedia2,
    category,
    content: {
      type: "1/2-section",
    },
  },
  {
    id: "newsletter-block-3",
    label: "1/3 Section",
    media: newsletterBlockMedia3,
    category,
    content: {
      type: "1/3-section",
    },
  },
  {
    id: "newsletter-block-4",
    label: "3/7 Section",
    media: newsletterBlockMedia4,
    category,
    content: {
      type: "3/7-section",
    },
  },
  {
    id: "newsletter-block-5",
    label: "Button",
    media: newsletterBlockMedia5,
    category,
    content: {
      type: "button",
    },
  },
  {
    id: "newsletter-block-7",
    label: "Divider",
    media: newsletterBlockMedia7,
    category,
    content: {
      type: "divider",
    },
  },
  {
    id: "newsletter-block-8",
    label: "Text Section",
    media: newsletterBlockMedia8,
    category,
    content: {
      type: "text-section",
    },
  },
  {
    id: "newsletter-block-9",
    label: "Image",
    media: newsletterBlockMedia9,
    category,
    content: {
      type: "image",
    },
  },
  {
    id: "newsletter-block-10",
    label: "Quote",
    media: newsletterBlockMedia10,
    category,
    content: {
      type: "quote",
    },
  },
  {
    id: "newsletter-block-11",
    label: "Grid Items",
    media: newsletterBlockMedia11,
    category,
    content: {
      type: "grid-items",
    },
  },
  {
    id: "newsletter-block-12",
    label: "List Items",
    media: newsletterBlockMedia12,
    category,
    content: {
      type: "list-items",
    },
  },
];
