const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const EventSource = require('eventsource');
const wikimediaController = require("./controllers/wikimediaController")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/wikimedia")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

require("./routers/wikimedia")(app);

const url = 'https://stream.wikimedia.org/v2/stream/recentchange';
const eventSource = new EventSource(url);

eventSource.onopen = () => {
    console.info('Opened connection.');
};
eventSource.onerror = (event) => {
    console.error('Encountered error', event);
};
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.server_name === 'en.wikipedia.org') {
        wikimediaController.AddOne(data);
    }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});