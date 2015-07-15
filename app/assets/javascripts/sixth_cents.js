window.SixthCents = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var accounts = new SixthCents.Collections.Accounts();
    var institutions = new SixthCents.Collections.Institutions();
    var $rootEl = $(".main-div");
    var $modalEl = $(".modal-window");
    institutions.fetch();

    new SixthCents.Routers.Router({
      accounts: accounts,
      institutions: institutions,
      $rootEl: $rootEl,
      $modalEl: $modalEl
    });

    Backbone.history.start();
  }
};
