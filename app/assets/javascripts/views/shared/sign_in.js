SixthCents.Views.SignIn = Backbone.CompositeView.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(SixthCents.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit"
  },
  className: "sign-in-form",

  template: JST['shared/sign_in'],

  render: function(){
    this.$el.html(this.template());

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    SixthCents.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("start", { trigger: true });
    }
  }

});
