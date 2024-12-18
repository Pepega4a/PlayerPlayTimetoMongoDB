const {model, Schema} = require('mongoose')
var SchemaTypes = Schema.Types;
const playtimeSchema = new Schema({
    playerId: String,
    playerName: String,
    playtime: SchemaTypes.Decimal128,
    servernumb: String,
    date: { type: Date, default: Date.now }
});
module.exports = model("Playtime", playtimeSchema)