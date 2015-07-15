SixthCents.Views.AccountItem = Backbone.CompositeView.extend({
  tagName: "li",
  template: JST["accounts/account_item"],

  intialize: function(){
    this.listenTo(this.collection, "sync add", this.render);
    this.listenTo(this.institution, "sync add", this.render);
    this.listenTo(this.model, "sync add", this.render);
  },
  render: function(){
    this.institution = this.collection.getOrFetch(this.model.get("institution_id"))
    this.institution.fetch();
    var content = this.template({ account: this.model, institution: this.institution });

    this.$el.html(content);

    return this;
  }
})
