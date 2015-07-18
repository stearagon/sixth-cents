SixthCents.Views.EditAccountItem = Backbone.CompositeView.extend({
  tagName: "li",
  template: JST["accounts/edit_account_item"],

  intialize: function(){
    this.listenTo(this.collection, "add", this.render);
  },
  render: function(){
    var content = this.template({ account: this.model});

    this.$el.html(content);

    return this;
  }
})
