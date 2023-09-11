import raw from "choo/html/raw";
import html from "choo/html";

export default (state, emitter) => {
  function parseQuery() {
  }
  

  emitter.on("navigate", () => {
    parseQuery();
  });
  
  emitter.on("DOMContentLoaded", () => {
    parseQuery();
  });
}