import { Editor } from "grapesjs";

const script = function () {
  const navToggle = document.getElementById("nav-toggle");
  if (navToggle)
    navToggle.addEventListener("click", function () {
      const navLinks = document.getElementById("nav-links");
      if (navLinks) navLinks.classList.toggle("hidden");
    });
};

export const headerBlockScript = (
  editor: Editor,
  type: string,
  components: string
) => {
  editor.Components.addType(type, {
    model: {
      defaults: {
        script,
        components,
      },
    },
  });
};
