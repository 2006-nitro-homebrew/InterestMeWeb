# InterestMe

Welcome to InterestMe - the best way to browse and save your favorite articles. Save your favorite articles, view them offline, and enjoy recommendations based on your saved articles list.

## Features

* Access Data Offline (Firestore)

InterestMe is responsible for storing user data as well as article data. Firestore is a non-relational database which would prove most useful for our database needs as we only have one relationship (user and article) and our application can scale horizontally as we add more users and articles.

Firestore supports offline data persistence. By having the ability to access data while the device is offline, users will have the ability to read, write, listen, or query the cached data provided by the Firestore offline persistence feature.

* Webscraping favorite articles (Cheerio & JSDOM)

Cheerio and JSDOM are used in conjunction to scrape web articles. Cheerio is responsible for scraping the text bodies of the article, while JSDOM scrapes the styling. In InterestMe, the article is rendered with the same format and style in order to replicate accordingly.

* Recommendation

By using our homegrown, grassfed, non-GMO, no steroids, Kobe farmed, organic machine learning algorithm, InterestMe generates keywords of articles and uses an external News API to recommend similar articles based on the key words.

*


