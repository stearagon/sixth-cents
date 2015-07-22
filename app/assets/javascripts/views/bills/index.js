SixthCents.Views.BillsView = Backbone.CompositeView.extend({
  template: JST["bills/index"],
  initialize: function(options){
    this.accounts = options.accounts;
    this.listenTo(this.collection, "add destroy", this.render)
  },
  events: {
    "click .add-bill" : "newBill"
  },
  render: function(){

    var content = this.template()

    this.$el.html(content)

    this.addBills();

    return this;
  },

  addBills: function(){
    if (this.accounts.length > 0){
      this.collection.billsTime().forEach(this.addBill.bind(this))
    }
  },

  addBill: function(bill) {
    var account = this.accounts.get(bill.get("account_id"));
    var instName = account.institution().escape("name");
    var accountInfo = account.get("account_type") + "-" + account.get("identifier")


    var billItem = new SixthCents.Views.BillItem({ model: bill, instName: instName, accountInfo: accountInfo, collection: this.collection });
    this.addSubview(".bill-list", billItem);
  },
  newBill: function(event){
    event.preventDefault();
    $(".modal-window").removeClass("display-none");
    $("body").css({ overflow: "hidden"});
    var bill = new SixthCents.Models.Bill();
    var billFormView = new SixthCents.Views.BillFormView({ model: bill, collection: this.collection, accounts: this.accounts });
    $(".modal-window").addClass("add-bill");
    $(".modal-window").html(billFormView.render().$el);
  }
})
