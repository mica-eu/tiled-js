var engine = {};

engine.outhnd = document.getElementById('output');
engine.canvas = document.getElementById('canvas');
engine.handle = engine.canvas.getContext('2d');

engine.output = function(message) {
  engine.outhnd.innerHTML += '<br>' + message;
};



engine.screen = {};

engine.screen.width = engine.canvas.width;
engine.screen.height = engine.canvas.height;

engine.screen.tilesX = engine.canvas.width / 16;
engine.screen.tilesY = engine.canvas.height / 16;



engine.viewport = {};

engine.viewport.x = 0;
engine.viewport.y = 0;



engine.tile = {};

engine.tile.draw = function(x, y, tile) {
  engine.handle.fillText(tile, x * 16, y * 16);
};



engine.map = {};

engine.map.draw = function(mapData) {
  var i, j; // x e y do mapa no loop

  var mapX = 0;
  var mapY = 0;
  var tile;

  engine.output('desenhando map de ' + engine.viewport.x + ',' + engine.viewport.y + ' até ' +
                (engine.viewport.x + engine.screen.tilesX) + ',' +
                (engine.viewport.y + engine.screen.tilesY));

  for (j = 0; j < engine.screen.tilesY; j++) {
    for (i = 0; i < engine.screen.tilesX; i++) {
      mapX = i + engine.viewport.x;
      mapY = j + engine.viewport.y;

      tile = (mapData[mapY] && mapData[mapY][mapX] ? mapData[mapY][mapX] : ' '); // pegando o tile. 'r' or 'g'

      engine.tile.draw(i, j, tile);

      console.log('j', j, 'i', i, tile);
    }
  }
};

engine.handle.translate( 0, 8 );

engine.start = function(mapData, x, y) {
  engine.output('rodando...');

  engine.viewport.x = x;
  engine.viewport.y = y;

  engine.map.draw(mapData);

  engine.output('pronto');
};
