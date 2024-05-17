const express = require("express");
const authRoutes = require("./routes/auth-routes");
require("./models/database/db");
const passportSetup = require("./config/passportSetup");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const axios = require("axios");
const { google } = require("googleapis");

const app = express();
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET],
  })
);

// initialise passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "PUT,DELETE,POST,GET",
    credentials: true,
  })
);
app.use("/auth", authRoutes);

function checkLogin(req, res, next) {
  // console.log(req.user)
  if (!req.user) {
    res.send({ logInStat: false });
  } else {
    next();
  }
}

app.get("/profile", checkLogin, (req, res) => {
  res.send({ logInStat: true, userData: req.user });
});

app.get("/profile/videos", (req, res) => {
  try {
    axios
      .get("https://www.googleapis.com/youtube/v3/channels", {
        headers: {
          Authorization: `Bearer ${req.user.accessToken}`,
        },
        params: {
          part: "snippet",
          mine: true,
        },
      })
      .then((response) => {
        // Check if the response status is OK (200)
        if (response.status === 200) {
          const channelId = response.data.items[0].id;
          axios
            .get("https://www.googleapis.com/youtube/v3/search", {
              headers: {
                Authorization: `Bearer ${req.user.accessToken}`,
              },
              params: {
                part: "snippet",
                channelId: channelId,
                type: "video",
                maxResults: 10,
              },
            })
            .then((videoResponse) => {
              const videoIds = videoResponse.data.items
                .map((item) => item.id.videoId)
                .join(",");
              axios
                .get("https://www.googleapis.com/youtube/v3/videos", {
                  headers: {
                    Authorization: `Bearer ${req.user.accessToken}`,
                  },
                  params: {
                    part: "snippet,contentDetails",
                    id: videoIds,
                  },
                })
                .then((videoData) => {
                  let userVideoData = [];
                  for (let i = 0; i < videoData.data.items.length; i++) {
                    let youtubeData = {
                      id: videoData.data.items[i].id,
                      publishedAt: videoData.data.items[i].snippet.publishedAt,
                      title: videoData.data.items[i].snippet.title,
                      description: videoData.data.items[i].snippet.description,
                      url: videoData.data.items[i].snippet.thumbnails.default
                        .url,
                    };
                    userVideoData.push(youtubeData);
                  }
                  res.send(userVideoData);
                });
            });
        } else {
          // If the response status is not OK, log the error
          console.error("Error accessing YouTube API:", response.statusText);
          // Send an error response to the client
          res.status(response.status).send(response.statusText);
        }
      })
      .catch((error) => {
        // Log any errors that occur during the request
        console.error("Error accessing YouTube API:", error);
        // Send an error response to the client
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    // Catch any synchronous errors that occur
    console.error("Error:", error);
    // Send an error response to the client
    res.status(500).send("Internal Server Error");
  }
});

app.get("/profile/comments", async (req, res) => {
  try {
    let commentsData = [];
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: req.user.accessToken });
    const youtube = google.youtube({ version: "v3", auth });
    const response = await youtube.commentThreads.list({
      part: "snippet",
      videoId: req.query.videoId,
    });
    for (let i = 0; i < response.data.items.length; i++) {
      const comments = {
        commentId: response.data.items[i].snippet.topLevelComment.id,
        commentText:
          response.data.items[i].snippet.topLevelComment.snippet.textOriginal,
        author:
          response.data.items[i].snippet.topLevelComment.snippet
            .authorDisplayName,
        image:
          response.data.items[i].snippet.topLevelComment.snippet
            .authorProfileImageUrl,
        datePublished:
          response.data.items[i].snippet.topLevelComment.snippet.publishedAt,
        dateUpdated:
          response.data.items[i].snippet.topLevelComment.snippet.updatedAt,
        authorChannelLink:
          response.data.items[i].snippet.topLevelComment.snippet
            .authorChannelUrl,
      };
      commentsData.push(comments);
    }
    res.send(commentsData);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/profile/score", async (req, res) => {
  try {
    let scoreData = [];
    const requestedComments = req.query.comments;
    API_KEY = process.env.API_KEY;
    DISCOVERY_URL =
      "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1";

    const client = await google.discoverAPI(DISCOVERY_URL);

    // Map each comment to a promise of analyzing it
    const analysisPromises = requestedComments.map(comment => {
      const analyzeRequest = {
        comment: {
          text: comment.comments,
        },
        requestedAttributes: {
          TOXICITY: {},
        },
      };

      return new Promise((resolve, reject) => {
        client.comments.analyze(
          {
            key: API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) {
              reject(err);
            } else {
              const commentScore = {
                comment: comment.comments,
                commentId: comment.commentId,
                author: comment.author,
                score: response.data.attributeScores.TOXICITY.spanScores[0]
                  .score.value,
              };
              scoreData.push(commentScore);
              resolve();
            }
          }
        );
      });
    });

    // Wait for all analysis promises to resolve
    await Promise.all(analysisPromises);

    // Once all comments are analyzed, send the scoreData as response
    res.json(scoreData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
