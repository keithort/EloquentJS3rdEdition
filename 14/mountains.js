const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" }
];

const div = document.querySelector("#mountains");

const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" }
];

const div = document.querySelector("#mountains");

function buildTable() {
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  const headings = Object.keys(MOUNTAINS[0]);
  headings.forEach(heading => {
    let cell = document.createElement("th");
    cell.textContent = heading;
    headerRow.appendChild(cell);
  });
  table.appendChild(headerRow);

  MOUNTAINS.forEach(mountain => {
    let row = document.createElement("tr");
    headings.forEach(heading => {
      let cell = document.createElement("td");
      cell.textContent = mountain[heading];
      if (typeof mountain[heading] == "number") {
        cell.style.textAlign = "right";
      }
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return table;
}
div.appendChild(buildTable());
