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
    var budgetInstructions = SixthCents.Collections.budgetInstructions
    institutions.fetch();
    transactions.fetch();
    budgets.fetch();
    budgetInstructions.fetch();
    accounts.fetch();

    new SixthCents.Routers.Router({
      accounts: accounts,
      $rootEl: $rootEl,
      $modalEl: $modalEl,
      institutions: institutions,
      transactions: transactions,
      budgets: budgets,
      budgetInstructions: budgetInstructions
    });

    Backbone.history.start();
  }
};
