const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyB5HDS8GtUStR86EuAaWy9LvWFGA18E3gc',
});

export default async function handler(req, res) {
  const live = await youtube.liveChatMessages.list({
    part: ['id'],
    liveChatId: 'KicKGFVDVGt3XzdGOHRQS3R5VnRGVERzMjFUdxILd0hyY080WW9aZ0E',
  });

  console.log(live);
  res.status(200).json({ name: live });
}
