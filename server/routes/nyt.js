const request = require("request");
const Mention = require("../models/Mention");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();

const getNewMention = async (post, company) => {
  let date = Math.floor(new Date(post.pub_date).getTime() / 1000);
  let rating = await sentiment.analyze(post.snippet);
  rating = rating.comparative;
  let newMention = new Mention({
    company,
    platform: "The New York Times",
    postId: post._id,
    userId: post.byline.original,
    content: post.snippet,
    date,
    link: post.web_url,
    image: "https://static01.nyt.com/" + post.multimedia[0].url,
    popularity: 1,
    title: post.headline.main,
    rating
  });
  return newMention;
};

const getNYTPosts = async company => {
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=organizations.contains:(${company})&sort=newest&api-key=${process.env.NYT_API_KEY}`;
  request(url, { json: true }, async (err, res, nyt) => {
    if (err) {
      return [];
    }
    let submissions = [];
    if (nyt.response) {
      for (const post of nyt.response.docs) {
        await Mention.findOne({ postId: post._id }, async (err, mention) => {
          if (!mention) {
            let newMention = await getNewMention(post, company);
            await newMention.save((err, savedMention) => {
              submissions.push(savedMention);
            });
          }
        });
      }
    }
    return submissions;
  });
  return [];
};

module.exports = { getNYTPosts };
