


module.exports = function(app, search, bodyParser) {

  app.use(bodyParser.json());

  app.post('/deezer/search', function(req, res) {

    console.log("Reached webservice - /deezer/search");
    var promise = search.generic_search(req.body.query);

    promise.then(function(result){
        var songs = [];
        var count = 0;

        result.data.forEach(function(item){
          if (count < 10) songs.push(item); else return;
          count++;
        });

        res.json(songs);
    });

  });

  app.post('/deezer/search/artist', function(req, res) {

    console.log("Reached webservice - /deezer/search/artist");
    search.artist_search(req.body.artist);

  });

  app.post('/deezer/search/album', function(req, res) {

    console.log("Reached webservice - /deezer/search/album");
    search.album_search(req.body.album);

  });

  app.post('/deezer/search/song', function(req, res) {

    console.log("Reached webservice - /deezer/search/song");
    search.song_search(req.body.song);

  });

  app.post('/deezer/search/artist/album', function(req, res) {

    console.log("Reached webservice - /deezer/search/artist/album");
    search.artist_album_search(req.body.artist, req.body.album);

  });

  app.post('/deezer/search/artist/song', function(req, res) {

    console.log("Reached webservice - /deezer/search/artist/song");
    search.artist_song_search(req.body.artist, req.body.song);

  });

  app.post('/deezer/search/artist/album/song', function(req, res) {

    console.log("Reached webservice - /deezer/search/artist/album/song");
    search.artist_album_song_search(req.body.artist, req.body.album, req.body.song);

  });

}
