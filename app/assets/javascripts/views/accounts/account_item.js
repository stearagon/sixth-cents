SixthCents.Views.AccountItem = Backbone.CompositeView.extend({
  tagName: "li",
  template: JST["accounts/account_item"],
  render: function(){
    var content = this.template({ account: this.model });

    this.$el.html(content);
    debugger
    return this;
  }
})
