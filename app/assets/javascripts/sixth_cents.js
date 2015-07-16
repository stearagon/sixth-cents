window.SixthCents = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var accounts = new SixthCents.Collections.Accounts();
    var $rootEl = $(".main-div");
    var $modalEl = $(".modal-window");
    var institutions = SixthCents.Collections.institutions;
    institutions.fetch();

    new SixthCents.Routers.Router({
      accounts: accounts,
      $rootEl: $rootEl,
      $modalEl: $modalEl,
      institutions: institutions
    });

    Backbone.history.start();
  }
};
