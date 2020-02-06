const express = require('express');
const router = express.Router();
const whatthecommit = require('./whatthecommit');
const deniedMessage = "este comando não pode ser utilizado neste canal.";

router.get('/', (req, res) => res.redirect('https://github.com/gpedro/slack-whatthecommit/'));
  
  router.post('/', async (req, res, next) => {
    const message = await whatthecommit.get();
    const target = (req.query.allowed_channels || '').split(',');
  
    if (target && target.indexOf(req.body.channel_name) === -1) {
      return res.status(200).json({
        "attachments": [
          {
              "text": deniedMessage,
              "fallback": deniedMessage
          }
        ]
      })
    }
  
    return res.status(200).json({
      "response_type": "in_channel",
      "attachments": [
        {
            "text": message,
            "fallback": message
        }
      ]
    });
  });
  
  module.exports = router;