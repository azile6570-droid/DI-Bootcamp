const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const Parser = require('rss-parser');

const app = express();
const parser = new Parser();
const PORT = process.env.PORT || 3000;
const FEED_URL = 'https://thefactfile.org/feed/';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'pages'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

async function getPosts() {
  const response = await axios.get(FEED_URL, { timeout: 15000 });
  const feed = await parser.parseString(response.data);

  return feed.items.map((item) => {
    const published = item.isoDate || item.pubDate;
    const publishedDate = published ? new Date(published) : null;
    const categories = Array.isArray(item.categories)
      ? item.categories.map((category) => (
        typeof category === 'string' ? category : category?._ || ''
      )).filter(Boolean)
      : [];

    return {
      title: item.title || 'Untitled fact',
      link: item.link || FEED_URL,
      creator: item.creator || item.author || item['dc:creator'] || 'Unknown',
      categories,
      content: item.contentSnippet || item.content || item.description || '',
      publishedAt: publishedDate && !Number.isNaN(publishedDate.getTime())
        ? publishedDate.toISOString()
        : '',
      publishedDate: publishedDate && !Number.isNaN(publishedDate.getTime())
        ? publishedDate.toLocaleDateString()
        : '',
    };
  });
}

function getSearchOptions(posts) {
  return {
    titles: posts.map((post) => post.title),
    categories: [...new Set(posts.flatMap((post) => post.categories))]
      .sort((first, second) => first.localeCompare(second)),
  };
}

function renderSearch(res, posts, message = '', status = 200, optionPosts = posts) {
  res.status(status).render('search', {
    posts,
    ...getSearchOptions(optionPosts),
    message,
  });
}

app.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    res.render('index', { posts, message: '' });
  } catch (error) {
    console.error('Unable to load the RSS feed:', error.message);
    res.status(502).render('index', {
      posts: [],
      message: 'The facts feed is unavailable right now. Please try again later.',
    });
  }
});

app.get('/search', async (req, res) => {
  try {
    const posts = await getPosts();
    renderSearch(res, [], '', 200, posts);
  } catch (error) {
    console.error('Unable to load the RSS feed for search:', error.message);
    renderSearch(
      res,
      [],
      'The facts feed is unavailable right now. Please try again later.',
      502,
    );
  }
});

app.post('/search/title', async (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  if (!title) {
    return renderSearch(res, [], 'Enter a title to search for.');
  }

  try {
    const allPosts = await getPosts();
    const posts = allPosts.filter((post) => (
      post.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
    ));
    renderSearch(
      res,
      posts,
      posts.length ? '' : 'No facts matched that title.',
      200,
      allPosts,
    );
  } catch (error) {
    console.error('Unable to search the RSS feed by title:', error.message);
    renderSearch(
      res,
      [],
      'The facts feed is unavailable right now. Please try again later.',
      502,
    );
  }
});

app.post('/search/category', async (req, res) => {
  const category = typeof req.body.category === 'string' ? req.body.category.trim() : '';
  if (!category) {
    return renderSearch(res, [], 'Choose a category to search for.');
  }

  try {
    const allPosts = await getPosts();
    const posts = allPosts.filter((post) => (
      post.categories.some((postCategory) => (
        postCategory.toLocaleLowerCase() === category.toLocaleLowerCase()
      ))
    ));
    renderSearch(
      res,
      posts,
      posts.length ? '' : 'No facts matched that category.',
      200,
      allPosts,
    );
  } catch (error) {
    console.error('Unable to search the RSS feed by category:', error.message);
    renderSearch(
      res,
      [],
      'The facts feed is unavailable right now. Please try again later.',
      502,
    );
  }
});

app.listen(PORT, () => {
  console.log(`Facts RSS reader running at http://localhost:${PORT}`);
});
