import Prismic from "prismic-javascript";

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
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
        "Prismic-Ref": previewData?.ref || prismicAPI.masterRef.ref,
        "Content-Type": "application/json",
        "Accept-Language": API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      allBlog_posts {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allPosts?.edges;
}

export async function getAllPosts(previewData) {
  const data = await fetchAPI(
    `
     {
        allBlog_posts(sortBy:title_DESC) {
          edges {
            node {
              _meta {
                id
                uid
                lastPublicationDate
                lastPublicationDate
              }
              title
              picture
              snippet
              link
            }
          }
        }
      }
  `,
    { previewData }
  );

  return data.allBlog_posts.edges;
}

export async function getPostAndMorePosts(slug, previewData) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!) {
      blog_post(uid: $slug, lang: "fr-fr") {
        title
        picture
        body {
          __typename
          ... on Blog_postBodyProduct {
            type
            primary {
              title
              name
              link {
                _linkType
                ... on _ExternalLink {
                  url
                }
              }
              link_label
              description
              image
            }
          }
          ... on Blog_postBodyContent {
            type
            primary {
              text
            }
          }
        }
        _meta {
          uid
          lastPublicationDate
        }
      }
      morePosts: allBlog_posts(sortBy: title_DESC, first: 3) {
        edges {
          node {
            _meta {
              id
              uid
              lastPublicationDate
              lastPublicationDate
            }
            title
            picture
            snippet
            link
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        slug,
        lang: API_LOCALE,
      },
    }
  );

  data.morePosts = data.morePosts.edges
    .filter(({ node }) => node._meta.uid !== slug)
    .slice(0, 2);

  return data;
}
