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

/*global getNewsData: true, categoryColor: true, appNewsData: true, getAdditionalNews: true, swipedetect: true*/

(function() {
    var index = 0;
    var cate;
    var imageSizeFlag = false;
    var newsCountAccordingToTopic = [10, 9, 8, 8, 7, 6, 5, 4, 4, 4], selectedTopic;

    // three views
    var addArticleView = document.getElementById('add-article-view'),
        newsView = document.getElementById('news-view'),
        moreOptionView = document.getElementById('more-option-view'),
        topicSelectView = document.getElementById('select-topic-view');

    // in add article view
    var addArticleButton = document.getElementById('add-article-image');

    // in news view
    var newsImage = document.getElementById('news-image'),
        newsTitleStr = document.getElementById('news-title-str'),
        newsBody = document.getElementById('news-body'),
        newsCategory = document.getElementById('news-category'),
        moreOptionButton = document.getElementById('more-option'),
        newsBodyCp = document.getElementById('news-body-cp'),
        newsBodyDate = document.getElementById('news-body-date'),
        closeDetailNews = document.getElementById('close-detail-news');

    //in more-option view
    var selectTopicButton = document.getElementById('select-topic-button'),
        refreshButton = document.getElementById('refresh-button'),
        moreOptionTitle = document.getElementById('more-option-title'),
        currentFocus = document.getElementById('current-focus');
    var moreOptions = ['Select Topic', 'Refresh'], optionIndex = 0, currentFocusPosition = [[230, 90], [270, 125]];

    // select topic view
    var selectTopicClose = document.getElementById('topic-close');

    document.getElementById('news-view').setAttribute('tizen-circular-scrollbar', '');
    document.getElementById('select-topic-view').setAttribute('tizen-circular-scrollbar', '');

    var latestNewsData, currentPage;

    /**
     * Defines if the objects is equal.
     * @param {Object} obj the object will be compared
     * @private
     * @return {Boolean} flag returns whether the objects are equal or not
     */
    function isEqual(obj) {
        if (JSON.stringify(latestNewsData) === JSON.stringify(obj)){
            return true;
        } else {
            return false;
        }
    }

    /**
     * Gets Selected topic count.
     * This count will be used to manage news data.
     * Because provided news is 40 at most,
     * The news data will be differed by topic count.
     * @return {Number} count returns selected topic count
     * @private
     */
    function getSelectedTopicCount() {
        selectedTopic = [];
        var count = 0, i;
        for (i = 0; i < topicSelectView.childNodes.length; i++) {
            if (topicSelectView.childNodes[i].classList) {
                if (topicSelectView.childNodes[i].classList.contains('topics')) {
                    if (topicSelectView.childNodes[i].lastElementChild.checked) {
                        selectedTopic.push(topicSelectView.childNodes[i].firstElementChild.textContent);
                        count++;
                    }
                }
            }
        }
        return count;
    }

    /**
     * Gets news data based on selected topics.
     * @private
     */
    function getNewsdata() {
        var rawNews = getNewsData();
        latestNewsData = JSON.parse(JSON.stringify(rawNews));
        var i, a, pushCount;
        appNewsData.news = [];

        var count = getSelectedTopicCount();
        appNewsData.newsCount = newsCountAccordingToTopic[count-1] * count;

        for(a = 0; a < count; a++){
            cate = selectedTopic[a].toUpperCase();
            pushCount = 0;
            for(i = 0; i < rawNews.newsCount; i++){
                if (rawNews.news[i].category === cate) {
                    if(newsCountAccordingToTopic[count-1] > pushCount) {
                        appNewsData.news.push(rawNews.news[i]);
                        pushCount++;
                    } else {
                        break;
                    }
                }
            }
        }

        tizen.preference.setValue('appNewsData', JSON.stringify(appNewsData));
    }

    /**
     * Displays News data on the screen.
     * @private
     */
    function showNewsFromGettingData () {
        getNewsdata();
        showNewsView();
    }

    /**
     * Sets selected topic.
     * User can set own setting value about topic categories.
     * @param {Boolean} changeFlag The changeFlag means user change selected topic list
     * @private
     */
    function setSelectedTopic(changeFlag) {
        var topics = [], i, j;
        if(changeFlag) {
            for (i = 0; i < topicSelectView.childNodes.length; i++) {
                if (topicSelectView.childNodes[i].classList) {
                    if (topicSelectView.childNodes[i].classList.contains('topics')) {
                        if (topicSelectView.childNodes[i].lastElementChild.checked) {
                            topics.push(topicSelectView.childNodes[i].firstElementChild.textContent);
                        }
                    }
                }
            }

            tizen.preference.setValue('selectedTopics', ''+topics);
        } else {
            try{
                var temp = tizen.preference.getValue('selectedTopics');
                var selectedtopics = temp.split(',');

                for (i = 0; i < topicSelectView.childNodes.length; i++) {
                    if (topicSelectView.childNodes[i].classList) {
                        if (topicSelectView.childNodes[i].classList.contains('topics')) {
                            topicSelectView.childNodes[i].lastElementChild.checked = false;
                        }
                    }
                }

                for (i = 0; i < topicSelectView.childNodes.length; i++) {
                    if (topicSelectView.childNodes[i].classList) {
                        if (topicSelectView.childNodes[i].classList.contains('topics')) {
                            for(j = 0; j < selectedtopics.length; j++){
                                if (topicSelectView.childNodes[i].textContent.trim() === selectedtopics[j]) {
                                    topicSelectView.childNodes[i].lastElementChild.checked = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                for (i = 0; i < topicSelectView.childNodes.length; i++) {
                    if (topicSelectView.childNodes[i].classList) {
                        if (topicSelectView.childNodes[i].classList.contains('topics')) {
                            if (topicSelectView.childNodes[i].lastElementChild.checked) {
                                topics.push(topicSelectView.childNodes[i].firstElementChild.textContent);
                            }
                        }
                    }
                }

                tizen.preference.setValue('selectedTopics', ''+topics);
            }
        }
    }

    /**
     * Sets news' image size.
     * User can click image area.
     * If image is larger than screen size, the image height is set image size (maximum: screen size * 2)
     * @param {Object} e the e include event object.
     * @private
     */
    function setImageSize(e) {
        e.stopPropagation();
        if(imageSizeFlag === false) {
            if (parseInt(window.getComputedStyle(newsImage).height) < appNewsData.news[index].imageHeight) {
                if (appNewsData.news[index].imageHeight < (parseInt(window.getComputedStyle(document.body).height) * 2)) {
                    newsImage.style.height = appNewsData.news[index].imageHeight + 'px';
                } else {
                    newsImage.style.height = (parseInt(window.getComputedStyle(document.body).height) * 2) + 'px';
                }
                imageSizeFlag = true;
            }
        } else {
            resetImageSize(e);
        }
    }

    /**
     * Resets news' image size.
     * User can click image area.
     * If image is larger than screen size, the image height is set image size (maximum: screen size * 2)
     * And then, if user clone once again, the image size is set to original news' image size
     * @param {Object} e the e include event object.
     * @private
     */
    function resetImageSize(e) {
        if(e){
            e.stopPropagation();
        }
        newsImage.style.height = '180px';
        imageSizeFlag = false;
    }

    /**
     * Adds news data
     * User can scroll or rotary to previous or next news articles.
     * If the list is reached at the end of list,
     * the additional news data is added.
     * @param {String} at the position of end list
     * @private
     */
    function addAdditionalNews(at) {
        var i, j;
        var additionalNewsData = getAdditionalNews();
        if(!isEqual(additionalNewsData)){
            var count = getSelectedTopicCount();
            appNewsData.newsCount += count;

            for (i = 0; i < additionalNewsData.newsCount; i++) {
                for (j = 0; j < count; j++) {
                    if (additionalNewsData.news[i].category === selectedTopic[j].toUpperCase()) {
                        if(at === 'first'){
                            appNewsData.news.unshift(additionalNewsData.news[i]);
                            break;
                        } else if(at === 'final') {
                            appNewsData.news.push(additionalNewsData.news[i]);
                            break;
                        }
                    }
                }
            }

            latestNewsData = JSON.parse(JSON.stringify(additionalNewsData));
        } else {
            console.log('already existed data. do not add');
        }
    }

    /**
     * Refresh news data
     * When user want to move news page or change selected topic list,
     * refresh news data
     * @private
     */
    function refreshNews() {
        showNewsFromGettingData();
    }

    /**
     * Closes topic selection view
     * After setting selected topic, close the topic selection.
     * @param {Object} e the e include event object.
     * @private
     */
    function closeSelectTopicView(e) {
        e.stopPropagation();
        showMoreOptions();
    }

    /**
     * Closes detail news view.
     * @param {Object} e the e include event object.
     * @private
     */
    function closeDetailNewsView(e) {
        e.stopPropagation();
        showNewsView();
    }

    /**
     * Rotates more option list.
     * There are 'Select topic' and 'Refresh'.
     * If user use rotarydetent to CW, move the next list.
     * If user use rotarydetent to CCW, move the previous list.
     * @param {Number} idx the index of list
     * @private
     */
    function rotateMoreOption(idx) {
        optionIndex = idx;
        moreOptionTitle.textContent = moreOptions[optionIndex];
        currentFocus.style.marginLeft = currentFocusPosition[optionIndex][0] + 'px';
        currentFocus.style.marginTop = currentFocusPosition[optionIndex][1] + 'px';
    }

    /**
     * Moves to selected page on more option view
     * There are 'Select topic' and 'Refresh'.
     * If user click one of them, move to the page related on the selection.
     * @param {Object} e the e include event object.
     * @private
     */
    function movePageFromMoreOption(e) {
        if(e.target.textContent === 'Select Topic'){
            showSelectTopicView();
        } else if (e.target.textContent === 'Refresh'){
            refreshNews();
        }
    }

    /**
     * Generates event for the last item.
     * If scroll or rotate to the last item of list,
     * this function will be called.
     * @param {String} position indicate where is this end position
     * @private
     */
    function finalArticle() {
        addAdditionalNews('final');
    }

    /**
     * Generates event for the first item.
     * If scroll or rotate to the first item of list,
     * this function will be called.
     * @param {String} position indicate where is this end position
     * @private
     */
    function firstArticle() {
        addAdditionalNews('first');
    }

    /**
     * Displays news data in detail.
     * Add news body, cp, upload day on the news page
     * @private
     */
    function showDetailNews() {
        currentPage = 'detailNewsView';
        newsBody.textContent = appNewsData.news[index].body;
        newsBodyCp.textContent = appNewsData.news[index].cp;
        newsBodyDate.textContent = appNewsData.news[index].uploadDay;
        closeDetailNews.textContent = 'Close';
        closeDetailNews.style.display = 'block';
    }

    /**
     * Removes detailed news.
     * @private
     */
    function removeDetailNews() {
        newsBody.innerHTML = '';
        newsBodyCp.innerHTML = '';
        newsBodyDate.innerHTML = '';
        closeDetailNews.innerHTML = '';
        closeDetailNews.style.display = 'none';
    }

    /**
     * Displays news based on current index.
     * If index is over the news counter or under the 0, reset the index.
     * News view includes like below
     * News image : the image for news, if the image is not exists, alteranative image is inserted.
     * News title : the title for news, display only 2 line for readability.
     * News category: the category for news, category indicate what is topic about current news.
     * @private
     */
    function showNews() {
        if (index >= appNewsData.newsCount) {
            index = appNewsData.newsCount - 1;
        } else if (index <= 0) {
            index = 0;
        }

        removeDetailNews();
        resetImageSize();

        newsCategory.textContent = appNewsData.news[index].category;
        cate = newsCategory.textContent.replace(/ /gi, '');

        if (appNewsData.news[index].imagePath) {
            var downloadingImage = new Image();
            downloadingImage.onload = function() {
                newsImage.src = appNewsData.news[index].imagePath;
                appNewsData.news[index].imageWidth = this.width;
                appNewsData.news[index].imageHeight = this.height;
            };
            downloadingImage.src = appNewsData.news[index].imagePath;
            newsImage.style.backgroundColor = '#fff';
        }
        else {
            newsImage.src = 'image/b_briefings_no_image.png';
            newsImage.style.backgroundColor = categoryColor[cate];
        }

        newsTitleStr.textContent = appNewsData.news[index].title;
        newsCategory.style.backgroundColor = categoryColor[cate];
    }

    /**
     * Displays next news.
     * If idx is positive number, next news will be shown.
     * If idx is negative number, previous news will be shown.
     * @param {Number} idx indicates what is next news
     * @private
     */
    function showNextNews(idx) {
        index += idx;
        if (index === appNewsData.newsCount) {
            finalArticle();
        }
        else if (index < 0) {
            firstArticle();
        }

        showNews();
    }

    /**
     * Displays add article view.
     * If there is no news data, this view will be shown.
     * Clicking add on the centered image, get news data.
     * @private
     */
    function showAddArticleView() {
        currentPage = 'addArticleView';
        document.documentElement.style.backgroundColor = 'white';

        newsView.style.display = 'none';
        moreOptionView.style.display = 'none';
        topicSelectView.style.display = 'none';
        addArticleView.style.display = 'block';
    }

    /**
     * Displays news view.
     * If there are news, this view will be shown.
     * @private
     */
    function showNewsView() {
        currentPage = 'newsView';
        document.documentElement.style.backgroundColor = 'white';

        newsView.style.display = 'block';
        moreOptionView.style.display = 'none';
        topicSelectView.style.display = 'none';
        addArticleView.style.display = 'none';

        showNews();
    }

    /**
     * Displays more option view.
     * If user click 'more option' button on the news app screen, more option view will be shown.
     * In more option, there are 'Select topic' and 'Refresh'.
     * @param {Object} e includes event object
     * @private
     */
    function showMoreOptions(e) {
        if(e) {
            e.stopPropagation();
        }
        currentPage = 'moreOptionView';
        newsView.style.display = 'inline-block';
        moreOptionView.style.display = 'inline-block';
        topicSelectView.style.display = 'none';
        addArticleView.style.display = 'none';
        moreOptionTitle.textContent = moreOptions[optionIndex];
    }

    /**
     * Displays topic selection view.
     * If user want to change topic, user can set topics in this view.
     * @private
     */
    function showSelectTopicView() {
        currentPage = 'topicSelectView';
        document.documentElement.style.backgroundColor = 'black';

        newsView.style.display = 'none';
        moreOptionView.style.display = 'none';
        topicSelectView.style.display = 'block';
        addArticleView.style.display = 'none';
    }

    /**
     * Manage selected topics.
     * Count current selected topics.
     * If the selected topic count is one and user unselect it, the checkbox can not be unselect.
     * Also manage latest topic selection with news widget.
     * @param {Object} e includes event object
     * @private
     */
    function manageSelectedTopic(e) {
        var i, length = topicSelectView.childNodes.length, count = 0;
        for (i = 0; i < length; i++) {
            if (topicSelectView.childNodes[i].classList) {
                if (topicSelectView.childNodes[i].classList.contains('topics')) {
                    if (topicSelectView.childNodes[i].lastElementChild.checked) {
                        count++;
                    }
                }
            }
        }
        if (count <= 0) {
            e.target.checked = 'checked';
        }

        setSelectedTopic(true);
    }

    /**
     * Adds event each topic's checkbox.
     * @private
     */
    function topicSelectionInfo() {
        var i, length = topicSelectView.childNodes.length;
        for (i = 0; i < length; i++) {
            if (topicSelectView.childNodes[i].classList) {
                if (topicSelectView.childNodes[i].classList.contains('topics')) {
                    topicSelectView.childNodes[i].addEventListener('click', manageSelectedTopic, false);
                }
            }
        }
    }

    /**
     * Launches application.
     * This function for widget.
     * If click a news on widget, the clicked news will be shown on the application.
     * It means widget can run application and application can receive request from widget.
     * After receiving request, this function open appropriate news page.
     * @param {String} newsTitle include clicked news' title
     * @public
     */
    function launchAppPage(newsTitle) {
        for(var i = 0; i < appNewsData.newsCount; i++){
            if(appNewsData.news[i].title.substring(0, 30) === (newsTitle.substring(0, 30))){
                index = i;
                break;
            }
        }
        if(appNewsData.newsCount > 0){
            showNews();
        }
    }

    /**
     * Choose what is proper page based on current news data.
     * @private
     */
    function makeNewsAppView() {
        if (Object.keys(appNewsData).length === 0) {
            showAddArticleView();
        } else {
            showNewsView();
        }
    }

    /**
     * Detects swipe event.
     * In newsView, if there is swipe event, this function will be called.
     * If the swipe down, the previous news will be shown.
     * If the swipe up, the next news will be shown.
     * @private
     */
    swipedetect(newsView, function(swipedir) {
        if (swipedir === 'down') {
            showNextNews(-1);
        } else if (swipedir === 'up') {
            showNextNews(1);
        }
    });

    /**
     * Handles rotary event.
     * News App has four views such as 'news view', 'detailed news view', 'more option view', and 'topic selection view'.
     * Because rotary event can only added document, the event handling is important to the page.
     * Each views have own name, this handler handles based on the name.
     * @param {Object} e inlucdes event object
     * @private
     */
    function rotaryDetentHandler (e) {
        var direction = e.detail.direction;

        if(currentPage === 'newsView'){
            if (direction === "CW") {
                showNextNews(1);
            } else if (direction === "CCW") {
                showNextNews(-1);
            }
        } else if(currentPage === 'detailNewsView') {
            if (direction === "CW") {
                newsView.scrollTop += 50;
            } else if (direction === "CCW") {
                newsView.scrollTop -= 50;
            }
        } else if(currentPage === 'moreOptionView') {
            if (direction === "CW") {
                rotateMoreOption(1);
            } else if (direction === "CCW") {
                rotateMoreOption(0);
            }
        } else if(currentPage === 'topicSelectView') {
            if (direction === "CW") {
                topicSelectView.scrollTop += 50;
            } else if (direction === "CCW") {
                topicSelectView.scrollTop -= 50;
            }
        }
    }

    addArticleButton.addEventListener('click', showNewsFromGettingData);
    newsView.addEventListener('click', showDetailNews);
    closeDetailNews.addEventListener('click', closeDetailNewsView);
    moreOptionButton.addEventListener('click', showMoreOptions);
    selectTopicButton.addEventListener('click', showSelectTopicView);
    refreshButton.addEventListener('click', refreshNews);
    selectTopicClose.addEventListener('click', closeSelectTopicView);
    moreOptionTitle.addEventListener('click', movePageFromMoreOption);
    document.addEventListener('rotarydetent', rotaryDetentHandler);
    newsImage.addEventListener('click', setImageSize);

    //add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {
            }
        }
    });

    setSelectedTopic();
    makeNewsAppView();
    topicSelectionInfo();

    var reqAppControl;
    reqAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();

    if (reqAppControl && reqAppControl.appControl.operation) {
        launchAppPage(reqAppControl.appControl.operation);
    }
}());
