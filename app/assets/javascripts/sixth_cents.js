window.SixthCents = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var accounts = new SixthCents.Collections.Accounts();

    var $rootEl = $(".main-div");

    new SixthCents.Routers.Router({
      accounts: accounts,
      $rootEl: $rootEl
    });

    Backbone.history.start();
  }
};
