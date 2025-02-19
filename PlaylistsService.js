const { Pool } = require('pg');
 
class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylists(userId) {
    const query = {
      text: `SELECT playlists.* FROM playlists
         LEFT JOIN collaborations ON collaborations.playlist_id = playlist.id
      WHERE playlist.owner = $1 OR collaborations.user_id = $1
      GROUP BY playlist.id`,
   
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}
 
module.exports = PlaylistService;