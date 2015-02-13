var sessionHelper = {
    currentUser: function(request) {
        var cookieName = request.server.settings.cookieName;
        var sessionCookie = (request.state[cookieName]);

        if ((sessionCookie != undefined) || (sessionCookie != null)) {
            return sessionCookie
        }
    }

};

module.exports = sessionHelper