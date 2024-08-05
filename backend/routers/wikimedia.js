const wikimediaController = require("../controllers/wikimediaController")

module.exports = function (app) {
    app.get("/changes/:id", wikimediaController.Detail);
    app.post("/", wikimediaController.Index);
}