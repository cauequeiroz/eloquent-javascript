/*
  Build a Mountain

  Given a data set of mountains, an array of objects with name, height, and place properties,
  generate the DOM structure for a table that enumerates the objects. It should have one
  column per key and one row per object, plus a header row with <th> elements at the top,
  listing the column names.

  Write this so that the columns are automatically derived from the objects, by taking the
  property names of the first object in the data.

  Add the resulting table to the element with an id attribute of "mountains" so that it
  becomes visible in the document.

  Once you have this working, right-align cells that contain number values by setting
  their style.textAlign property to "right".

========================================================================================== */

const MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
  {name: "Everest", height: 8848, place: "Nepal"},
  {name: "Mount Fuji", height: 3776, place: "Japan"},
  {name: "Vaalserberg", height: 323, place: "Netherlands"},
  {name: "Denali", height: 6168, place: "United States"},
  {name: "Popocatepetl", height: 5465, place: "Mexico"},
  {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];


const createTableLine = (items, type) => {
  const line = document.createElement('tr');

  for (let item of items) {
    const column = document.createElement(type);
    const text = document.createTextNode(item);

    if (typeof item == 'number') {
      column.style.textAlign = 'right';
    }

    column.appendChild(text);
    line.appendChild(column);
  }

  return line;
};

const createTable = dataset => {
  const table = document.createElement('table');
  
  const header = createTableLine(Object.keys(dataset[0]), 'th');
  table.appendChild(header);

  for (let item of dataset) {
    const line = createTableLine(Object.values(item), 'td');
    table.appendChild(line);
  }

  return table;
};

const table = createTable(MOUNTAINS);
document.querySelector('#mountains').appendChild(table);