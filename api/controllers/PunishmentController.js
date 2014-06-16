/**
 * PunishmentController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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
