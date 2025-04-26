import { ampBlockMedia1 } from "./media";

const category = "AMP";

export const amp = [
  {
    id: "amp-block-1",
    label: "Carousel",
    media: ampBlockMedia1,
    category,
    content: {
      type: "carousel",
    },
  },
  {
    id: "amp-block-2",
    label: "Image",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-img",
    },
  },
  {
    id: "amp-block-3",
    label: "Accordion",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-accordion",
    },
  },
  {
    id: "amp-block-4",
    label: "Image Lightbox",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-image-lightbox",
    },
  },
  {
    id: "amp-block-5",
    label: "Form",
    media: ampBlockMedia1,
    category,
    content: `<amp-image-lightbox id="lightbox1" layout="nodisplay"></amp-image-lightbox>
<amp-img
  on="tap:lightbox1"
  role="button"
  tabindex="0"
  src="image1.jpg"
  width="200"
  height="100"
></amp-img>`,
  },
  {
    id: "amp-block-6",
    label: "List",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-list",
    },
  },
  {
    id: "amp-block-7",
    label: "Mustache",
    media: ampBlockMedia1,
    category,
    content: `<div>
    <amp-state id="items">
      <script type="application/json">
        []
      </script>
    </amp-state>
    <amp-list layout="fixed-height" height="0" [src]="items" [height]="items.length * 22" single-item items="." binding="no">
      <template type="amp-mustache">
        <div>{{ . }}</div>
      </template>
    </amp-list>
    <button on="tap:AMP.setState({ items: items.splice(items.length, 0, 'item ' + items.length) })">
      Add item
    </button>
  </div>`,
  },
  {
    id: "amp-block-8",
    label: "Pixel",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-pixel",
    },
  },
  {
    id: "amp-block-9",
    label: "Sidebar",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-sidebar",
    },
  },
  {
    id: "amp-block-10",
    label: "Social Share",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-social-share",
    },
  },
  {
    id: "amp-block-11",
    label: "Time Ago",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-timeago",
    },
  },
  {
    id: "amp-block-12",
    label: "Youtube",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-youtube",
    },
  },
  {
    id: "amp-block-13",
    label: "Analytics",
    media: ampBlockMedia1,
    category,
    content: {
      type: "amp-analytics",
    },
  },
];
