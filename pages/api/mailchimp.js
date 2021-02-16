import mailchimp from '@mailchimp/mailchimp_marketing';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '0.5mb',
    },
  },
};

mailchimp.setConfig({
  apiKey: 'c890be2138cdf656f10a127f23530db7-us4',
  server: 'us4',
});

export default async function addMember(req, res) {
  const { listId, email, firstName, lastName } = JSON.parse(req.body);
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
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
