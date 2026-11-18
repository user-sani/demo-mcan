M-CAN climate action website (static, multi-page)

Pages
  index.html          home: hero, about, priorities, tabbed News/Publications/Multimedia, Partners, Join
  news.html           all news and events
  publications.html   all publications
  multimedia.html     all videos and recordings
  partners.html       all partners, with search
  post.html           single post page (opens from any news, publication or multimedia card)

Files
  images/hero.jpg     home page banner image
  logos/              partner logos (see logos/README.txt)
  css/style.css       styles (colors are variables at the top, :root)
  js/data.js          CONTENT: edit this file to add news, publications, multimedia, partners
  js/script.js        mobile menu and page rendering

Use
  Open index.html in a browser, or upload the whole folder to any web host.
  Keep the folder structure unchanged.
  On the home page, News, Publications and Multimedia share one tabbed section
  (News is active by default). The menu items open the matching tab; each tab has a
  "View all" button that opens its own page.

Lists and posts
  news.html, publications.html and multimedia.html have a search box and pagination
  (items per page: "pageSize" at the top of js/data.js).
  Each card opens post.html?t=<type>&id=<id>. To add a post, copy an item in js/data.js,
  give it a unique id, and add "content": ["paragraph 1", "paragraph 2"] for the full text.
