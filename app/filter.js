export default (list, filter) => {
  const newList = [];
  for(const l of list) {
    if (filter != undefined) {
      if (filter.tag != undefined) {
        if (filter.tag != "all" && l.type.indexOf(filter.tag) < 0) continue;
      }
      if (filter.year != undefined) {
        if (filter.year != "all time" && l.dateYear != filter.year) continue;
      }
    }
    // console.log(filter.tag, l.type, l.dom, l.title)
    newList.push(l);
  }
  return newList;
}
