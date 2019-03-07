var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  gameId: String,
  season: Number,
  seasonType: String,
  week: Number,
  gameKey: Number,
  gameDate: Date,
  gameTimeEastern: String,
  gameTimeLocal: String,
  isoTime: Number,
  homeTeamId: Number,
  visitorTeamId: Number,
  homeTeamAbbr: String,
  visitorTeamAbbr: String,
  homeDisplayName: String,
  visitorDisplayName: String,
  homeNickname: String,
  visitorNickname: String,
  gameType: String,
  weekNameAbbr: String,
  weekName: String,
  visitorTeam: {
    season: Number,
    teamId: String,
    abbr: String,
    cityState: String,
    fullName: String,
    nick: String,
    teamType: String,
    conferenceAbbr: String,
    divisionAbbr: String
  },
  homeTeam: {
    season: Number,
    teamId: String,
    abbr: String,
    cityState: String,
    fullName: String,
    nick: String,
    teamType: String,
    conferenceAbbr: String,
    divisionAbbr: String
  },
  site: {
    siteId: Number,
    siteCity: String,
    siteFullname: String,
    siteState: String,
    roofType: String
  },
  networkChannel: String,
  ngsGame: Boolean
});

mongoose.model('Game', GameSchema);

module.exports = mongoose.model('Game');