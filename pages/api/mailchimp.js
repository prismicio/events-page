import mailchimp from '@mailchimp/mailchimp_marketing';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '0.5mb',
    },
  },
};

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export default async function addMember(req, res) {
  const { listId, email } = JSON.parse(req.body);
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  } catch (err) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(err));
  }
}
