/**
 * TaskController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/task/index`
   */
   index: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'tasks'
    });
  },


  /**
   * Action blueprints:
   *    `/task/start`
   */
   start: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'tasks - start'
    });
  },


  /**
   * Action blueprints:
   *    `/task/finish`
   */
   finish: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'tasks - finish'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TaskController)
   */
  _config: {}

  
};
