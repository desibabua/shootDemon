const { stdout, stdin, exit } = process;
const demons = ["😈", "👺", "👻", "💀", "👹", "👽", "🤖", "🎃", "🤡"];
const demonIds = [{ type: "👻", x: 6, y: 2 }];

const demonInserter = function(columns) {
  const length = demons.length;
  let newDemonId = {};
  newDemonId.type = demons[Math.floor(Math.random() * length)];
  newDemonId.x = Math.floor(Math.random() * columns - 3);
  newDemonId.y = 2;
  demonIds.push(newDemonId);
};

const insertDemonOnBoard = function() {
  demonIds.forEach(demonId => {
    stdout.cursorTo(demonId.x, demonId.y);
    stdout.write(demonId.type);
    demonId.y += 1;
  });
};

const upperBorder = function(columns) {
  stdout.cursorTo(0, 1);
  stdout.clearScreenDown();
  console.log("=".repeat(columns));
};

const lowerBorder = function(rows, columns) {
  stdout.cursorTo(0, rows);
  console.log("=".repeat(columns));
};

const board = function(rows, columns) {
  upperBorder(columns);
  insertDemonOnBoard();
  lowerBorder(rows, columns);
};

const main = function() {
  let columns = stdout.columns;
  let rows = stdout.rows;
  setInterval(board, 200, rows, columns);
  setInterval(demonInserter, 800, columns);
};

main();
