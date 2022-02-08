const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

async function searchUsers(text) {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(`${GITHUB_URL}/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const { items } = await response.json();

  return items;
}

async function getUser(username) {
  const response = await fetch(`${GITHUB_URL}/users/${username}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (response.status === 404) {
    window.location = '/notfound';
  } else {
    const data = await response.json();
    return data
  }
}

async function getUserRepos(username) {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });
  const response = await fetch(
    `${GITHUB_URL}/users/${username}/repos?${params}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }
  );
  const data = await response.json();

  return data;
}