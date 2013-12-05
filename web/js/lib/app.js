var API_HOST = "http://localhost:9000/",
    API_VERSION = "v1",
    API_BASE = API_HOST + API_VERSION,
    view;

function User(data) {
    this.username = ko.observable(data.username);
    this.first_name = ko.observable(data.first_name);
    this.last_name = ko.observable(data.last_name);
    this.email = ko.observable(data.email);
    this.url = ko.observable(data.url);
    this.id = data.id;

    this.fullName = ko.computed(function() {
        return this.first_name() + " " + this.last_name();
    }, this);

    this.isActive = ko.computed(function() {
        if (undefined !== view.selectedUser() && null !== view.selectedUser()) {
            return this.id === view.selectedUser().id;
        } else {
            return false;
        }
    }, this);
}

function UsersViewModel() {
    var self = this;
    self.users = ko.observableArray([]);
    self.selectedUser = ko.observable();

    // Load user data
    $.getJSON(API_BASE + "/users", function(data) {
        var loadedUsers = $.map(data, function(u) {
            return new User(u);
        });
        self.users(loadedUsers);
    });

    self.selectUser = function(user) {
        self.selectedUser(user);
    };

    self.createUser = function() {
        var postUrl = API_BASE + "/users/create",
            form = $('#form-create'),
            postData = {};

        postData["user"] = form.serializeObject();

        $.ajax({
            url: postUrl,
            type: "POST",
            data: postData
        }).done(function(data) {
            form[0].reset();

            self.users.push(new User({
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                url: data.url
            }));
        });
    };

    self.saveUser = function(user) {
        var postUrl = API_BASE + "/users/update/" + user.id,
            form = $('#form-save'),
            postData = {};

        postData["user"] = form.serializeObject();

        $.ajax({
            url: postUrl,
            type: "POST",
            data: postData
        });
    };

    self.deleteUser = function(user) {
        var postUrl = API_BASE + "/users/delete/" + user.id;

        $.ajax({
            url: postUrl,
            type: "POST"
        }).done(function() {
            self.users.destroy(user);
            self.selectedUser(null);
        });
    };

}

view = new UsersViewModel();

ko.applyBindings(view);
