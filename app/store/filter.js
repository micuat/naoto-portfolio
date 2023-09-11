import raw from "choo/html/raw";
import html from "choo/html";

import schedule from "../schedule.js";

export default (state, emitter) => {
  state.schedule = schedule();

  const counter = [];
  for (const s of state.schedule) {
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

//   emitter.on("navigate", () => {
//     parseQuery();
//   });
  
//   emitter.on("DOMContentLoaded", () => {
//     parseQuery();
//   });
}