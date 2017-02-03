module.exports = {

  generic_search: function(query) {

    var Promise = require('promise');
    var Deezer = require('deezer-node-api');
    var dz = new Deezer();
    var res_call;

    return dz.findTracks(query);
  },
  artist_search: function(artist) {
    console.log("search terms: " + artist);
  },
  album_search: function(album) {
    console.log("search terms: " + album);
  },
  song_search: function(song) {
    console.log("search terms: " + song);
  },
  artist_album_search: function(artist, album) {
    console.log("search terms: " + artist + " / " + album);
  },
  artist_song_search: function(artist, song) {
    console.log("search terms: " + artist + " / " + song);
  },
  artist_album_song_search: function(artist, album, song) {
    console.log("search terms: " + artist + " / " + album + " / " + song);
  }

}
