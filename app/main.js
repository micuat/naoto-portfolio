import html from "choo/html";
import { css } from "@emotion/css";

import filter from "./filter.js";

const mainCss = css`
#main {
  display: flex;
  width: 100vw;
  background-color: white;

  #container {
    width: 100%;
    display: inline-block;
    margin-bottom: 100px;

    header {
      max-width: 700px;
      background-color: white;
      padding: 30px 10px 30px 10px;
      margin: 20px auto 200px auto;
      
      h1 {
        text-align: center;
      }
      @media only screen and (max-width: 600px) {
        h1 {
        font-size: 20pt;
        }
      }

      p {
        text-align: justify;
      }
      p.note {
        text-align: justify;
        font-size: 12pt;
      }
      @media only screen and (max-width: 600px) {
        p {
          font-size: 12pt;
        }
        p.note {
          font-size: 10pt;
        }
      }
    }
  }
}
`;

const filterCss = css`
div {
  font-size: 0.75em;
  p {
    margin-right: 0.3em;
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    white-space: pre;
    float: left;
    background-color: #5ef177;
    color: #000;
    padding: 0.2em;
    border: solid rgba(255, 255, 255, 0);
  }

  p.year {
    background-color: cornflowerblue;
  }

  .selected {
    border: solid rgba(0, 0, 0, 1);
  }
}
`;

// export module
export default function(state, emit) {
  emit("DOMTitleChange", `Works: Naoto Hieda`);

  let filterDom;
  {
    const filters = [];
    if (state.filter === undefined) {
      state.filter = { tag: "all", year: "all time" };
      if (state.query.tag !== undefined) {
        state.filter.tag = state.query.tag;
      }
      if (state.query.year !== undefined) {
        state.filter.year = state.query.year;
      }
    }

    for (const t of state.types) {
      const selected =
        state.filter.tag == undefined
          ? ""
          : state.filter.tag == t.t
          ? "selected"
          : "";
      filters.push(
        html`
          <p onclick="${filterTag}" class="${t.t} ${selected}">${t.t}</p>
        `
      );
    }

    filters.push(
      html`
        <div class=${ css`clear: both;` }></div>
      `
    );

    const filtersY = [];
    for (const t of [
      "all time",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014"
    ]) {
      const selected =
        state.filter.year == undefined
          ? ""
          : state.filter.year == t
          ? "selected"
          : "";
      filters.push(
        html`
          <p onclick="${filterYear}" class="${t} ${selected} year">${t}</p>
        `
      );
    }
    
    filterDom = html`
    <div class=${ filterCss }>
      Filter by
      <div>${filters}</div>
    </div>`;
  }

  const contents = filter(state.schedule, state.filter).map(e => e.dom);

  return html`
    <div class=${ mainCss }>
      <div id="main">
        <div id="container">
          <header>
            <h1>Works: Naoto Hieda</h1>
            <p>
              <a href="https://naotohieda.com">Naoto Hieda</a> (1990, Japan) is
              one of the most important figures in the field of the
              <a href="https://best-practices.glitch.me/"
                >Best Practices in Contemporary Dance</a
              >
              and has been taking a crucial role in the
              <a href="https://bestchat.glitch.me/">Best Practices Chat</a>
              since 2020. This exhibition is an attempt not only to exhibit the
              important works by Hieda, but also to show early works and
              sketches to unveil the creativity of Hieda.
            </p>
            <p class="note">
              The exhibition is curated by Naoto Hieda and hosted by glitch. Design by <a href="https://glitches.me/" target="_blank">glitches.me</a>.
              Note that some works do not show full credits not because of
              disrespect but Naoto being sloppy. Unlike museum captions, the
              year is not the year of production but that of exhibition.
            </p>

            ${ filterDom }
          </header>

          ${contents}
        </div>
      </div>
    </div>
  `;

  // https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
  function UpdateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
      hash;

    if (re.test(url)) {
      if (typeof value !== "undefined" && value !== null) {
        return url.replace(re, "$1" + key + "=" + value + "$2$3");
      } else {
        hash = url.split("#");
        url = hash[0].replace(re, "$1$3").replace(/(&|\?)$/, "");
        if (typeof hash[1] !== "undefined" && hash[1] !== null) {
          url += "#" + hash[1];
        }
        return url;
      }
    } else {
      if (typeof value !== "undefined" && value !== null) {
        var separator = url.indexOf("?") !== -1 ? "&" : "?";
        hash = url.split("#");
        url = hash[0] + separator + key + "=" + value;
        if (typeof hash[1] !== "undefined" && hash[1] !== null) {
          url += "#" + hash[1];
        }
        return url;
      } else {
        return url;
      }
    }
  }
  function filterTag(e) {
    const tag = e.target.innerText;
    if(state.filter.tag === tag) return;
    state.filter.tag = tag;
    const url = UpdateQueryString("tag", tag);
    history.pushState(null, "", url);
    emit("render");
  }
  function filterYear(e) {
    // console.log(e.target.innerText);
    const year = e.target.innerText;
    if(state.filter.year === year) return;
    state.filter.year = year;
    const url = UpdateQueryString("year", year);
    history.pushState(null, "", url);
    emit("render");
  }
};
