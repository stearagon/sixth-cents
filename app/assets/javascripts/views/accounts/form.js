SixthCents.Views.FormView = Backbone.CompositeView.extend({
  template: JST["accounts/form"],
  tagName: "form",
  events: {
    "click button" : "submit",
    "click .cancel-form" : "close"
  },

  typesOfAccounts: [
    // this should be pulled from rails?
  ],

  render: function(){

    var institutions = SixthCents.Collections.institutions;
    var content = this.template({ account: this.model, institutions: institutions });

    this.$el.html(content);

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;

    that.model.set(attrs);
    that.model.save({}, {
      success: function(){
        that.collection.add(that.model, { merge: true, parse: true });
        Backbone.history.navigate("", { trigger: true })
      },
      error: function(){
        //show error on new form
      }
    })
  },

  close: function(){
    event.preventDefault();
    this.remove();
  }
})
