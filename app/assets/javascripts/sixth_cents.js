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

    this.institutions = SixthCents.Collections.institutions;
    this.accounts = SixthCents.Collections.accounts;
    this.transactions = SixthCents.Collections.transactions;
    this.budgetInstructions = SixthCents.Collections.budgetInstructions;
    this.bills = SixthCents.Collections.bills;

    this.header = new SixthCents.Views.Header({ el: "#header"});

    this.router = new SixthCents.Routers.Router({
      $rootEl: $rootEl,
      $modalEl: $modalEl,
      institutions: this.institutions,
      accounts: this.accounts,
      transactions: this.transactions,
      budgetInstructions: this.budgetInstructions,
      bills: this.bills
    });

    Backbone.history.start();
  }
};
