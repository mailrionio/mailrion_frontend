import { newsletterBlockMedia2 } from "./category/newsletter/media";
import { newsLetterContent } from "./category/newsletter/content";
import { headerBlockScript } from "./category/header/scripts";
import { newsLetter } from "./category/newsletter";
import { header } from "./category/header/header";
import { footer } from "./category/footer/footer";
import {
  headerBlockContent1,
  headerBlockContent2,
  headerBlockContent3,
} from "./category/header/content";
import { Editor } from "grapesjs";

export const customPlugins = (editor: Editor, opts = {}) => {
  headerBlockScript(editor, "Header1", headerBlockContent1);
  headerBlockScript(editor, "Header2", headerBlockContent2);
  headerBlockScript(editor, "Header3", headerBlockContent3);

  for (const props of header) {
    const { id, label, category, media, content } = props;
    editor.BlockManager.add(id, {
      label,
      category,
      media,
      content,
    });
  }

  for (const props of footer) {
    const { id, label, category, media, content } = props;
    editor.BlockManager.add(id, {
      label,
      category,
      media,
      content,
    });
  }

  // Newsletter Category
  newsLetterContent(editor);

  for (const props of newsLetter) {
    const { id, label, category, media, content } = props;
    editor.BlockManager.add(id, {
      label,
      category,
      media,
      content,
    });
  }

  // Basic Category - Flexbox
  editor.DomComponents.addType("flexbox", {
    model: {
      defaults: {
        tagName: "div",
        attributes: { class: "flex-container" },
        components: Array.from({ length: 2 }).map(() => ({
          tagName: "div",
          style: {
            width: "100%",
            height: "100px",
            "font-size": "18px",
          },
        })),
        style: {
          display: "flex",
          "flex-wrap": "nowrap",
          padding: "5px",
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
    },
  });

  editor.BlockManager.add("basic-block-11", {
    label: "Flexbox",
    category: "Basic",
    media: newsletterBlockMedia2,
    content: {
      type: "flexbox",
    },
  });

  // AMP Category
  // ampContent(editor);

  // for (const props of amp) {
  //   const { id, label, category, media, content } = props;
  //   editor.BlockManager.add(id, {
  //     label,
  //     category,
  //     media,
  //     content,
  //   });
  // }
};
