const mongoose = require('mongoose');

// Define schemas for the collections
const youtubeShowSchema = new mongoose.Schema({}, { strict: false, collection: 'youtubeShow' });
const youtubeEpisodeSchema = new mongoose.Schema({}, { strict: false, collection: 'youtubeEpisode' });

const YoutubeShow = mongoose.model('youtubeShow', youtubeShowSchema);
const YoutubeEpisode = mongoose.model('youtubeEpisode', youtubeEpisodeSchema);

/**
 * Get a YouTube show by ID from the youtubeShow collection
 * @param {string} id - The show ID to retrieve
 * @returns {Promise<Object>} The show document or null if not found
 */
async function getShowById(id) {
  try {
    // Convert string ID to number for int32 field matching
    const numericId = parseInt(id);
    const show = await YoutubeShow.findOne({ id: numericId });
    return show;
  } catch (error) {
    console.error('Error fetching show by ID:', error);
    throw error;
  }
}

/**
 * Get a YouTube episode by youtubeId from the youtubeEpisode collection
 * @param {string} youtubeId - The YouTube ID to search for
 * @returns {Promise<Object>} The episode document or null if not found
 */
async function getEpisodeByYoutubeId(youtubeId) {
  try {
    const episode = await YoutubeEpisode.findOne({ youtubeId: youtubeId });
    return episode;
  } catch (error) {
    console.error('Error fetching episode by youtubeId:', error);
    throw error;
  }
}

/**
 * Get multiple episodes by youtubeIds from the youtubeEpisode collection
 * @param {string[]} youtubeIds - Array of YouTube IDs to search for
 * @returns {Promise<Array>} Array of episode documents
 */
async function getEpisodesByYoutubeIds(youtubeIds) {
  try {
    const episodes = await YoutubeEpisode.find({ youtubeId: { $in: youtubeIds } });
    return episodes;
  } catch (error) {
    console.error('Error fetching episodes by youtubeIds:', error);
    throw error;
  }
}

/**
 * Get all shows from the youtubeShow collection
 * @param {Object} options - Query options (limit, skip, etc.)
 * @returns {Promise<Array>} Array of show documents
 */
async function getAllShows(options = {}) {
  try {
    const { limit = 50, skip = 0 } = options;
    const shows = await YoutubeShow.find().limit(limit).skip(skip);
    return shows;
  } catch (error) {
    console.error('Error fetching all shows:', error);
    throw error;
  }
}

/**
 * Get all episodes from the youtubeEpisode collection
 * @param {Object} options - Query options (limit, skip, etc.)
 * @returns {Promise<Array>} Array of episode documents
 */
async function getAllEpisodes(options = {}) {
  try {
    const { limit = 50, skip = 0 } = options;
    const episodes = await YoutubeEpisode.find().limit(limit).skip(skip);
    return episodes;
  } catch (error) {
    console.error('Error fetching all episodes:', error);
    throw error;
  }
}

module.exports = {
  getShowById,
  getEpisodeByYoutubeId,
  getEpisodesByYoutubeIds,
  getAllShows,
  getAllEpisodes,
  YoutubeShow,
  YoutubeEpisode
};
