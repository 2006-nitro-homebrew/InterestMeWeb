# InterestMe

Link to InterestMe:
https://interest-me-web.herokuapp.com/

Link to InterestMe Chrome Extension:
https://drive.google.com/file/d/1H0iRFGB4l7lwjQZQ38OmD89NtJJ3ev5r/view?usp=sharing

Link to GitHub:

InterestMe
https://github.com/2006-nitro-homebrew/

Chrome Extension
https://github.com/2006-nitro-homebrew/interest-me-browser-extension

Welcome to InterestMe - the best way to browse and save your favorite articles. Save your favorite articles, view them offline, and enjoy recommendations based on your saved articles list.

## Features

* Access Data Offline (Firestore)
InterestMe is responsible for storing user data as well as article data. Firestore is a non-relational database which would prove most useful for our database needs as we only have one relationship (user and article) and our application can scale horizontally as we add more users and articles.

Firestore supports offline data persistence. By having the ability to access data while the device is offline, users will have the ability to read, write, listen, or query the cached data provided by the Firestore offline persistence feature.

* Webscraping favorite articles (Cheerio & JSDOM)

Cheerio and JSDOM are used in conjunction to scrape web articles. Cheerio is responsible for scraping the text bodies of the article, while JSDOM scrapes the styling. In InterestMe, the article is rendered with the same format and style in order to replicate accordingly.

* Article Recommendations (Machine Learning Algorithm)

By our machine learning algorithm, InterestMe generates keywords of articles and uses an external News API to recommend similar articles based on the key words.

* Chrome Extension

Implemented a Chrome Extension which users can log in and save the current page as an article into the database. It is an alternative for the user to save and access the article offline.

## Technology
* Cheerio
* JSDOM
* Firebase / Firestore
* Express
* React
* Redux
* PWA (Progressive Web App)
* Material UI

## Start Locally

* Run ```npm run start-dev``` to run the website locally.
* If you want to run the server and/or webpack separately, you can also ```npm run start-server``` and ```npm run build-client```.

## Notes
* InterestMe webscraper currently only supports HTML based websites. It will not work for dynamic React-based websites.
