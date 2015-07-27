SixthCents.Views.TransactionItem = Backbone.CompositeView.extend({
  template: JST["transactions/transaction_item"],
  tagName: "div",
  events: {
    // "click .transactions-list-item" : "edit"
  },
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
  // edit: function(event){
  //   event.preventDefault();
  //   $("body").css({ overflow: "hidden"});
  //   $(".modal-window-transaction").removeClass("display-none");
  //   var id = $(event.currentTarget).data("id")
  //   var transaction = this.collection.getOrFetch(id);
  //   var formView = new SixthCents.Views.TransactionFormView({ model: transaction, collection: this.collection, accounts: this.accounts, id: "" })
  //
  //   this.addSubview(".modal-window-transaction", formView);
  // }
})
