SixthCents.Views.TransactionFormView = Backbone.CompositeView.extend({
  template: JST["transactions/form"],
  events: {
    "click button" : "submit"
  },
  tagName: "form",
  render: function(){
    var content = this.template({ model: this.model });

    this.$el.html(content);

    return this;
  },
  submit: function(event){
    debugger
    var attrs = this.$el.serializeJSON();
    this.model.set(attrs);
    this.model.save({}, { success: function() {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("/accounts/" + this.account.get("id"), { trigger: true })
      }.bind(this)
    })
  }
})
