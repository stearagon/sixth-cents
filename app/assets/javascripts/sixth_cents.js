window.SixthCents = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var accounts = new SixthCents.Collections.Accounts();

    var $rootEl = $(".main-div");
    var $modalEl = $(".modal-window");

    new SixthCents.Routers.Router({
      accounts: accounts,
      $rootEl: $rootEl,
      $modalEl: $modalEl
    });

    Backbone.history.start();
  }
};
