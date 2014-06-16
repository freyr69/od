/**
 * PunishmentController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/punishment/ask`
   */
   ask: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/punishment/index`
   */
   index: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'punishments'
    });
  },


  /**
   * Action blueprints:
   *    `/punishment/start`
   */
   start: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'punishments - start'
    });
  },


  /**
   * Action blueprints:
   *    `/punishment/finish`
   */
   finish: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'punishments - finish'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PunishmentController)
   */
  _config: {}

  
};
