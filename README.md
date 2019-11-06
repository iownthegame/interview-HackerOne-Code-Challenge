## HackerOne Coding Challenge
### Build a Twitter Search Engine

* Design
    - Survey Twitter API
    - Design web interface

* Back-end
    -  Python 3.7 + Django Framework
    -  Implement an API for searching results of Twitter
    -  Call Twitter Standard Search API
        - create Twitter developer account and app
        - generating bearer tokne for API usage
        - survey Premium Search API and Standard Search API, including request (query excluding retweets and replies) and response format
        - count and sort hashtags
    -  Run
        - go to directory ```cd backend```
        - create Python virtualenv ```virtualenv -p python3 py3env```
        - activate env ```source py3.6env/bin/activate```
        - install packages ```pip install -r requirement.txt```
        - execute ```python manage.py runserver 0.0.0.0:8000```

* Front-end
    - React 16.11.10 + React Bootstrap
    - Implement a webpage for searching results of Twitter
    - Call Back-end API
        - Show Top 100 Results and Top 10 Hashtag Results
        - Show user profile(name, screen name, image), create time, text content, retweets count, favorites count, hashtags, hashtags count
        - Create links
            - user profile link: click user image, user name, user screen name
            - hashtag link: click on hashtags below the text
            - tweet link: click other areas of the tweet result
    - Support RWD
    - Run
        - go to directory ```cd frontend/search-engine-app```
        - install packages ```npm install```
        - set proxy in `package.json` ```"proxy": "http://localhost:8000"```
        - run dev ```npm run start```
        - run production ```npm run build```
        - open browser ```http://localhost:3000```
