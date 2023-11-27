export function getDataFromLocal() {
  const neWlayouts = getFromLS('layouts');
  const tLayout = neWlayouts.find((item) => item.i === 't');
  const graph = neWlayouts.find((item) => item.i === 'g');
  const bgraph = neWlayouts.find((item) => item.i === 'b');
  const agraph = neWlayouts.find((item) => item.i === 'a');
  const total = neWlayouts.find((item) => item.i === 'o');
  if (!neWlayouts.length) {
    return {};
  }

  const result = {};

  if (tLayout) {
    const tDataTable = tLayout.dataTable;
    result.t = { dataTable: tDataTable };
  }

  if (graph) {
    const { table, xAxis, yAxis, widgetType } = graph;
    result.g = { table, xAxis, yAxis, widgetType };
  }

  if (bgraph) {
    const { table, xAxis, yAxis, widgetType } = bgraph;
    result.b = { table, xAxis, yAxis, widgetType };
  }

  if (agraph) {
    const { Areatable, xAxis, yAxis, widgetType } = agraph;
    result.a = { Areatable, xAxis, yAxis, widgetType };
  }

  if (total) {
    const { dataCollection, column } = total;
    result.o = { dataCollection, column };
  }

  return result;
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    if (localStorage.getItem('layout')) {
      ls = JSON.parse(localStorage.getItem('layout'));
    } else {
      ls = [];
    }
  }

  if (ls.length === 0) {
    return ls;
  } else {
    return ls[key];
  }
}
