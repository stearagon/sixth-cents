window.SixthCents = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // var accounts = new SixthCents.Collections.Accounts();
    var $rootEl = $(".main-div");
    var $modalEl = $(".modal-window");
    var institutions = SixthCents.Collections.institutions;
    var accounts = SixthCents.Collections.accounts;
    var transactions = SixthCents.Collections.transactions;
    var budgets = SixthCents.Collections.budgets
    institutions.fetch();
    transactions.fetch();
    budgets.fetch();

    new SixthCents.Routers.Router({
      accounts: accounts,
      $rootEl: $rootEl,
      $modalEl: $modalEl,
      institutions: institutions,
      transactions: transactions
    });

    Backbone.history.start();
  }
};
