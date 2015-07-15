SixthCents.Views.AccountItem = Backbone.CompositeView.extend({
  tagName: "li",
  template: JST["accounts/account_item"],
  intialize: function(){
    this.listenTo(this.institutions, "sync", this.render)
  },
  render: function(){
    
    var institution = this.collection.getOrFetch(this.model.get("institution_id"))
    var content = this.template({ account: this.model, institution: institution });

    this.$el.html(content);

    return this;
  }
})
