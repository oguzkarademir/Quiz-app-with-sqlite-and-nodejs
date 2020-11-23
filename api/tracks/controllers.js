const db = require('../db-connection');

const controllers = {
  getAll: (req, res) => {

    const sql = `SELECT * FROM 'tracks' WHERE Composer IN ('Michael Jackson' , 'Antonio Vivaldi', 'Johann Pachelbel', 'Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'Ludwig van Beethoven', 'Franz Schubert', 'Giuseppe Verdi', 'Peter Ilyich Tchaikovsky', 'Frédéric Chopin')`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }

      res.json(rows)
    });
  },
  getOne: (req, res) => {
    const sql = `SELECT * FROM Tracks WHERE TrackId = ?`;

    db.get(sql, [req.params.id], (err, rows) => {
      if(err){
        res.status(400).json({'error': err.message});
        return;
      }
      res.json(rows);
    })
  },
  create: (req, res) => {
    // read row data from body
  },
  update: (req, res) => {
    // read row data from body
  },
  delete: (req, res) => { }
}

module.exports = controllers;
