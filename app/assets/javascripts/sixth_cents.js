window.SixthCents = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $(".main-div");
    var $modalEl = $(".modal-window");

    this.currentUser = new SixthCents.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new SixthCents.Views.Header({ el: "#header"});

    this.router = new SixthCents.Routers.Router({
      $rootEl: $rootEl,
      $modalEl: $modalEl,
    });

    Backbone.history.start();
  }
};
