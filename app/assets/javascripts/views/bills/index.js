SixthCents.Views.BillsView = Backbone.CompositeView.extend({
  template: JST["bills/index"],
  initialize: function(options){
    this.accounts = options.accounts;
    this.listenTo(this.collection, "sync add", this.render)
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
    this.collection.each(this.addBill.bind(this))
  },

  addBill: function(bill) {
    var account = this.accounts.get(bill.get("account_id"));
    var instName = account.institution().escape("name");
    var accountInfo = account.get("account_type") + "-" + account.get("identifier")


    var billItem = new SixthCents.Views.BillItem({ model: bill, instName: instName, accountInfo: accountInfo });
    this.addSubview(".bill-list", billItem);
  },
  newBill: function(event){
    event.preventDefault();
    $("body").css({ overflow: "hidden"});
    var bill = new SixthCents.Models.Bill();
    var billFormView = new SixthCents.Views.BillFormView({ model: bill, collection: this.collection, accounts: this.accounts });
    $(".modal-window").html(billFormView.render().$el);
  }
})
