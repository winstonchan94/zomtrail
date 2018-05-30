
const Coordinates = require('coordinate-parser');
const d3 = require('d3-dsv');
const fs = require('fs');
fs.readFile('public-art-locations.tsv', 'utf8', (err, string) => {
  let data = d3.tsvParseRows(string);

  let newData = data.map((row) => {
    let position = new Coordinates(row[2]);
    let latitude = position.getLatitude(); // 40.123 ✓
    let longitude = position.getLongitude(); // -74.123 ✓

    return {
      description: row[0],
      address: row[1],
      latitude,
      longitude
    };
  });

  console.log(newData);
});
