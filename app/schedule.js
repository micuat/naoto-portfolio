import html from "choo/html";
import { css } from "@emotion/css";

import contents from "./contents.js";

export default () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dates = [];
  const dateOptions = { hour: "2-digit", minute: "2-digit" };
  for (let i = 0; i < contents.length; i++) {
    const s = contents[i];
    const date = s.start.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    const dateYear = s.start.toLocaleDateString(undefined, {
      year: "numeric"
    });
    let { title, topic, desc, type, image, yt, collab, venue, links } = s;

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

    dates.push(
      {type, title, dateYear, dom: html`
        <section id="section-${i}">
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
      `
      });
  }

  return dates;
};
