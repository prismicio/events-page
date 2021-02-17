import Prismic from 'prismic-javascript';

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
export const API_TOKEN = process.env.PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
        'Content-Type': 'application/json',
        'Accept-Language': API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    },
  );

  if (res.status !== 200) {
    throw new Error('Failed to fetch API');
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getAllShows() {
  const data = await fetchAPI(`query {
    allShows {
      edges {
        node {
          _meta {
            lang
            uid
            id
          }
        }
      }
    }
  }`);
  return data?.allShows?.edges;
}

export async function getShowByUid(uid, lang, previewData) {
  const data = await fetchAPI(
    ` query ShowBySlug($uid: String!, $lang: String!) {
      show(uid: $uid, lang: $lang) {
        logo
        label
        name
        broadcast
        tagline
        meta_title
        meta_image
        meta_description
        description_after
        description_before
        email_placeholder
        button_for_register
        calendar_cid
        button_for_calendar
        button
        title_after
        title_before
        mailchimp_list_id
        video {
          _linkType
          ... on _FileLink {
            url
            size
            name
          }
        }
        body {
          ... on ShowBodyUpcoming {
            type
            primary {
              heading
              top_bar_icon
              event_icon
            }
           fields {
             title
             date
           }
          }
          ... on ShowBodyReplay {
            type
            primary {
              heading
              top_bar_icon
            }
           fields {
             title
             number
             description
             thumbnail
             link {
              _linkType
              ... on _ExternalLink {
                url
              }
            }
           }
          }
          ... on ShowBodyAbout{
            type
            primary {
              description
            }
           fields {
             title
             description
             picture
           }
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        uid,
        lang,
      },
    },
  );
  return data?.show;
}
