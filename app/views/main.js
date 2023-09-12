import html from "choo/html";
import { css } from "@emotion/css";

const filter = (list, filter) => {
  const newList = [];
  for(const l of list) {
    if (filter != undefined) {
      if (filter.tag != undefined) {
        if (filter.tag != "all" && l.type.indexOf(filter.tag) < 0) continue;
      }
      if (filter.year != undefined) {
        if (filter.year != "all" && l.dateYear != filter.year) continue;
      }
    }
    newList.push(l);
  }
  return newList;
};

const elementCss = css`
section {
  margin: 150px auto 150px auto;
}

.caption-holder {
  max-width: 700px;
  box-sizing:content-box;
  background-color: white;
  margin: 80px auto 200px auto;
  .caption {
    margin: 80px auto 200px auto;
    width: 90%;
    box-shadow: 0 0.5px 2px #000;
    -webkit-box-shadow: 0 0.5px 2px #000;
    padding: 30px 10px 10px 10px;

    .collabs {
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 50px;
    }

    .title {
      font-style: italic;
      left: -2px;
      position: relative;
    }

    .venue, .type {
      font-size: 12pt;
    }

    .venue {
      margin-bottom: 50px;
    }

    .desc {
      font-size: 12pt;
      margin-bottom: 50px;
    }

    .links {
      font-size: 12pt;
      a {
        margin-right: 20px;
      }
    }
  }
}

.thumbnail {
  width: 100%;
	align-items: baseline;
  /*   min-width: 700px; */
  display: flex;
  justify-content: center;
  
  img {
    width: 100%;
    height: auto;
    max-width: 800px;
  }
  p {
    font-family: "HK Grotesk", arial, sans-serif;
    text-align: center;
    font-style: italic;
    background-color: #ccc;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    width:100vw;
    height:100px;
    max-width: 800px;
  }
}
`;

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
    a {
      text-decoration: none;
    }
  }

  p.year {
    background-color: cornflowerblue;
  }

  .selected {
    border: solid rgba(0, 0, 0, 1);
  }
}
`;

export default function(state, emit) {
  state.filter.year = state.params.year ? state.params.year : "all";
  state.filter.tag = state.params.tag ? state.params.tag : "all";

  let filterDom;
  {
    const filters = [];

    for (const t of state.types) {
      const selected =
        state.filter.tag == undefined
          ? ""
          : state.filter.tag == t.t
          ? "selected"
          : "";
      
      filters.push(
        html`
          <p class="${ t.t } ${ selected }"><a href="/#${ state.filter.year }/${ t.t }">${ t.t }</a></p>
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
      "all",
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
          <p class="${ t } ${selected} year"><a href="/#${ t }/${ state.filter.tag }">${ t }</a></p>
        `
      );
    }
    
    filterDom = html`
    <div class=${ filterCss }>
      Filter by
      <div>${ filters }</div>
    </div>`;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const contents = filter(state.contents, state.filter).map(s => {
    const date = s.start.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    let { dateYear, title, topic, desc, type, image, yt, collab, venue, links } = s;

    let types = [];
    for (let i = 0; i < type.length; i++) {
      let del = i < type.length - 1 ? ', ' : '';
      types.push(type[i] + del);
    }
    let topics = [];
    for (let i = 0; i < topic.length; i++) {
      let del = i < topic.length - 1 ? ', ' : '';
      topics.push(topic[i] + del);
    }
    
    let link = [];
    if (yt != undefined) {
      link.push(html`<a target="_blank" href="https://youtu.be/${yt}">Video</a>`);
    }
    for (let i = 0; links !== undefined && i < links.length; i++) {
      let num = i + 1;
      if(links.length == 1) {
        num = "";
      }
      link.push(html`<div><a target="_blank" href="${links[i]}">Link ${num}</a></div>`);
    }
    
    let collabs = [];
    if (collab != undefined) {
      let i = 0;
      for (const c of collab) {
        collabs.push(`${c}`);
        if (i == collab.length - 2) {
          collabs.push(` and `);
        }
        else if (i < collab.length - 1) {
          collabs.push(`, `);
        }
        i++;
      }
    }
    let venueElt;
    if (venue != undefined) {
      let prefix = "";
      venueElt = html`
        ${prefix} ${venue}
      `;
    }
    let imageElt;
    if (image != undefined) {
      imageElt = html`
        <img src="${image}" loading="lazy" />
      `;
    } else {
      imageElt = html`<p>The image is currently on loan</p>`
    }

    return html`
      <section id="section-${s.id}">
        <div class="thumbnail">${imageElt}</div>
        <div class="caption-holder">
          <div class="caption">
            <div class="collabs">${collabs}</div>
            <div><span class="title">${ title }</span>, <span class="date">${ dateYear }</span></div>
            <div class="type">${ types }${ topics.length ? "; " : "" } ${ topics }</div>
            <div class="venue">${ venueElt }</div>
            <p class="desc">${ desc }</p>
            <p class="links">${ link }</p>
          </div>
        </div>
      </section>
  `});
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

          <div class=${ elementCss }>
            ${contents}
          </div>
        </div>
      </div>
    </div>
  `;
};
