SixthCents.Views.FormView = Backbone.CompositeView.extend({
  template: JST["accounts/form"],
  tagName: "form",
  events: {
    "click button" : "submit",
    "click .cancel-form" : "close",
    "change select[name=institution_id]" : "customInput"
  },

  typesOfAccounts: [
    // this should be pulled from rails?
    "Checking",
    "Savings",
    "Credit Card",
    "Loan",
    "Investment",
    "Property/Other"
  ],

  render: function(){

    var institutions = SixthCents.Collections.institutions;
    var content = this.template({ account: this.model, institutions: institutions,
                                  types: this.typesOfAccounts });

    this.$el.html(content);

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;


    if (attrs.institution_id === "" ){
      var institution = new SixthCents.Models.Institution({ name: attrs.institution_name });
      delete attrs.institution_name;

      institution.save({}, {
        success: {
          function(model){
            attrs.institution_id = model.id;
            that.model.set(attrs);
            that.model.save({}, {
              success: function(){
                that.collection.add(that.model, { merge: true, parse: true });
                Backbone.history.navigate("", { trigger: true })
                return
              },
              error: function(){
                //show error on new form
              }
            })
          }
      }
    })
  }
    delete attrs.institution_name;
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
  },

  customInput: function(event){

    if (event.currentTarget.childElementCount === (event.currentTarget.selectedIndex + 1)){
      $("#hidden-input").removeClass("display-none")
    } else {
      $("#hidden-input").addClass("display-none")
    };
  }
})
