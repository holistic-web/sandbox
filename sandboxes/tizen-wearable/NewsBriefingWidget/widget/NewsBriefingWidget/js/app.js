/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */


/*
 * We must declare global variables to let the validator know the
 * global variables we use.
 * To declare global variables, write global variables along with
 * default values inside a comment on top of each source code.
 * The comment should start with the keyword, global.
 */

/*global categoryColor: true, getNews: true*/

window.onload = function() {
    var startButton = document.getElementById('start-button'),
        firstNewsTitle = document.getElementById('first-news-title'),
        secondNewsTitle = document.getElementById('second-news-title'),
        newsCount = document.getElementById('news-count'),
        firstNewsCategory = document.getElementById('first-news-category'),
        secondNewsCategory = document.getElementById('second-news-category'),
        mainScreen = document.getElementById('main-screen'),
        newsScreen = document.getElementById('news-screen'),
        firstNews = document.getElementById('first-news-area'),
        secondNews = document.getElementById('second-news-area');

    var index = 0;
    var tempStr;
    var updateTimer, currentTimer;
    var newsData = {};
    var newsCountAccordingToTopic = [10, 9, 8, 8, 7, 6, 5, 4, 4, 4];

    mainScreen.style.display = 'none';
    newsScreen.style.display = 'block';

    /**
     * Makes the news widget.
     * The widget displays a list of headlines. A headline is also classified
     * into categories, such as politics, sport, etc. Also, a page counter is
     * displayed at the bottom of the widget.
     * @private
     */
    function makeNewsView (){
        if (index === newsData.newsCount) {
            index = 0;
        }

        if (newsData.newsCount > 1) {
            firstNewsCategory.textContent = newsData.news[index].category;
            if (newsData.news[index].title.length > 30) {
                tempStr = newsData.news[index].title.substring(0, 30);
                firstNewsTitle.textContent = tempStr + '...';
            } else {
                firstNewsTitle.textContent = newsData.news[index].title;
            }
            index++;

            if (index === newsData.newsCount) {
                index = 0;
            }

            secondNewsCategory.textContent = newsData.news[index].category;
            if (newsData.news[index].title.length > 30) {
                tempStr = newsData.news[index].title.substring(0, 30);
                secondNewsTitle.textContent = tempStr + '...';
            } else {
                secondNewsTitle.textContent = newsData.news[index].title;
            }
            index++;

            firstNewsCategory.style.backgroundColor = categoryColor[firstNewsCategory.textContent.replace(/ /gi, '')];
            secondNewsCategory.style.backgroundColor = categoryColor[secondNewsCategory.textContent.replace(/ /gi, '')];

            newsCount.textContent = '+ ' + (newsData.newsCount - 2);
        } else if (newsData.newsCount === 1) {
            firstNewsCategory.textContent = newsData.news[index].category;
            if (newsData.news[index].title.length > 30) {
                tempStr = newsData.news[index].title.substring(0, 30);
                firstNewsTitle.textContent = tempStr + '...';
            } else {
                firstNewsTitle.textContent = newsData.news[index].title;
            }
            index++;

            firstNewsCategory.style.backgroundColor = categoryColor[firstNewsCategory.textContent.replace(/ /gi, '')];
            newsCount.textContent = '+ 0';
        }
    }

    /**
     * Obtains selected headlines from the parent Web app.
     * News widgets displays the headlines of selected categories only.
     * @private
     */
    function getSelectedTopics() {
        var selectedTopic, i, a, temp, cate, pushCount;
        try{
            temp = window.tizen.preference.getValue('selectedTopics');

            selectedTopic = temp.split(',');

            var rawNews = getNews();
            updateTimer = new Date().getTime();
            newsData.news = [];
            newsData.newsCount = newsCountAccordingToTopic[selectedTopic.length-1] * selectedTopic.length;

            for (a = 0; a < selectedTopic.length; a++) {
                cate = selectedTopic[a].toUpperCase();
                pushCount = 0;
                for (i = 0; i < rawNews.newsCount; i++) {
                    if (rawNews.news[i].category === cate) {
                        if (newsCountAccordingToTopic[selectedTopic.length-1] > pushCount) {
                            newsData.news.push(rawNews.news[i]);
                            pushCount++;
                        } else {
                            break;
                        }
                    }
                }
            }
        } catch (e) {
            newsData = getNews();
            updateTimer = new Date().getTime();
        }
    }

    /**
     * Updates the widget by obtaining headlines.
     * @private
     */
    function updateNews() {
        getSelectedTopics();
    }

    /**
     * Move to agreement for policy page.
     * @private
     */
    function moveToPolicyAgreement() {
        getNews();
    }
    // start button click event
    startButton.addEventListener('click', moveToPolicyAgreement);

    /**
     * Runs news application.
     * When news category is clicked, the parent news application is
     * launched to display the news article.
     * @param {String} title: title of the application
     * @private
     */
    function launchApp(title) {
      var app = window.tizen.application.getCurrentApplication();
      var appId = app.appInfo.id.substring(0, (app.appInfo.id.lastIndexOf('.')) );
      var appControl = new window.tizen.ApplicationControl(title, null, null, null, null, null);
      window.tizen.application.launchAppControl(appControl, appId,
          function() {
              console.log("launch application control succeed");
          },
          function(e) {
              console.log("launch application control failed. reason: " + e.message);
          },
          null);
    }

    /**
     * Turns on the application from selected news.
     * @param {Object} e includes event object
     * @private
     */
    function moveToFisrtNews(e) {
        // move to first news page
        launchApp(e.target.textContent);
    }
    // first news click event
    firstNews.addEventListener('click', moveToFisrtNews);

    /**
     * Turns on the application from selected news.
     * @param {Object} e includes event object
     * @private
     */
    function moveToSecondNews(e) {
        // move to second news page
        launchApp(e.target.textContent);
    }

    // second news click event
    secondNews.addEventListener('click', moveToSecondNews);

    /**
     * Handles widget entry.
     * Update news every 30 mins.
     * @private
     */
    function handleVisibilityChange() {
        if (document.visibilityState === "visible") {
            currentTimer = new Date().getTime();
            if( (updateTimer < currentTimer - (1000 * 60 * 30)) ){
                updateNews();
            }
        }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // get news data every sixty minutes
    window.setInterval( function () {
        updateNews();
    }, 1000 * 60 * 60);

    // refresh news item every seven minutes
    window.setInterval( function () {
        makeNewsView();
    }, 1000 * 60 * 7);

    updateNews();
    makeNewsView();

    //add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
};
