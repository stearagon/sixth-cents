window.SixthCents = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $(".main-div");
    var $modalEl = $(".modal-window");
    var institutions = SixthCents.Collections.institutions;
    var accounts = SixthCents.Collections.accounts;
    var transactions = SixthCents.Collections.transactions;
    var budgets = SixthCents.Collections.budgets;
    var budgetInstructions = SixthCents.Collections.budgetInstructions;
    var bills = SixthCents.Collections.bills;
    institutions.fetch();
    transactions.fetch();
    budgets.fetch();
    budgetInstructions.fetch();
    accounts.fetch();
    bills.fetch();

    this.currentUser = new SixthCents.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new SixthCents.Views.Header({ el: "#header"});

    new SixthCents.Routers.Router({
      accounts: accounts,
      $rootEl: $rootEl,
      $modalEl: $modalEl,
      institutions: institutions,
      transactions: transactions,
      budgets: budgets,
      budgetInstructions: budgetInstructions,
      bills: bills
    });

    Backbone.history.start();
  }
};
