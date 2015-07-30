SixthCents.Views.SignIn = Backbone.CompositeView.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(SixthCents.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "click .sign-in-guest": "submitGuest",
    "click .sign-in-main" : "submitMain"
  },
  className: "sign-in-form",

  template: JST['shared/sign_in'],

  render: function(){
    this.$el.html(this.template());

    return this;
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  },
  submitMain: function(event){
    event.preventDefault();
    var $form = $(".sign-in-main-form");
    var formData = $form.serializeJSON().user;

    SixthCents.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  submitGuest: function(event){
    
    event.preventDefault();
    var $form = $(".sign-in-guest-form");
    var formData = $form.serializeJSON().user;

    SixthCents.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  }

});
