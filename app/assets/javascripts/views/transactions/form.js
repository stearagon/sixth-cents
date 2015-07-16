SixthCents.Views.TransactionFormView = Backbone.CompositeView.extend({
  template: JST["transactions/form"],
  events: {
    "click .create-transaction" : "submit"
  },
  initialize: function(options){
    this.account = options.account;
  },
  tagName: "form",
  render: function(){
    var content = this.template({ model: this.model });

    this.$el.html(content);

    return this;
  },
  submit: function(event){
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    attrs["account_id"] = this.account.get("id");

    this.model.set(attrs);
    this.model.save({}, { success: function() {

        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("/accounts/" + this.account.get("id"), { trigger: true })
      }.bind(this),
      error: function(){

      }
    })
  }
})