var engine = {};

engine.outhnd = document.getElementById('output');
engine.canvas = document.getElementById('canvas');
engine.handle = engine.canvas.getContext('2d');

engine.output = function(message) {
  engine.outhnd.innerHTML += '<br>' + message;
};


// Screen
engine.screen = {};

engine.screen.width = engine.canvas.width;
engine.screen.height = engine.canvas.height;

engine.screen.tilesX = engine.canvas.width / 16;
engine.screen.tilesY = engine.canvas.height / 16;


// Viewport
engine.viewport = {};

engine.viewport.x = 0;
engine.viewport.y = 0;


// Tile
engine.tile = {};
engine.tile.images = [];

engine.tile.draw = function(x, y, tile) {
  engine.handle.drawImage(engine.tile.retrieve(tile.ground), x * 16, y * 16);

  if (tile.item) {
    engine.handle.drawImage(engine.tile.retrieve(tile.item), x * 16, y * 16);
  }
};

engine.tile.store = function(id, imgSrc) {
  var newid = engine.tile.images.length;
  var tile = [id, new Image(), false]; // Formato do tile [id#, Image, loaded?]

  tile[1].src = imgSrc;
  tile[1].onload = function() {
    tile[2] = true;
  };

  engine.tile.images[newid] = tile; // Subindo img para a "loja"
};

engine.tile.retrieve = function(id) {
  var i, len = engine.tile.images.length;

  for (i = 0; i < len; i++) {
    if (engine.tile.images[i][0] == id) {
      return engine.tile.images[i][1]; // Retorna o objeto imagem
    }
  }
};

engine.tile.allLoaded = function() {
  var i, len = engine.tile.images.length;

  for (i = 0; i < len; i++) {
    if (engine.tile.images[i][2] === false) { // [2] = 'loaded?' boolean
      return false
    }
  }

  return true;
};


// Map
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

      tile = (mapData[mapY] && mapData[mapY][mapX] ? mapData[mapY][mapX] : {ground: 0}); // pegando o tile. 'r' or 'g'

      engine.tile.draw(i, j, tile);
    }
  }
};


// Draw
engine.draw = function(mapData) {
  if (engine.tile.allLoaded() === false) {
    setTimeout(function(md) {
      return function() {
        engine.output('[engine.draw] esperando imagens...');
        engine.draw(md);
      }
    }(mapData), 100);
  } else {
    engine.map.draw(mapData);
  }
};


// Start
engine.start = function(mapData, x, y) {
  engine.output('rodando...');

  engine.viewport.x = x;
  engine.viewport.y = y;

  engine.tile.store(0, 'tile_black.png');
  engine.tile.store(1, 'tile_grass.png');
  engine.tile.store(2, 'tile_rock.png');

  engine.draw(mapData);

  engine.output('pronto');
};
