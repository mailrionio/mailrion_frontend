import { Editor } from "grapesjs";

export const newsLetterContent = (editor: Editor) => {
  // 1 Section
  editor.DomComponents.addType("1-section", {
    model: {
      defaults: {
        tagName: "table",
        type: "table",
        components: [
          {
            tagName: "tbody",
            type: "tbody",
            components: [
              {
                tagName: "tr",
                type: "row",
                components: [
                  {
                    tagName: "td",
                    type: "cell",
                    style: {
                      "font-size": "16px",
                      "font-weight": 400,
                      "vertical-align": "middle",
                      color: "rgb(0, 0, 0)",
                      margin: 0,
                    },
                  },
                ],
              },
            ],
          },
        ],
        style: {
          "border-collapse": "separate",
          "border-spacing": "3px",
          width: "100%",
          height: "150px",
          margin: "0 auto 10px auto",
        },
        traits: [
          {
            type: "text",
            label: "Table ID",
            name: "id",
          },
        ],
      },
    },
  });

  // 1/2 Section
  editor.DomComponents.addType("1/2-section", {
    model: {
      defaults: {
        tagName: "table",
        type: "table",
        components: [
          {
            tagName: "tbody",
            type: "tbody",
            components: [
              {
                tagName: "tr",
                type: "row",
                components: [
                  {
                    tagName: "td",
                    type: "cell",
                    style: {
                      "font-size": "16px",
                      "font-weight": 400,
                      "vertical-align": "middle",
                      color: "rgb(0, 0, 0)",
                      margin: 0,
                    },
                  },
                  {
                    tagName: "td",
                    type: "cell",
                    style: {
                      "font-size": "16px",
                      "font-weight": 400,
                      "vertical-align": "middle",
                      color: "rgb(0, 0, 0)",
                      margin: 0,
                    },
                  },
                ],
              },
            ],
          },
        ],
        style: {
          "border-collapse": "separate",
          "border-spacing": "3px",
          width: "100%",
          height: "150px",
          margin: "0 auto 10px auto",
        },
        traits: [
          {
            type: "text",
            label: "Table ID",
            name: "id",
          },
        ],
      },
    },
  });

  // 1/3 Section
  editor.DomComponents.addType("1/3-section", {
    model: {
      defaults: {
        tagName: "table",
        type: "table",
        components: [
          {
            tagName: "tbody",
            type: "tbody",
            components: [
              {
                tagName: "tr",
                type: "row",
                components: [
                  {
                    tagName: "td",
                    type: "cell",
                    style: {
                      "font-size": "16px",
                      "font-weight": 400,
                      "vertical-align": "middle",
                      color: "rgb(0, 0, 0)",
                      margin: 0,
                    },
                  },
                  {
                    tagName: "td",
                    type: "cell",
                    style: {
                      "font-size": "16px",
                      "font-weight": 400,
                      "vertical-align": "middle",
                      color: "rgb(0, 0, 0)",
                      margin: 0,
                    },
                  },
                  {
                    tagName: "td",
                    type: "cell",
                    style: {
                      "font-size": "16px",
                      "font-weight": 400,
                      "vertical-align": "middle",
                      color: "rgb(0, 0, 0)",
                      margin: 0,
                    },
                  },
                ],
              },
            ],
          },
        ],
        style: {
          "border-collapse": "separate",
          "border-spacing": "3px",
          width: "100%",
          height: "150px",
          margin: "0 auto 10px auto",
        },
        traits: [
          {
            type: "text",
            label: "Table ID",
            name: "id",
          },
        ],
      },
    },
  });

  // 3/7 Section
  editor.DomComponents.addType("3/7-section", {
    model: {
      defaults: {
        tagName: "table",
        type: "table",
        components: [
          {
            tagName: "tbody",
            type: "tbody",
            components: [
              {
                tagName: "tr",
                type: "row",
                components: [
                  {
                    tagName: "td",
                    type: "cell",
                    style: {
                      "font-size": "16px",
                      "font-weight": 400,
                      "vertical-align": "middle",
                      color: "rgb(0, 0, 0)",
                      margin: 0,
                      padding: 0,
                      width: "30%",
                    },
                  },
                  {
                    tagName: "td",
                    type: "cell",
                    style: {
                      "font-size": "16px",
                      "font-weight": 400,
                      "vertical-align": "middle",
                      color: "rgb(0, 0, 0)",
                      margin: 0,
                      padding: 0,
                      width: "70%",
                    },
                  },
                ],
              },
            ],
          },
        ],
        style: {
          "border-collapse": "separate",
          "border-spacing": "3px",
          width: "100%",
          height: "150px",
          margin: "0 auto 10px auto",
        },
        traits: [
          {
            type: "text",
            label: "Table ID",
            name: "id",
          },
        ],
      },
    },
  });

  // Button
  editor.DomComponents.addType("button", {
    model: {
      defaults: {
        tagName: "a",
        type: "link",
        classes: ["button"],
        components: "Button",
        traits: [
          {
            type: "text",
            label: "Link",
            name: "href",
          },
          {
            type: "text",
            label: "Text",
            name: "content",
          },
        ],
      },
    },
  });

  // Text
  editor.DomComponents.addType("insert", {
    model: {
      defaults: {
        tagName: "div",
        type: "text",
        components: "Insert your text here",
        style: {
          padding: "10px",
        },
        traits: [
          {
            type: "text",
            label: "Id",
            name: "id",
          },
          {
            type: "text",
            label: "Title",
            name: "title",
          },
        ],
      },
    },
  });

  // Divider
  editor.DomComponents.addType("divider", {
    model: {
      defaults: {
        tagName: "table",
        type: "table",
        components: [
          {
            tagName: "tbody",
            type: "tbody",
            components: [
              {
                tagName: "tr",
                type: "row",
                components: [
                  {
                    tagName: "td",
                    type: "cell",
                    style: {
                      "background-color": "rgba(0, 0, 0, 0.1)",
                      height: "1px",
                    },
                  },
                ],
              },
            ],
          },
        ],
        style: {
          "border-collapse": "separate",
          "border-spacing": "3px",
          width: "100%",
          "margin-top": "10px",
          "margin-bottom": "10px",
        },
        traits: [
          {
            type: "text",
            label: "Divider ID",
            name: "id",
          },
          {
            label: "Title",
            name: "title",
          },
        ],
      },
    },
  });

  // Text Section
  editor.DomComponents.addType("text-section", {
    model: {
      defaults: {
        components: [
          {
            tagName: "h1",
            type: "text",
            attributes: { class: "heading" },
            components: "Insert Title Here",
            style: {
              "font-size": "2rem",
              "font-weight": "bold",
            },
            traits: [
              {
                label: "Id",
                name: "id",
              },
              {
                label: "Title",
                name: "title",
              },
            ],
          },
          {
            tagName: "p",
            type: "text",
            attributes: { class: "paragraph" },
            components:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            traits: [
              {
                label: "Id",
                name: "id",
              },
              {
                label: "Title",
                name: "title",
              },
            ],
          },
        ],
      },
    },
  });

  // Image
  editor.DomComponents.addType("image", {
    model: {
      defaults: {
        tagName: "img",
        type: "image",
        attributes: { class: "gjs-plh-image" },
        style: {
          color: "#000000",
        },
        traits: [
          {
            label: "Alt",
            name: "alt",
          },
        ],
      },
    },
  });

  // Quote
  editor.DomComponents.addType("quote", {
    extend: "text",
    model: {
      defaults: {
        tagName: "blockquote",
        type: "text",
        attributes: { class: "quote" },
        style: {
          display: "block",
          "margin-block-start": "1em",
          "margin-block-end": "1em",
          "margin-inline-start": "40px",
          "margin-inline-end": "40px",
          "unicode-bidi": "isolate",
        },
        components:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit",
      },
    },
  });

  // Grid Items
  editor.DomComponents.addType("grid-items", {
    model: {
      defaults: {
        tagName: "table",
        type: "table",
        components: [
          {
            tagName: "tbody",
            type: "tbody",
            components: [
              {
                tagName: "tr",
                type: "row",
                components: [
                  ...["l", "r"].map((dir) => ({
                    tagName: "td",
                    type: "cell",
                    attributes: {
                      class: `grid-item-cell2-${dir}`,
                    },
                    components: [
                      {
                        tagName: "table",
                        type: "table",
                        attributes: { class: "grid-item-card" },
                        style: {
                          "border-collapse": "separate",
                          "border-spacing": "3px",
                          width: "100%",
                          margin: "0 auto 10px auto",
                        },
                        components: [
                          {
                            tagName: "tbody",
                            type: "tbody",
                            components: [
                              {
                                tagName: "tr",
                                type: "row",
                                components: [
                                  {
                                    tagName: "td",
                                    type: "cell",
                                    attributes: {
                                      class: "grid-item-card-cell",
                                    },
                                    components: [
                                      {
                                        tagName: "img",
                                        type: "image",
                                        attributes: {
                                          class: "grid-item-image",
                                          alt: "Image",
                                          src: "https://via.placeholder.com/250x150/78c5d6/fff/",
                                        },
                                        traits: [{ label: "Alt", name: "alt" }],
                                      },
                                      {
                                        tagName: "table",
                                        type: "table",
                                        attributes: {
                                          class: "grid-item-card-body",
                                        },
                                        style: {
                                          "border-collapse": "separate",
                                          "border-spacing": "3px",
                                          width: "100%",
                                          margin: "0 auto 10px auto",
                                        },
                                        components: [
                                          {
                                            tagName: "tbody",
                                            type: "tbody",
                                            components: [
                                              {
                                                tagName: "tr",
                                                type: "row",
                                                components: [
                                                  {
                                                    tagName: "td",
                                                    type: "cell",
                                                    attributes: {
                                                      class:
                                                        "grid-item-card-content",
                                                    },
                                                    components: [
                                                      {
                                                        tagName: "h1",
                                                        type: "text",
                                                        attributes: {
                                                          class: "card-title",
                                                        },
                                                        style: {
                                                          display: "block",
                                                          "font-size": "2em",
                                                          "margin-block-start":
                                                            "0.67em",
                                                          "margin-block-end":
                                                            "0.67em",
                                                          "margin-inline-start":
                                                            "0px",
                                                          "margin-inline-end":
                                                            "0px",
                                                          "font-weight": "bold",
                                                          "unicode-bidi":
                                                            "isolate",
                                                        },
                                                        components:
                                                          "Title Here",
                                                      },
                                                      {
                                                        tagName: "p",
                                                        type: "text",
                                                        attributes: {
                                                          class: "card-text",
                                                        },
                                                        components: `Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt
                       `,
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  })),
                ],
              },
            ],
          },
        ],
        style: {
          "border-collapse": "separate",
          "border-spacing": "3px",
          width: "100%",
          margin: "0 auto 10px auto",
        },
        traits: [
          {
            type: "text",
            label: "Table ID",
            name: "id",
          },
        ],
      },
    },
  });

  // List Items
  editor.DomComponents.addType("list-items", {
    model: {
      defaults: {
        tagName: "table",
        type: "table",
        components: [
          {
            tagName: "tbody",
            type: "tbody",
            components: [
              {
                tagName: "tr",
                type: "row",
                components: [
                  {
                    tagName: "td",
                    type: "cell",
                    attributes: {
                      class: `list-item-cell`,
                    },
                    components: [
                      {
                        tagName: "table",
                        type: "table",
                        attributes: { class: "list-item-content" },
                        style: {
                          "border-collapse": "separate",
                          "border-spacing": "3px",
                          width: "100%",
                          margin: "0 auto 10px auto",
                        },
                        components: [
                          {
                            tagName: "tbody",
                            type: "tbody",
                            components: [
                              {
                                tagName: "tr",
                                type: "row",
                                attributes: { class: "list-item-row" },
                                components: [
                                  {
                                    tagName: "td",
                                    type: "cell",
                                    attributes: {
                                      class: "list-cell-left",
                                    },
                                    components: [
                                      {
                                        tagName: "img",
                                        type: "image",
                                        attributes: {
                                          class: "list-item-image",
                                          alt: "Image",
                                          src: "https://via.placeholder.com/150/78c5d6/fff",
                                        },
                                        traits: [{ label: "Alt", name: "alt" }],
                                      },
                                    ],
                                  },
                                  {
                                    tagName: "td",
                                    type: "cell",
                                    attributes: {
                                      class: "list-cell-right",
                                    },
                                    components: [
                                      {
                                        tagName: "h1",
                                        type: "text",
                                        attributes: {
                                          class: "card-title",
                                        },
                                        style: {
                                          display: "block",
                                          "font-size": "2em",
                                          "margin-block-start": "0.67em",
                                          "margin-block-end": "0.67em",
                                          "margin-inline-start": "0px",
                                          "margin-inline-end": "0px",
                                          "font-weight": "bold",
                                          "unicode-bidi": "isolate",
                                        },
                                        components: "Title Here",
                                      },
                                      {
                                        tagName: "p",
                                        type: "text",
                                        attributes: {
                                          class: "card-text",
                                        },
                                        components: `Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
       `,
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        style: {
          "border-collapse": "separate",
          "border-spacing": "3px",
          "margin-bottom": "10px",
        },
        traits: [
          {
            type: "text",
            label: "Table ID",
            name: "id",
          },
        ],
      },
    },
  });
};
