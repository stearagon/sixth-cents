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

    this.institutions = SixthCents.Collections.institutions;
    var content = this.template({ account: this.model, institutions: this.institutions,
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
        success: function(model){
            attrs.institution_id = model.id;
            that.institutions.add(institution, { merge: true, parse: true });
            that.model.set(attrs);
            that.model.save({}, {
              success: function(){
                that.collection.add(that.model, { merge: true, parse: true });
                // $("body").css({ overflow: "scroll"});
                $(".edit-accounts-window").removeClass("display-none");
                $(".edit-accounts-window-list").removeClass("display-none");
                $(".close-edit").removeClass("display-none");
                $(".edit-window").removeClass("display-none");
                $("body").css({ overflow: "scroll"});
                return
              },
              error: function(){

                //show error on new form
                return
              }
            })
          }
        }
      )
    } else {
      delete attrs.institution_name;
      that.model.set(attrs);
      that.model.save({}, {
        success: function(){
          that.collection.add(that.model, { merge: true, parse: true });
          // $("body").css({ overflow: "scroll"});
          $(".edit-accounts-window").removeClass("display-none");
          $(".edit-accounts-window-list").removeClass("display-none");
          $(".close-edit").removeClass("display-none");
          $(".edit-window").removeClass("display-none");
          $("body").css({ overflow: "scroll"});
        },
        error: function(){
          //show error on new form
        }
      })
    }

  },

  close: function(){
    event.preventDefault();
    this.remove();
    // $("body").css({ overflow: "scroll"});
    $(".edit-accounts-window").removeClass("display-none");
    $(".edit-accounts-window-list").removeClass("display-none");
    $(".close-edit").removeClass("display-none");
    $(".edit-window").removeClass("display-none");
    // $(".modal-window").addClass("display-none");
  },

  customInput: function(event){

    if (event.currentTarget.childElementCount === (event.currentTarget.selectedIndex + 1)){
      $("#hidden-input").removeClass("display-none")
    } else {
      $("#hidden-input").addClass("display-none")
    };
  }
})
