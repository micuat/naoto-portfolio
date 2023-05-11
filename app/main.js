// import choo's template helper
const html = require("choo/html");
const filter = require("./filter.js");

// export module
module.exports = function(state, emit) {
  emit("DOMTitleChange", `Works: Naoto Hieda`);


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
      <div class="clearer"></div>
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
  // console.log(state.schedule.length, "entries")
  const contents = filter(state.schedule, state.filter).map(e => e.dom);//schedule(state.schedule, state.filter);
  return html`
    <div>
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

            <div>
              Filter by
              <div class="type">${filters}</div>
            </div>
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
