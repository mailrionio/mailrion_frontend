import { Editor } from "grapesjs";
import { compose } from "redux";

export const ampContent = (editor: Editor) => {
  const comps = editor.DomComponents;
  // AMP-Carousel
  comps.addType("carousel", {
    model: {
      defaults: {
        tagName: "amp-carousel",
        attributes: {
          width: "800",
          height: "400",
          layout: "responsive",
          type: "slides",
          on: "slideChange:AMP.setState({currentCat: event.index})",
        },
        components: [
          {
            tagName: "amp-img",
            type: "image",
            attributes: {
              layout: "fill",
              src: "https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg",
              alt: "photo courtesy of Unsplash",
            },
          },
          {
            tagName: "amp-img",
            type: "image",
            attributes: {
              layout: "fill",
              src: "https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg",
              alt: "photo courtesy of Unsplash",
            },
          },
          {
            tagName: "amp-img",
            type: "image",
            attributes: {
              layout: "fill",
              src: "https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg",
              alt: "photo courtesy of Unsplash",
            },
          },
        ],
        traits: [
          {
            type: "text",
            label: "Carousel Id",
            name: "id",
          },
        ],
      },
    },
  });

  // AMP-Img
  comps.addType("amp-img", {
    extend: "image",
    model: {
      defaults: {
        tagName: "amp-img",
        type: "image",
        attributes: {
          layout: "responsive",
          alt: "amp-img",
          width: "800",
          height: "400",
        },
        traits: [
          {
            label: "Id",
            name: "id",
          },
          {
            label: "Alt",
            name: "alt",
          },
        ],
      },
    },
  });

  // AMP-Accordion
  comps.addType("amp-accordion", {
    model: {
      defaults: {
        tagName: "amp-accordion",
        attributes: {
          id: "my-accordion",
          "disable-session-states": true,
        },
        components: [
          {
            tagName: "section",
            components: [
              {
                tagName: "h2",
                type: "text",
                content: "Section 1",
              },
              {
                tagName: "p",
                type: "text",
                content: "Content in section 1.",
              },
            ],
          },
          {
            tagName: "section",
            components: [
              {
                tagName: "h2",
                type: "text",
                content: "Section 2",
              },
              {
                tagName: "p",
                type: "text",
                content: "Content in section 2.",
              },
            ],
          },
        ],
        traits: [
          {
            type: "checkbox",
            label: "Disable Session States",
            name: "disable-session-states",
          },
          {
            label: "Accordion ID",
            name: "id",
          },
        ],
      },
    },
  });

  comps.addType("amp-image-lightbox", {
    model: {
      defaults: {
        type: "default",
        components: [
          {
            tagName: "amp-image-lightbox",
            attributes: {
              id: "lightbox1",
              layout: "nodisplay",
            },
          },
          {
            tagName: "amp-img",
            type: "image",
            attribues: {
              on: "tap:lightbox1",
              role: "button",
              tabindex: "0",
              src: "https://fakeimg.pl/200x100",
              width: "200",
              height: "100",
            },
          },
        ],
      },
    },
  });

  comps.addType("amp-list", {
    model: {
      defaults: {
        tagName: "amp-list",
        attributes: {
          width: "auto",
          height: "140",
          layout: "fixed-height",
          src: "http://localhost:5173/data/data.json",
        },
        components: [
          {
            tagName: "template",
            attributes: { type: "amp-mustache" },
            components: [
              {
                tagName: "div",
                attributes: { class: "image-entry" },
                components: [
                  {
                    tagName: "span",
                    attributes: { class: "image-title" },
                    components: "{{title}}",
                  },
                ],
              },
            ],
          },
          {
            tagName: "div",
            attributes: {
              overflow: true,
              class: "list-overflow",
              style: "background-color:red;",
            },
            content: "See more",
          },
        ],
      },
    },
  });  
}
