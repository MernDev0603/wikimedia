const Wikimedia = require("../models/wikimedia");

exports.Index = async (req, res) => {
    const { page = 0, bot = false, minor = false, search = '' } = req.body;

    try {
      const data = await Wikimedia.find({
        bot: bot,
        minor: minor,
        title: { $regex: search, $options: 'i' }
      })
        .skip(10 * page)
        .limit(10)
        .exec();
  
      res.send({
        data: data,
      });
    } catch (error) {
      console.error('Error fetching Wikimedia data:', error);
      res.status(500).send({ error: 'Error fetching Wikimedia data' });
    }
};

exports.Detail = async(req, res) => {
    try {
        const { id } = req.params;

        let viewedChange = await Wikimedia.findById(id);
        viewedChange.viewed = true;
        await viewedChange.save();

        res.send({
            data: viewedChange
        })
    } catch(error) {
        console.log('detail', error);
    }
    
}

exports.AddOne = async(data) => {
    try {
        const newWiki = new Wikimedia({
            title: data.title,
            comment: data.comment,
            timestamp: data.timestamp * 1000,
            bot: data.bot,
            minor: data.minor
        });
    
        newWiki.save();
    } catch (error) {
        console.error(error);
    }
}