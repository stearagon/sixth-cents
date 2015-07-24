SixthCents.Views.TransactionItem = Backbone.CompositeView.extend({
  template: JST["transactions/transaction_item"],
  tagName: "div",
  className: "transactions-list-item group",
  initialize: function(options){
    this.color = options.color;
  },
  render: function(){
    var content = this.template({ transaction: this.model })

    this.$el.html(content);
    this.$el.data("id", this.model.get("id"))
    this.$el.addClass(this.color);

    return this;
  }
})
