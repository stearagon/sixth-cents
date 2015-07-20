SixthCents.Views.BillItem = Backbone.CompositeView.extend({
  template: JST["bills/bill_item"],
  initialize: function(options){
    this.accounts = options.accounts;
    this.instName = options.instName;
    this.accountInfo = options.accountInfo;
  },
  tagName: "tr",
  render: function(){
    var content = this.template({ bill: this.model, instName: this.instName, accountInfo: this.accountInfo });

    this.$el.html(content);

    return this;
  }
})
