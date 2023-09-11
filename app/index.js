// import choo
import choo from "choo";
import html from "choo/html";

import filter from "./store/filter.js";

// initialize choo
const app = choo({ hash: true });

app.route("/*", notFound);

function notFound() {
  return html`
    <div>
      <a href="/">
        404 with love ❤ back to top!
      </a>
    </div>
  `;
}

// import a template
import main from "./views/main.js";

app.route("/", main);

// start app
app.mount("#choomount");
