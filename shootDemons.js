const { stdout, stdin, exit } = process;
const demons = ["😈", "👺", "👻", "💀", "👹", "👽", "🤖", "🎃", "🤡"];
const demonIds = [{ type: "👻", x: 6, y: 2 }];
const player = { pType: "🦹", x: stdout.columns - 80, y: stdout.rows - 2 };
const weaponHolster = [];
stdin.setRawMode("true");

const weaponInserter = function() {
  let weapon = {};
  weapon.wType = "🚀";
  weapon.x = player.x;
  weapon.y = player.y - 1;
  weaponHolster.push(weapon);
};

const moveRight = function() {
  player.x += 1;
};
const moveLeft = function() {
  player.x -= 1;
};
const demonInserter = function(columns) {
  const length = demons.length;
  let newDemonId = {};
  newDemonId.type = demons[Math.floor(Math.random() * length)];
  newDemonId.x = Math.floor(Math.random() * columns - 3);
  newDemonId.y = 2;
  demonIds.push(newDemonId);
};

const createFloor = function(rows, columns) {
  stdout.cursorTo(0, rows);
  console.log("=".repeat(columns));
};
const killDemon = function() {
  demonIds.forEach(demon => {
    weaponHolster.forEach(weapon => {
      let exact = demon.x == weapon.x && demon.y == weapon.y - 1;
      let approx1 = demon.x + 1 == weapon.x && demon.y == weapon.y - 1;
      let approx2 = demon.x == weapon.x + 1 && demon.y == weapon.y - 1;
      if (exact || approx1 || approx2) {
        demonIds.splice(demonIds.indexOf(demon), 1);
        weaponHolster.splice(weaponHolster.indexOf(weapon), 1);
      }
      if (weapon.y == 1) {
        weaponHolster.splice(weaponHolster.indexOf(weapon), 1);
      }
    });
  });
};
const insertWeaponOnBoard = function() {
  weaponHolster.forEach(weapon => {
    stdout.cursorTo(weapon.x, weapon.y);
    stdout.write(weapon.wType);
    weapon.y -= 1;
  });
};
const movePlayerOnBoard = function() {
  stdout.cursorTo(player.x, player.y);
  stdout.write(player.pType);
};

const insertDemonOnBoard = function() {
  demonIds.forEach(demonId => {
    stdout.cursorTo(demonId.x, demonId.y);
    stdout.write(demonId.type);
    demonId.y += 1;
  });
};
const createCeiling = function(columns) {
  stdout.cursorTo(0, 1);
  stdout.clearScreenDown();
  console.log("=".repeat(columns));
};

const createBoard = function(rows, columns) {
  createCeiling(columns);
  insertDemonOnBoard();
  movePlayerOnBoard();
  insertWeaponOnBoard();
  killDemon();
  createFloor(rows, columns);
};

const main = function() {
  let columns = stdout.columns - 2;
  let rows = stdout.rows;
  setInterval(createBoard, 200, rows, columns);
  setInterval(demonInserter, 800, columns);
  stdin.on("data", playerMove => {
    const playerMoves = {
      a: moveLeft,
      d: moveRight,
      w: weaponInserter,
      q: exit
    };
    if (playerMoves.hasOwnProperty(playerMove)) {
      playerMoves[playerMove]();
    }
  });
};

main();
