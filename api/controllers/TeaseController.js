/**
 * TeaseController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/tease/index`
   */
   index: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'teases'
    });
  },


  /**
   * Action blueprints:
   *    `/tease/start`
   */
   start: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'teases - start'
    });
  },


  /**
   * Action blueprints:
   *    `/tease/finish`
   */
   finish: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'teases - finished'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TeaseController)
   */
  _config: {}

  
};
