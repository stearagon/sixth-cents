SixthCents.Views.BillItem = Backbone.CompositeView.extend({
  template: JST["bills/bill_item"],
  initialize: function(options){
    this.accounts = options.accounts;
    this.instName = options.instName;
    this.accountInfo = options.accountInfo;
  },
  events: {
    "click .delete-bill" : "delete"
  },
  tagName: "tr",
  render: function(){
    var content = this.template({ bill: this.model, instName: this.instName, accountInfo: this.accountInfo });

    this.$el.html(content);

    return this;
  },
  delete: function(event){
    
    event.preventDefault();
    var bill = this.collection.getOrFetch($(event.currentTarget).data("id"));
    bill.destroy();
  }
})
