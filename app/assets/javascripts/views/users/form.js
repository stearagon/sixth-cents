SixthCents.Views.UsersForm = Backbone.CompositeView.extend({

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
  },

  className: "sign-up-form",

  template: JST['users/form'],

  events: {
    "submit form": "submit",
    "change #input-user-image": "fileInputChange"
  },

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  },

  submit: function(event){
    event.preventDefault();

    var spinner = new Spinner().spin();
    $(".top-container").append(spinner.el);

    var file = this.$("#input-user-image")[0].files[0];
    var name = this.$("#input-user-name").val();
    var email = this.$("#input-user-email").val();
    var password = this.$("#input-user-password").val();
    var formData = new FormData();

    if (file !== undefined) {formData.append("user[image]", file);}

    formData.append("user[name]", name);
    formData.append("user[email]", email);
    formData.append("user[password]", password);

    var that = this;

    this.model.saveFormData(formData, {
      success: function(){
        SixthCents.currentUser.fetch({ success: function(){
          $(".spinner").remove();
          Backbone.history.navigate("", { trigger: true })
        }
      });
      },
      error: function(data){
        alert("Form invalid.");
        $(".spinner").remove();
      }
    });
  },

  fileInputChange: function(event){

      var that = this;
      var file = event.currentTarget.files[0];
      var reader = new FileReader();

      reader.onloadend = function(){
        that._updatePreview(reader.result);
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        that._updatePreview("");
      }
    },

  _updatePreview: function(src){
    this.$el.find("#preview-user-image").attr("src", src);
  }

});
