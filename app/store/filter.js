import raw from "choo/html/raw";
import html from "choo/html";

import contents from "../contents.js";

export default (state, emitter) => {
  let id = 0;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dates = [];
  const dateOptions = { hour: "2-digit", minute: "2-digit" };
  state.contents = contents.map(e => {
    const dateYear = e.start.toLocaleDateString(undefined, {
      year: "numeric"
    });
    return { ...e, dateYear, id: id++ };
  });
  state.filter = {};

  const counter = [];
  for (const s of state.contents) {
    const types = [...s.type, "all"];
    for (const t of types) {
      const c = counter.find(el => el.t == t);
      if (c == undefined) {
        counter.push({ t, count: 1 });
      } else {
        c.count++;
      }
    }
  }

  console.log(counter)
  state.types = counter.sort((a, b) => {
    if(a.count < b.count) {
      return 1;
    }
    if(a.count == b.count) {
      return 0;
    }
    return -1;
  });
}