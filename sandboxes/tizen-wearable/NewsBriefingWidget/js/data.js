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

/*global getNewsData: true, categoryColor: true, appUpdateTimer: true, currentTimer: true, isNeededUpdate: true, appNewsData: true, getAdditionalNews: true*/

/*
 * There are data update logic, get news data logic, and get additional news data logic.
 * App data update logic : If 30 minutes had passed from last running time, update news data.
 * Get news data logic : Returns news data.
 * Get additional news data logic : Returns additional news data.
 * Also the color value included. This color value will be used news category.
 */

try {
    // check update timer if it had passed 30 minuets
    var updateTime = tizen.preference.getValue('appUpdateTimer');
    currentTimer = new Date().getTime();
    if( (updateTime < currentTimer - (1000 * 60 * 30)) ){
        updateTime = new Date().getTime();
        tizen.preference.setValue('appUpdateTimer', updateTime);
        isNeededUpdate = true;
    } else {
        isNeededUpdate = false;
    }
} catch(e) {
    appUpdateTimer = new Date().getTime();
    tizen.preference.setValue('appUpdateTimer', appUpdateTimer);
    isNeededUpdate = true;
}

try {
    appNewsData = JSON.parse(tizen.preference.getValue('appNewsData'));
} catch (e) {
    appNewsData = {};
}

categoryColor = {};

categoryColor.NEWS = '#E43726';
categoryColor.SPORTS = '#63B7B7';
categoryColor.CELEBRITY = '#E0AD2D';
categoryColor.BUSINESS = '#617175';
categoryColor.TECHNOLOGY = '#974A99';
categoryColor.SCIENCE = '#1C75BC';
categoryColor.TRAVEL = '#D33375';
categoryColor.ENTERTAINMENT = '#7691A5';
categoryColor.FOOD = '#A35928';
categoryColor.STYLE = '#A798BF';
categoryColor.SETTING = '#565656';

/*
 * Gets news data.
 * Basically, there are 10 news data.
 * Each news data include title, imagePath, body, category, cp, upload day, upload time, and id.
 * @public
 * @return {Object} news data
 */
getNewsData = function() {
    var news_data = {};
    news_data.newsCount = 100;
    news_data.news = [
        {
            'title': 'EU Hints It May Stop Speaking English To Spite UK',
            'imagePath': 'https://mises.org/sites/default/files/styles/slideshow/public/static-page/img/4011907999_d9d744a8f9_b.jpg?itok=LbEvy_fn',
            'body': 'It has now become abundantly clear that the bureaucrats at the EU are doing everything they can to punish the UK for voting to leave the EU.',
            'category': 'NEWS',
            'cp': 'Mises institute',
            'uploadDay': '2016/06/28',
            'uploadTime': '1005'
        },
        {
            'title': 'Hundreds arrested in protests over shootings by police',
            'imagePath': 'http://i2.cdn.turner.com/cnnnext/dam/assets/160710150456-london-blm-protest-medium-plus-169.jpg',
            'body': 'After another night of intense, and sometimes violent, protests against the police shootings of black men, hundreds of demonstrators were either in jail or waiting to get out Sunday.',
            'category': 'NEWS',
            'cp': 'CNN',
            'uploadDay': '2016/06/28',
            'uploadTime': '1010'
        },
        {
            'title': 'Dallas mother thanks police for shielding her and her son',
            'imagePath': 'http://cdn.flipboard.com/flipboard.com/f69a704ca9fabc5c9e5922189625a15798bd500d/large.jpg',
            'body': 'When the bullet struck her leg during the protest in downtown Dallas, Shetamia Taylor\'s first thoughts were for her four sons.',
            'category': 'NEWS',
            'cp': 'Returns',
            'uploadDay': '2016/06/28',
            'uploadTime': '1015'
        },
        {
            'title': 'U.S. transfers Yemeni from Guantanamo to Italy, 78 left',
            'imagePath': 'http://cdn.flipboard.com/flipboard.com/22432bae7ce4741d011e709166d790a80e04abcd/original.jpg',
            'body': 'The United States said on Sunday it has transferred a Yemeni inmate from the Guantanamo Bay prison to Italy, bringing the number of detainees at the U.S. naval base in Cuba to 78.',
            'category': 'NEWS',
            'cp': 'Returns',
            'uploadDay': '2016/06/28',
            'uploadTime': '1020'
        },
        {
            'title': 'Matador Fatally Gored in Spain for First Time Since 1985',
            'imagePath': 'http://media4.s-nbcnews.com/j/newscms/2016_27/1614316/160710-victor-barrio_ec4e848f3f1eb3999ba41514f5396e68.nbcnews-ux-320-320.jpg',
            'body': 'A bullfighter was fatally gored in Spain in an eastern town — the first professional matador to be killed in the ring in more than three decades.',
            'category': 'NEWS',
            'cp': 'NBC News',
            'uploadDay': '2016/06/28',
            'uploadTime': '1025'
        },
        {
            'title': 'Man looking for a stolen horse fatally shot after waving gun at Houston cops',
            'imagePath': 'http://a57.foxnews.com/images.foxnews.com/content/fox-news/us/2016/07/10/man-looking-for-stolen-horse-fatally-shot-after-waving-gun-at-houston-cops/_jcr_content/par/featured-media/media-0.img.jpg/876/493/1468174987428.jpg?ve=1&tl=1',
            'body': 'A man looking for a stolen horse was shot and killed when he waved a gun at two Houston police officers, according to a report Sunday.',
            'category': 'NEWS',
            'cp': 'FOX News',
            'uploadDay': '2016/06/28',
            'uploadTime': '1030'
        },
        {
            'title': 'Drink and drug-drivers who cause fatal crashes should be charged with manslaughter and face life sentences, nine in 10 people think',
            'imagePath': 'http://www.telegraph.co.uk/content/dam/news/2016/07/10/drink_drive-large_trans++qVzuuqpFlyLIwiB6NTmJwRbvcxDW4pTT9-lJSzKe6j4.jpg',
            'body': 'rink or drug-drivers who cause fatal crashes should be charged with manslaughter and should face life sentences in prison, nine in 10 people think.',
            'category': 'NEWS',
            'cp': 'The Telegraph',
            'uploadDay': '2016/06/28',
            'uploadTime': '1035'
        },
        {
            'title': '25,000 Venezuelans cross into Colombia as border reopens',
            'imagePath': 'http://www.dw.com/image/0,,19391869_303,00.jpg',
            'body': 'Soap, toilet paper, and most importantly medicine: these were the necessary items Venezuelans rushed through the border to buy. The border between the two countries had been closed for nearly a year.',
            'category': 'NEWS',
            'cp': 'DW',
            'uploadDay': '2016/06/28',
            'uploadTime': '1040'
        },
        {
            'title': 'Black Lives Matter activist Mckesson released from jail',
            'imagePath': 'http://cdn.flipboard.com/flipboard.com/bcd4ed17832f568f5a7620a9dc97955a35d65b4f/large.jpg',
            'body': 'Prominent Black Lives Matter activist DeRay Mckesson was released Sunday after a night in jail following his arrest in Baton Rouge while protesting the police killing of a black man.',
            'category': 'NEWS',
            'cp': 'AP',
            'uploadDay': '2016/06/28',
            'uploadTime': '1045'
        },
        {
            'title': 'Anti-Korea Sentiment Growing in China Due to THAAD',
            'imagePath': 'http://images.huffingtonpost.com/2016-07-10-1468148098-386280-2016071001000818900042181-thumb.jpg',
            'body': 'By Hong Soon-do, Beijing correspondent, AsiaToday - It seems China is strongly dissatisfied with the THAAD deployment in South Korea. While South Korean government believes it could ask China for understanding and persuade its unavoidable circumstances based on the good bilateral relations',
            'category': 'NEWS',
            'cp': 'World post',
            'uploadDay': '2016/06/28',
            'uploadTime': '1050'
        },

        {
            'title': 'French court convicts six English fans in apparent message to rioters',
            'imagePath': 'http://static.theglobeandmail.ca/168/sports/soccer/article30438276.ece/ALTERNATES/w220/so-euro13sp2.JPG',
            'body': 'A Marseille court convicted six English soccer fans Monday and handed prison sentences ranging from one-to-three months to five of them for involvement.',
            'category': 'SPORTS',
            'cp': 'The globe and mail',
            'uploadDay': '2016/06/28',
            'uploadTime': '1105'
        },
        {
            'title': 'US Olympic Trials 2016: Track and Field Sunday Results and Qualifying Times',
            'imagePath': 'http://img.bleacherreport.net/img/images/photos/003/610/907/hi-res-f80a8109f0a85d8d565bb40f63c9a11b_crop_north.jpg?w=512&h=341&q=75',
            'body': 'The last day of competition at the United States Olympic track and field trials set the final roster for the 2016 Olympics in Rio de Janeiro.',
            'category': 'SPORTS',
            'cp': 'Bleacher report',
            'uploadDay': '2016/06/28',
            'uploadTime': '1110'
        },
        {
            'title': 'Angels fall to Orioles, 4-2, as first half of the season comes to a close',
            'imagePath': 'http://www.trbimg.com/img-5782bbc3/turbine/la-1468185782-snap-photo/650/650x366',
            'body': 'The Angels finished the first half of their 2016 campaign the same way they endured it: sloppily. For the second straight day, a mental mistake provided the decisive run for the Baltimore Orioles at Camden Yards.',
            'category': 'SPORTS',
            'cp': 'Los Angeles Times',
            'uploadDay': '2016/06/28',
            'uploadTime': '1115'
        },
        {
            'title': 'Gordon Reid overcomes his disturbed night to write his name into the Wimbledon history books',
            'imagePath': 'http://www.telegraph.co.uk/content/dam/tennis/2016/07/10/gordon_reid-large_trans++qVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpg',
            'body': 'As Andy Murray prepared to lift his second Wimbledon title, his compatriot Gordon Reid wrote his own name into the history books by becoming the All England Club’s first ever men’s wheelchair singles champion.',
            'category': 'SPORTS',
            'cp': 'The Telegraph',
            'uploadDay': '2016/06/28',
            'uploadTime': '1120'
        },
        {
            'title': 'Steely Serena Williams promises there are more Majors to come after seventh Wimbledon success',
            'imagePath': 'http://www.telegraph.co.uk/content/dam/tennis/2016/07/10/williams_title-large_trans++qVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpg',
            'body': 'erena Williams could identify precisely the moment when she was ready to win a seventh Wimbledon. It was just before the tournament, in the wake of a scalding defeat to Garbiñe Muguruza in Paris, that she decided in an instant to cast all stress and melodrama aside.',
            'category': 'SPORTS',
            'cp': 'The Telegraph',
            'uploadDay': '2016/06/28',
            'uploadTime': '1125'
        },
        {
            'title': '3 things we learned as Portugal beat France 1-0 in extra time to win Euro 2016',
            'imagePath': 'https://cdn3.vox-cdn.com/thumbor/hoJCZF56kSC_ift-lS-AF1zfeio=/0x45:3022x2060/709x473/filters:format(webp)/cdn0.vox-cdn.com/uploads/chorus_image/image/50071405/GettyImages-545913558.0.jpg',
            'body': 'Neither home field advantage for France nor an early injury to Cristiano Ronaldo were enough to hold Portugal back, and they emerged from the Euro 2016 final triumphant, 1-0 winners in extra time over France.',
            'category': 'SPORTS',
            'cp': 'SB Nation',
            'uploadDay': '2016/06/28',
            'uploadTime': '1130'
        },
        {
            'title': 'Andy Murray Beats Milos Raonic to Win Second Wimbledon Title',
            'imagePath': 'https://static01.nyt.com/images/2016/07/11/sports/11WIMBLEDON/11WIMBLEDON-master768.jpg',
            'body': 'A three-year drought can surely not generate the same sort of anxiety as a 77-year drought.',
            'category': 'SPORTS',
            'cp': 'The New York Times',
            'uploadDay': '2016/06/28',
            'uploadTime': '1135'
        },
        {
            'title': 'Olympic double hopes dashed as Felix misses 200m team',
            'imagePath': 'http://cdn.flipboard.com/flipboard.com/a4005231e171412dde9a70a669658d16dc120c00/original.jpg',
            'body': 'Olympic champion Allyson Felix failed to make the U.S. team in the 200 meters at the American trials on Sunday, ending her dream for a rare 200-400 meters double at Rio Olympics.',
            'category': 'SPORTS',
            'cp': 'Returns',
            'uploadDay': '2016/06/28',
            'uploadTime': '1140'
        },
        {
            'title': 'Force India target fourth, switch focus to 2017 car',
            'imagePath': 'http://cdn.flipboard.com/flipboard.com/d16270a8c27de2859c2e84cb642fecf45f0131df/original.jpg',
            'body': 'Force India principal Vijay Mallya hailed a big step forward for his Silverstone-based Formula One team on Sunday even if their main focus of development has shifted to next year\'s car.',
            'category': 'SPORTS',
            'cp': 'Returns',
            'uploadDay': '2016/06/28',
            'uploadTime': '1145'
        },
        {
            'title': 'Josh Reddick Trade Rumors: Latest News, Speculation on Athletics Outfielder',
            'imagePath': 'http://img.bleacherreport.net/img/images/photos/003/610/889/hi-res-325aeb4ad4f99b4b50ed6615e25b912d_crop_north.jpg?w=630&h=420&q=75',
            'body': 'Oakland Athletics right fielder Josh Reddick is playing under a one-year, $6.6 million contract, per Spotrac. With Major League Baseball\'s Aug.',
            'category': 'SPORTS',
            'cp': 'Bleacher report',
            'uploadDay': '2016/06/28',
            'uploadTime': '1150'
        },

        {
            'title': 'This Video of Chrissy Teigen Calling to Her Slow-but-Steady English Bulldog Is Hilarious',
            'imagePath': 'http://cdn-img.instyle.com/sites/default/files/styles/684xflex/public/images/2016/06/062216-chrissy-teigen.jpg?itok=IcyAbiOy',
            'body': 'In the video (below), Teigen exercised some impressive patience as Puddy made his way over.',
            'category': 'CELEBRITY',
            'cp': 'InStyle',
            'uploadDay': '2016/06/28',
            'uploadTime': '1205'
        },
        {
            'title': 'Kate Middleton Is Hands-Down the Cutest Cheerleader During Her Wimbledon Outing With Prince William',
            'imagePath': 'http://media3.popsugar-assets.com/files/2016/07/10/711/n/1922398/d5061ea8d491f7e4_GettyImages-545828240HrPVsZ.xxxlarge/i/Prince-William-Kate-Middleton-Wimbledon-July-2016.jpg',
            'body': 'Could Kate Middleton be any cuter? On Sunday, the duchess and Prince William attended the men\'s final of the Wimbledon Tennis Championships to watch Andy Murray take on Milos Raonic, but it was Kate\'s adorable cheerleader antics that nearly stole the show.',
            'category': 'CELEBRITY',
            'cp': 'Pop Sugar',
            'uploadDay': '2016/06/28',
            'uploadTime': '1210'
        },
        {
            'title': 'Hospitals learn that sleep is good medicine',
            'imagePath': 'http://www.gannett-cdn.com/-mm-/a338fe58b080f65c15cb35368f7db03237387837/c=43-0-711-502&r=x404&c=534x401/local/-/media/2016/06/30/USATODAY/USATODAY/636028900331723545-hospital.JPG',
            'body': 'Nine-year-old McKenna Meuller of Los Angeles used to hate when she had to go to the hospital to get treated for her lung infections. All night long she’d get poked and prodded, leaving her feeling worse-off than if she’d stayed at home.',
            'category': 'CELEBRITY',
            'cp': 'USA Today',
            'uploadDay': '2016/06/28',
            'uploadTime': '1215'
        },
        {
            'title': 'Taylor Swift & Tom Hiddleston Already Talking About Kids: She Thinks He "Would Make a Great Dad"',
            'imagePath': 'http://www.eonline.com/eol_images/Entire_Site/2016610/rs_634x1024-160710072938-634.taylor-sift-tom-hiddleston.cm.71016.jpg',
            'body': 'Taylor Swift and Tom Hiddleston\'s relationship appears to be moving forward even faster than originally thought.',
            'category': 'CELEBRITY',
            'cp': 'E News',
            'uploadDay': '2016/06/28',
            'uploadTime': '1220'
        },
        {
            'title': 'Chaka Khan Entering Rehab, Says Prince’s Death Was Motivation',
            'imagePath': 'http://www.eonline.com/eol_images/Entire_Site/2016610/rs_634x1024-160710072938-634.taylor-sift-tom-hiddleston.cm.71016.jpg',
            'body': '”The tragic death of Prince has had us both rethinking and re-evaluating our lives and priorities”',
            'category': 'CELEBRITY',
            'cp': 'Pitchfork',
            'uploadDay': '2016/06/28',
            'uploadTime': '1225'
        },
        {
            'title': 'Did Princess Kate Commit a Style No-No with This Retro Hair Trend?',
            'imagePath': 'http://img2-1.timeinc.net/people/i/2016/news/160704/princess-kate-h-800.jpg',
            'body': 'Princess Kate is having a retro moment! Last week, the royal sported a \'60s-inspired pill box hat that perfectly channeled Jackie O., and on Friday, she took us back to the \'80s with a headband!',
            'category': 'CELEBRITY',
            'cp': 'People',
            'uploadDay': '2016/06/28',
            'uploadTime': '1230'
        },
        {
            'title': 'Delicate Summer Accents That Make Getting Dressed So Simple',
            'imagePath': 'https://assets.rbl.ms/1627190/600x600.jpg',
            'body': 'Let\'s face it, summer is all about that easy, chic style that most of us gravitate towards. Whether you\'re packing for a trip or taking in the city streets—it can be hot.',
            'category': 'CELEBRITY',
            'cp': 'The Outfit',
            'uploadDay': '2016/06/28',
            'uploadTime': '1235'
        },
        {
            'title': 'Brooke Mason: Celebrity Photographer, Feminist & Fashion Gal',
            'imagePath': 'http://images.huffingtonpost.com/2016-07-09-1468080978-1623748-BrookeMason_Headshot-thumb.jpg',
            'body': 'Brooke Mason takes riveting photos which literally pierce right through me. She somehow gets her subjects eyes to sparkle, every time.',
            'category': 'CELEBRITY',
            'cp': 'The Huffington post',
            'uploadDay': '2016/06/28',
            'uploadTime': '1240'
        },
        {
            'title': 'Kate Moss Shuts Down the Paparazzi with One Very NSFW T-Shirt',
            'imagePath': 'http://img2.timeinc.net/people/i/2016/stylewatch/blog/160704/kate-moss-ts-600x800.jpg',
            'body': 'The celebrity versus paparazzi battle wages on. Cara Delevingne notoriously said she wishes she could “pour molten cheese on them” and now another high-fashion supermodel is doing her part to stop the paps.',
            'category': 'CELEBRITY',
            'cp': 'People',
            'uploadDay': '2016/06/28',
            'uploadTime': '1245'
        },
        {
            'title': 'Wearing a Mermaid Wedding Dress? This Celeb Trainer Has the Workout You NEED to Try',
            'imagePath': 'http://cdn-img.instyle.com/sites/default/files/styles/684xflex/public/1467894503/shot_02_063_RETOUCHED_FLAT_WHITE.jpg?itok=3wACS8MB',
            'body': 'Are you ready to twerk?! You finally found your dream wedding dress: a super-sexy, curve hugging mermaid gown.',
            'category': 'CELEBRITY',
            'cp': 'InStyle',
            'uploadDay': '2016/06/28',
            'uploadTime': '1250'
        },

        {
            'title': 'Bank of England considers interest rate cut to tackle Brexit crisis',
            'imagePath': 'https://i.guim.co.uk/img/media/c6f9d3d109cc103fd4efab5fe0fbce93a7bf734a/0_27_3000_1800/master/3000.jpg?w=620&q=55&auto=format&usm=12&fit=max&s=edbc5da0e80074c7ff2452b5c5da8de2',
            'body': 'The Bank of England will consider the first interest rate cut for more than seven years this week, as it seeks to contain the economic fallout from the Brexit vote.',
            'category': 'BUSINESS',
            'cp': 'The guardian',
            'uploadDay': '2016/06/28',
            'uploadTime': '1305'
        },
        {
            'title': 'A former Keurig executive explained why he left to work at the \'Keurig of Cannabis\'',
            'imagePath': 'http://static3.businessinsider.com/image/576300a19105842b008c9873-2400/expo31.jpg',
            'body': 'What do the coffee business and the cannabis business have in common? As it turns out, it\'s more than people might expect.',
            'category': 'BUSINESS',
            'cp': 'Business Insider',
            'uploadDay': '2016/06/28',
            'uploadTime': '1310'
        },
        {
            'title': 'The diet industry is dying as a new mentality takes hold in America',
            'imagePath': 'http://static6.businessinsider.com/image/577fbc6b4321f172088b6c5c-2222/nutrisystem-18.jpg',
            'body': 'A major shift in American attitudes is changing the game for diet companies and the food industry. Americans are no longer obsessed with just losing weight, and it\'s completely changing the dieting industry as a whole.',
            'category': 'BUSINESS',
            'cp': 'Business Insider',
            'uploadDay': '2016/06/28',
            'uploadTime': '1315'
        },
        {
            'title': 'Asia stocks rally on U.S. jobs relief, BoE looms',
            'imagePath': 'http://cdn.flipboard.com/flipboard.com/c30124fbff42005c405fe165ab7cf5d92bb4e7f5/original.jpg',
            'body': 'Asian share markets enjoyed a relief rally on Monday as upbeat U.S. jobs data lessened immediate concerns about health of the world\'s largest economy, though long-run fallout from Brexit kept sovereign yields near record lows.',
            'category': 'BUSINESS',
            'cp': 'Returns',
            'uploadDay': '2016/06/28',
            'uploadTime': '1320'
        },
        {
            'title': 'Nintendo shares soar on Pokemon smartphone success',
            'imagePath': 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/8646/production/_90347343_gettyimages-170511579-1.jpg',
            'body': 'The company has been late to enter the smartphone gaming market but last week launched a smartphone version of its popular Pokemon game.',
            'category': 'BUSINESS',
            'cp': 'BBC News',
            'uploadDay': '2016/06/28',
            'uploadTime': '1325'
        },
        {
            'title': 'Brexit uncertainty has hit UK business says BDO',
            'imagePath': 'http://ichef-1.bbci.co.uk/news/660/media/images/80019000/jpg/_80019015_79418116.jpg',
            'body': 'Uncertainty around Brexit has dragged UK business output and optimism to three-year lows, a new report suggests. The report on business trends from the accountancy and services group BDO said the UK economy was already showing signs of slowing ahead of the EU vote.',
            'category': 'BUSINESS',
            'cp': 'BBC News',
            'uploadDay': '2016/06/28',
            'uploadTime': '1330'
        },
        {
            'title': 'What Wall Street’s Obsession With Blockchain Means for the Future of Banking',
            'imagePath': 'https://fortunedotcom.files.wordpress.com/2016/07/gettyimages-510363560.jpg?w=840&h=485&crop=1',
            'body': 'Howard Yu is professor of strategic management and innovation at IMD. He specializes in technological innovation, strategic transformation and change management. In 2015 Professor Yu was featured in Poets & Quants as one of the Best 40 Under 40 Professors.',
            'category': 'BUSINESS',
            'cp': 'Fortune',
            'uploadDay': '2016/06/28',
            'uploadTime': '1335'
        },
        {
            'title': 'As yuan weakens, Chinese stock investors seek safety in Hong Kong',
            'imagePath': 'http://cdn.flipboard.com/flipboard.com/30027240f1785292a0115d5f3ba8c2e877b8df04/original.jpg',
            'body': 'hinese investors are placing increasing bets on Hong Kong stocks, partly in search of a safe haven from the decline in the yuan, which fell last week to its lowest levels against the dollar since 2010.',
            'category': 'BUSINESS',
            'cp': 'Returns',
            'uploadDay': '2016/06/28',
            'uploadTime': '1340'
        },
        {
            'title': '30 jobs that are quickly disappearing in the US',
            'imagePath': 'http://static2.businessinsider.com/image/568eef69c08a80ae2f8b6e30-3045-2284/rtr2xttg.jpg',
            'body': 'Thanks in part to advances like email, Facebook, and Twitter, mail carriers may be all but obsolete in the not-so-distant future.',
            'category': 'BUSINESS',
            'cp': 'Business Insider',
            'uploadDay': '2016/06/28',
            'uploadTime': '1345'
        },
        {
            'title': 'Miners still nursing a hangover as prices threaten to turn again',
            'imagePath': 'http://www.telegraph.co.uk/content/dam/business/2016/04/11/Mining_pic-large_trans++pJliwavx4coWFCaEkEsb3kvxIt-lGGWCWqwLa_RXJU8.jpg',
            'body': 'If 2015 was a year that saw mining stocks crushed by falling commodity prices, 2016 has been a dazed stagger back into the light. The share prices of the major London-listed miners have bounced back further than many would have dared hope six months ago.',
            'category': 'BUSINESS',
            'cp': 'The Telegraph',
            'uploadDay': '2016/06/28',
            'uploadTime': '1350'
        },

        {
            'title': 'WhatsApp vs. Signal vs. Google Allo: Which is best for privacy?',
            'imagePath': 'http://i.amz.mshcdn.com/v1drIpXZX7blWrX2RFIPqXlBr4w=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F129448%2FPhone-20.jpg',
            'body': 'This spring, text messages got a lot more private. In April, the world’s most popular messaging service, WhatsApp, announced it would use end-to-end encryption',
            'category': 'TECHNOLOGY',
            'cp': 'Mashable Asia',
            'uploadDay': '2016/06/28',
            'uploadTime': '1405'
        },
        {
            'title': 'Major telecoms promise 5G networks if EU cripples net neutrality',
            'imagePath': 'https://cdn2.vox-cdn.com/thumbor/zopl9I42hlZK7VwXABUSGZCuDcI=/0x35:1019x608/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/50068239/telekom-headquarter-to-the-daily.0.jpg',
            'body': 'A group of 20 major telcos including Deutsche Telekom, Nokia, Vodafone, and BT promise to launch 5G networks in every country in the European Union by 2020 — so long as governments decide to weaken net neutrality rules.',
            'category': 'TECHNOLOGY',
            'cp': 'The Verge',
            'uploadDay': '2016/06/28',
            'uploadTime': '1410'
        },
        {
            'title': 'The reward for mining Bitcoin was just cut in half',
            'imagePath': 'https://cdn.flipboard.com/flipboard.com/51e3f59965398cc3c3d3f598def127b8bc17f5b7/large.jpg',
            'body': 'It’s Halvening!!! Bitcoin just experienced a major milestone in its short little lifespan. The reward for mining a block (a block = a ledger of transaction data) was just cut in half from 25 bitcoins to 12.5 bitcoins.',
            'category': 'TECHNOLOGY',
            'cp': 'Techcrunch',
            'uploadDay': '2016/06/28',
            'uploadTime': '1415'
        },
        {
            'title': 'Jack Ma says being sued and investigated will help Alibaba be better understood',
            'imagePath': 'https://venturebeat.com/wp-content/uploads/2015/11/2015-11-11T144752Z_3_LYNXNPEBAA0LM_RTROPTP_4_CHINA-SINGLESDAY-ALIBABA-930x661.jpg',
            'body': 'Lawsuits and investigations are an opportunity for Alibaba Group Holding Ltd to be better understood, founder and executive chairman Jack Ma said in an interview on Saturday.',
            'category': 'TECHNOLOGY',
            'cp': 'Venture beat',
            'uploadDay': '2016/06/28',
            'uploadTime': '1420'
        },
        {
            'title': '6 unusual Facebook Messenger chatbots you should try',
            'imagePath': 'https://venturebeat.com/wp-content/uploads/2016/07/Gymbot-930x512.png',
            'body': 'Chatbots for Facebook Messenger are in that awkward phase of development when they are mostly a proof of concept and a way to demonstrate potential. Most of the bots available today do not quite match the artificial intelligence you’ll find in a Tesla or at Google.',
            'category': 'TECHNOLOGY',
            'cp': 'Venture beat',
            'uploadDay': '2016/06/28',
            'uploadTime': '1425'
        },
        {
            'title': 'Mr. Robot Season 2 premieres on Twitter',
            'imagePath': 'http://i.amz.mshcdn.com/Qfa4sXHtZouYB-YIdjirFNe-Ejo=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F140554%2Fmrrbt97.jpg',
            'body': 'With pretty much no warning at all, the video appeared on the show\'s official Twitter page Sunday evening. And this isn\'t a short preview or outtake, this is the entire first episode.',
            'category': 'TECHNOLOGY',
            'cp': 'Mashable Asia',
            'uploadDay': '2016/06/28',
            'uploadTime': '1430'
        },
        {
            'title': 'This Samsung Galaxy S7 ZeroLemon case has a huge 7,500 mAh battery',
            'imagePath': 'http://www.androidauthority.com/wp-content/uploads/2016/07/zerolemon-galaxy-s7-1-840x630.jpg',
            'body': 'The Samsung Galaxy S7 has a handsome 3,000 mAh battery that should keep your phone alive for long, but we all know how those weekend adventures can get.',
            'category': 'TECHNOLOGY',
            'cp': 'Android Authority',
            'uploadDay': '2016/06/28',
            'uploadTime': '1435'
        },
        {
            'title': '10 amazing Prisma app images that started as simple selfies',
            'imagePath': 'http://i.amz.mshcdn.com/GFg8YEgxdtTrAKvPvnPfZXAtNmM=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F140413%2Fprms9087a.jpg',
            'body': 'The Prisma app, which transforms normal photos into amazing images that attempt to replicate the human artistic touch, is officially a hit.',
            'category': 'TECHNOLOGY',
            'cp': 'Mashable Asia',
            'uploadDay': '2016/06/28',
            'uploadTime': '1440'
        },
        {
            'title': 'Crowdfunding project of the week: Solos Smart Cycling Glasses',
            'imagePath': 'http://cdn01.androidauthority.net/wp-content/uploads/2016/07/solos-1.png',
            'body': 'Crowdfunding websites like Kickstarter and Indiegogo are full of innovation, but they also have plenty of gadgets we can live without and even some scammers.',
            'category': 'TECHNOLOGY',
            'cp': 'Android Authority',
            'uploadDay': '2016/06/28',
            'uploadTime': '1445'
        },
        {
            'title': 'Google Study Finds Enterprises Who Trust The Cloud Beyond Cutting Costs See Revenue Growth',
            'imagePath': 'http://blogs-images.forbes.com/louiscolumbus/files/2016/07/trust-rapid.jpg',
            'body': 'The study is quick to point out that higher trust in cloud computing alone doesn’t lead to better financial results, and “put simply, higher cloud trust appears to facilitate behavioural and process change within an organisation,” according to the study’s results.',
            'category': 'TECHNOLOGY',
            'cp': 'Forbes',
            'uploadDay': '2016/06/28',
            'uploadTime': '1450'
        },

        {
            'title': '12 Secrets of the Witness Protection Program',
            'imagePath': 'http://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/hires_19.jpg',
            'body': 'Developed by Justice Department employee Gerald Shur and beginning in 1971, the Federal Witness Protection Program—or Witness Security Program (WITSEC)—has provided safe harbor',
            'category': 'SCIENCE',
            'cp': 'Mental floss',
            'uploadDay': '2016/06/28',
            'uploadTime': '1505'
        },
        {
            'title': 'What Would Happen If Bees Went Extinct?',
            'imagePath': 'http://cdn.iflscience.com/images/818dd0b1-5814-5c20-bd85-f2f4cd703338/extra_large-1464362324-1387-what-would-happen-if-bees-went-extinct.jpg',
            'body': 'Most people who think about bees, think about getting stung. But that doesn’t do these incredible creatures justice. Bees fly through their life in search of flowers. They do so to collect pollen, which is a source of protein, for their hive and developing offspring.',
            'category': 'SCIENCE',
            'cp': 'IFL Science',
            'uploadDay': '2016/06/28',
            'uploadTime': '1510'
        },
        {
            'title': 'New Science Experiment Will Tell Us If The Universe Is a Hologram',
            'imagePath': 'https://s3-eu-west-1.amazonaws.com/3tags-prod/article/e3edbc3165cbaf965e4e39e81001a7f883f9d5c5/5782483b11971/original.JPG',
            'body': 'Do we live in a two-dimensional hologram? Scientists may discover that we live in a Matrix-like illusion during an experiment from the U.S. Department of Energy’s Fermi National Accelerator Laboratory that will look for “holographic noise” and will collect data over the next years.',
            'category': 'SCIENCE',
            'cp': '3Tags',
            'uploadDay': '2016/06/28',
            'uploadTime': '1515'
        },
        {
            'title': 'Bees Have Supposedly Been Trained To Make Honey From Cannabis Plants',
            'imagePath': 'http://cdn.iflscience.com/images/240baf29-6c9e-590a-8f3e-f66354a90745/extra_large-1464386086-376-bees-have-supposedly-been-trained-to-make-honey-from-cannabis-plants.jpg',
            'body': 'Nicholas Trainer is many things: an artist, a locksmith, and perhaps most importantly, a beekeeper. Bees are, of course, known for their ability to make honey, the superbly delicious golden ooze enjoyed by millions across the world.',
            'category': 'SCIENCE',
            'cp': 'IFL Science',
            'uploadDay': '2016/06/28',
            'uploadTime': '1520'
        },
        {
            'title': 'Science has figured out why dogs love to stick their heads out car windows',
            'imagePath': 'http://images.hellogiggles.com/uploads/2016/07/09165817/GettyImages-542018995.jpg',
            'body': 'Sometimes, when I want to feel particularly alert while being driven around in a car, I’ll put the window down and stick my head out the window, taking in the passing breeze and letting it, essentially, wake me up. These moments are generally good;',
            'category': 'SCIENCE',
            'cp': 'Hello Giggless',
            'uploadDay': '2016/06/28',
            'uploadTime': '1525'
        },
        {
            'title': 'A malicious version of Pokemon Go is infecting Android phones',
            'imagePath': 'http://www.sciencealert.com/images/articles/processed/pokemon_web_1024.jpg',
            'body': 'Pokémon Go is the hot mobile game of the moment. Unfortunately, not everyone can play it. International rollout of the game has been paused while Nintendo and The Pokémon Company work on fixing server capacity.',
            'category': 'SCIENCE',
            'cp': 'Science alert',
            'uploadDay': '2016/06/28',
            'uploadTime': '1530'
        },
        {
            'title': 'Astronomers Have Detected Clouds Of Water Outside Our Solar System',
            'imagePath': 'http://img.huffingtonpost.com/asset/scalefit_630_noupscale/57824bfc1a00002600dd07ac.jpeg?cache=qp8phqbzb2',
            'body': 'The remarkable find was located 7.2 light years from Earth on a brown dwarf ― a type of low-mass star ― called WISE 0855. It’s described as the coldest known object outside of our solar system and “strikingly similar to Jupiter.”',
            'category': 'SCIENCE',
            'cp': 'The Huffington post',
            'uploadDay': '2016/06/28',
            'uploadTime': '1535'
        },
        {
            'title': 'The mysterious syndrome impairing astronauts’ eyesight',
            'imagePath': 'http://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBu8bAb.img?h=414&w=624&m=6&q=60&o=f&l=f&x=384&y=252',
            'body': 'In 2005, astronaut John Phillips took a break from his work on the International Space Station and looked out the window at Earth. He was about halfway through a mission that had begun in April and would end in October.',
            'category': 'SCIENCE',
            'cp': 'The Washington post',
            'uploadDay': '2016/06/28',
            'uploadTime': '1540'
        },
        {
            'title': 'Astronomy Picture of the Day',
            'imagePath': 'http://apod.nasa.gov/apod/image/1607/MoonJupiter_Fattinnanzi_960.jpg',
            'body': 'What\'s that next to the Moon? Jupiter -- and its four largest moons. Skygazers around planet Earth enjoyed the close encounter of planets and Moon in 2012 July 15\'s predawn skies',
            'category': 'SCIENCE',
            'cp': 'NASA',
            'uploadDay': '2016/06/28',
            'uploadTime': '1545'
        },
        {
            'title': 'Whale earwax could tell us more about carbon dioxide in our oceans',
            'imagePath': 'http://static.independent.co.uk/s3fs-public/styles/article_large/public/thumbnails/image/2016/07/07/15/minke-whale2.jpg',
            'body': 'A physiologist with wide-ranging interests, Stephen Trumble studies everything from rats to zebrafish, but these days whale earwax is taking over his Baylor University lab in Texas.',
            'category': 'SCIENCE',
            'cp': 'Independent',
            'uploadDay': '2016/06/28',
            'uploadTime': '1550'
        },

        {
            'title': 'Chin Up, English Football Players, You Can Go Whale Watching In Iceland For Free',
            'imagePath': 'http://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/ef86a19c-e219-e511-8b9f-0050568e420d/630x355.jpg',
            'body': 'The Guardian reports there is some good news for Three Lions players who need a bit of a pick-me-up following the national sporting tragedy.',
            'category': 'TRAVEL',
            'cp': 'Travel PULSE',
            'uploadDay': '2016/06/28',
            'uploadTime': '1605'
        },
        {
            'title': 'Three countries urge caution traveling to U.S. amid protests, violence',
            'imagePath': 'http://cdn.flipboard.com/flipboard.com/5394397a2da656d3967b1d59f4a8aacf10107b70/original.jpg',
            'body': 'Three countries have warned their citizens to stay on guard when visiting U.S. cities rocked by sometimes violent protests that erupted after a string of police shootings of black Americans.',
            'category': 'TRAVEL',
            'cp': 'Returns',
            'uploadDay': '2016/06/28',
            'uploadTime': '1610'
        },
        {
            'title': 'The 7 Most Surprising Vacation Spots in the US',
            'imagePath': 'http://www.uncharted101.com/wp-content/uploads/Guadalupe-R-6.jpg',
            'body': 'Overcrowded and cramped may not be the type of vacation you had in mind this summer. Instead, discovering an off-the-beaten-path locale for your next destination is really what you’d like to find.',
            'category': 'TRAVEL',
            'cp': 'Uncharted 101',
            'uploadDay': '2016/06/28',
            'uploadTime': '1615'
        },
        {
            'title': '6 Airbnb Spots In Croatia For Less Than €60',
            'imagePath': 'https://cloud.lovin.ie/images/uploads/2016/05/_featuredImage/Screen-Shot-2016-05-04-at-13.08.16.png?mtime=20160504130842',
            'body': 'This rainy Saturday has given us quite the travel bug. That paired with the superbly reasonable prices of places all over the world means one thing - a nice healthy dose of escapism.',
            'category': 'TRAVEL',
            'cp': 'Lovin IE',
            'uploadDay': '2016/06/28',
            'uploadTime': '1620'
        },
        {
            'title': 'Vertically expandable four-storey RV that can fit in a parking spot',
            'imagePath': 'http://www.theglobeandmail.com/globe-drive/culture/technology/article30817807.ece/BINARY/w940/image.jpg',
            'body': 'The Extane is a recreational vehicle (RV) designed to be used in RV parks—and in cities—around the world. It could expand vertically to generate space while living inside it and provide an alternative to exploring the country by using existing infrastructure.',
            'category': 'TRAVEL',
            'cp': 'The globe and mail',
            'uploadDay': '2016/06/28',
            'uploadTime': '1625'
        },
        {
            'title': 'What are the most visited tourist attractions in cities around the world?',
            'imagePath': 'https://s3-eu-west-1.amazonaws.com/3tags-prod/article/e5eac76eecea6d34e3323c5b4be9010aacfd814f/57822e3cc2255/original.JPG',
            'body': 'We round up the most popular tourist attractions to visit or, if you hate tourists, to avoid. With more holidays approaching, families won’t all celebrate at home, like a Norman Rockwell painting. Hordes are hopping onto planes, trains and buses to play tourist all over the world',
            'category': 'TRAVEL',
            'cp': '3Tags',
            'uploadDay': '2016/06/28',
            'uploadTime': '1630'
        },
        {
            'title': 'How to dodge annoying fees when traveling abroad',
            'imagePath': 'http://www.gannett-cdn.com/-mm-/fa16621c00a85965931641efe2e9bc37933bac21/c=219-0-3645-2576&r=x404&c=534x401/local/-/media/2016/06/27/USATODAY/USATODAY/636026317955086878-ThinkstockPhotos-462061283.jpg',
            'body': 'Fees can chip away at your international travel budget. Each time you use your credit card or withdraw cash, you may be racking up fees that could have gone toward scuba-diving lessons or a frosty gelato.',
            'category': 'TRAVEL',
            'cp': 'USA Today',
            'uploadDay': '2016/06/28',
            'uploadTime': '1635'
        },
        {
            'title': 'How much does it cost to travel to the Czech Republic?',
            'imagePath': 'https://budgetyourtrip.s3.amazonaws.com/images/photos/headerphotos/czech_prague.jpg',
            'body': 'The Czech Republic, although not large, is rich in history and culture. It is a landlocked country in Central Europe with a lot to offer visitors.',
            'category': 'TRAVEL',
            'cp': 'Budget your trip',
            'uploadDay': '2016/06/28',
            'uploadTime': '1640'
        },
        {
            'title': '4 Solutions for Staying Healthy When You Travel',
            'imagePath': 'http://www.success.com/sites/default/files/styles/article_main/public/main/articles/tiptoptraveling.jpg?itok=tHJDkDXm',
            'body': 'If you travel often, it’s likely that, alongside some possible perks—flying in business class, staying at nice hotels, seeing sights or enjoying fresh local fare—you may find it challenging to maintain healthful eating and fitness habits.',
            'category': 'TRAVEL',
            'cp': 'Success',
            'uploadDay': '2016/06/28',
            'uploadTime': '1645'
        },
        {
            'title': 'Revealed: The best places to raise a family, be an entrepreneur or retire, if you\'re a global butterfly',
            'imagePath': 'http://www.telegraph.co.uk/content/dam/property/2016/07/09/lux_luxem_city-large_trans++piVx42joSuAkZ0bE9ijUnA8QS1d5AEdcMJ2lkWLqYx0.jpg',
            'body': 'Has Britain’s vote to leave the European Union put the kibosh on relocation to some of the most beautiful and cultural cities on the Continent?',
            'category': 'TRAVEL',
            'cp': 'The Telegraph',
            'uploadDay': '2016/06/28',
            'uploadTime': '1650'
        },

        {
            'title': 'Oscars push for more gender and ethnical diversity',
            'imagePath': 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/0272/production/_90162600_gettyimages-464191912.jpg',
            'body': 'Nearly 700 people were invited, with a focus on women and ethnic minorities. Should all of those agree to join, the demographic of the membership would only slightly change',
            'category': 'ENTERTAINMENT',
            'cp': 'BBC News',
            'uploadDay': '2016/06/28',
            'uploadTime': '1705'
        },
        {
            'title': '13 Summer TV Shows You Should Really Be Watching',
            'imagePath': 'http://i0.wp.com/telltaletv.com/wp-content/uploads/2016/07/26013_002_0737_R.jpg?resize=730%2C487',
            'body': 'Just because it’s summer doesn’t mean there isn’t a lot of great television available to watch. In fact, this summer brings some incredible new hits, old favorites, and even a few binge-worthy surprises.',
            'category': 'ENTERTAINMENT',
            'cp': 'Tell-Tale TV',
            'uploadDay': '2016/06/28',
            'uploadTime': '1710'
        },
        {
            'title': 'SEO WOO REVEALS WHY SHE DISAPPEARED FROM THE ENTERTAINMENT INDUSTRY FOR TWO YEARS',
            'imagePath': 'http://www.kpopmusic.com/wp-content/uploads/2015/11/seo-woo-reveals-why-she-disappeared-from-the-entertainment-industry-for-two-years.jpg',
            'body': 'Actress Seo Woo reveals the reason why she disappeared from the entertainment industry for two years.',
            'category': 'ENTERTAINMENT',
            'cp': 'K Pop Music',
            'uploadDay': '2016/06/28',
            'uploadTime': '1715'
        },
        {
            'title': 'Jon Bon Jovi reluctantly sings Livin\' On A Prayer at wedding reception',
            'imagePath': 'http://i.cbc.ca/1.3654202.1467038321!/cpImage/httpImage/image.jpg_gen/derivatives/16x9_620/food-bank-for-new-york-city-can-do-awards.jpg',
            'body': 'The next time Jon Bon Jovi attends a wedding reception, he might want to sit at the back.',
            'category': 'ENTERTAINMENT',
            'cp': 'CBC News',
            'uploadDay': '2016/06/28',
            'uploadTime': '1720'
        },
        {
            'title': 'TV Ratings Friday: NBC lands on top with the Olympic Trials',
            'imagePath': 'https://tvbtn.files.wordpress.com/2016/07/olympic-trials-womens-gymnastics-july-8-2016.jpg?quality=85&strip=all&w=400&h=225&crop=1',
            'body': 'The numbers for Friday, which include more high-scoring olympic trials on NBC, and a vast array of reruns throughout the rest of the night',
            'category': 'ENTERTAINMENT',
            'cp': 'TV by the numbers',
            'uploadDay': '2016/06/28',
            'uploadTime': '1725'
        },
        {
            'title': 'How Illumination Entertainment Became An Animation Powerhouse',
            'imagePath': 'http://static.srcdn.com/slir/w1000-h500-q90-c1000:500/wp-content/uploads/despicable-me-2010-movie-illumination.jpg',
            'body': 'Illumination Entertainment was founded in 2007. Since then, the animation company has seen its popularity soar, thanks to some great movies that really tapped into the hearts and minds of the movie-going public, particularly families.',
            'category': 'ENTERTAINMENT',
            'cp': 'Screen Rant',
            'uploadDay': '2016/06/28',
            'uploadTime': '1730'
        },
        {
            'title': 'Art form or entertainment',
            'imagePath': 'http://tns.thenews.com.pk/wp-content/uploads/2016/07/solaris-.jpg',
            'body': 'You might have heard of clichés like ‘nothing is original’ or ‘post-modernity had preceded modernity’ with regards to art. An observer of art will know not to take these statements literally.',
            'category': 'ENTERTAINMENT',
            'cp': 'The News on Sunday',
            'uploadDay': '2016/06/28',
            'uploadTime': '1735'
        },
        {
            'title': 'Tbo Touch to launch record label and entertainment company',
            'body': 'Only a few weeks after resigning from one of the biggest radio stations in South Africa, Metro FM, Tbo Touch has announced that he will be launching his own record label and entertainment company.',
            'category': 'ENTERTAINMENT',
            'cp': 'Sowetan',
            'uploadDay': '2016/06/28',
            'uploadTime': '1740'
        },
        {
            'title': 'Céline Dion live-streams her Paris concert on Facebook',
            'imagePath': 'http://i.cbc.ca/1.3670996.1468005668!/cpImage/httpImage/image.jpg_gen/derivatives/16x9_620/celine-dion.jpg',
            'body': 'Céline Dion took her show directly to the people Saturday with a live-stream from the last stop on her European tour.',
            'category': 'ENTERTAINMENT',
            'cp': 'CBC News',
            'uploadDay': '2016/06/28',
            'uploadTime': '1745'
        },
        {
            'title': '18 Of Our Favorite Events In Chicago This Weekend',
            'imagePath': 'http://chicagoist.com/attachments/Michelle%20Kopeny/2016_7_8_Luriesummer2014.jpg',
            'body': 'West Fest is a street fest celebration of the West Town neighborhood with live music, local vendors and it’s own “Pet Fest” Friday through Sunday.',
            'category': 'ENTERTAINMENT',
            'cp': 'Chicagoist',
            'uploadDay': '2016/06/28',
            'uploadTime': '1750'
        },

        {
            'title': 'English Muffins Are Now Big Enough To Hold Your Burger. Good Work, America.',
            'imagePath': 'http://img.huffingtonpost.com/asset/scalefit_630_noupscale/5764146d1500002a0073b282.jpeg?cache=3v0dc9z1z0',
            'body': 'Nothing says summer quite like a good burger. Nothing says best burger bun quite like an English muffin.',
            'category': 'FOOD',
            'cp': 'The Huffington post',
            'uploadDay': '2016/06/28',
            'uploadTime': '1805'
        },
        {
            'title': 'This One Pan Pizza-Topped Chicken Is Genius!',
            'imagePath': 'https://pixel.brit.co/wp-content/uploads/2016/07/One-pot-Pizza-chicken-bake-Step-finished-2.jpg',
            'body': 'Today we’re blinging up our breasts! Chicken breasts that is. We’re pizza-fying our dinner in a healthy way (though if you simply can’t resist that pizza dough, try one of these healthier pizza recipes instead).',
            'category': 'FOOD',
            'cp': 'BRIT+CO',
            'uploadDay': '2016/06/28',
            'uploadTime': '1810'
        },
        {
            'title': '10 pictures that show your daily recommended servings of fruits and vegetables',
            'imagePath': 'http://static6.businessinsider.com/image/577ff21388e4a725238b69ef-800/fruits%20and%20veggies%201.jpg',
            'body': 'What\'s the most important part of a nutritious diet? Most of us can automatically recite the answer: fruits and vegetables. And yet it can be tough to eat the daily recommended amount of produce, and most Americans simply don\'t.',
            'category': 'FOOD',
            'cp': 'Business Insider',
            'uploadDay': '2016/06/28',
            'uploadTime': '1815'
        },
        {
            'title': 'Top chefs share their winter comfort food recipes',
            'imagePath': 'http://www.goodfood.com.au/content/dam/images/g/q/1/7/y/d/image.related.wideLandscape.940x529.gpyo8e.png/1468197911381.jpg',
            'body': 'Ask someone in the food industry what they\'ve been up to lately and you\'ll receive an answer along the lines of "keeping warm". Making confit duck, soup – stuff like that.',
            'category': 'FOOD',
            'cp': 'Good food',
            'uploadDay': '2016/06/28',
            'uploadTime': '1820'
        },
        {
            'title': '25 Beautiful and Summery Blueberry Recipes',
            'imagePath': 'http://cdn.onegreenplanet.org/wp-content/uploads/2010/10//2016/07/blueberry-cream-pie.jpg',
            'body': 'It’s a fact that blueberries are the only naturally blue foods in existence and on July 10th, it’s time to grab a basket because it’s Pick Blueberries Day.',
            'category': 'FOOD',
            'cp': 'One green planet',
            'uploadDay': '2016/06/28',
            'uploadTime': '1825'
        },
        {
            'title': '10 Myths About Grains -- Totally Busted',
            'imagePath': 'http://img.aws.livestrongcdn.com/ls-article-image-640/cme/photography.prod.demandstudios.com/01680abb-692a-4e1a-862a-a8ffce5e21d4.jpg',
            'body': 'Afraid of the big, bad grain? Don’t be. While low-carb diets and carb cycling might still be all the rage, ancient whole grains like black rice and quinoa are coming into their own.',
            'category': 'FOOD',
            'cp': 'Live Strong',
            'uploadDay': '2016/06/28',
            'uploadTime': '1830'
        },
        {
            'title': 'Fast food still includes an ingredient with no purpose and plenty of negatives',
            'imagePath': 'http://static4.businessinsider.com/image/577fe53c4321f11b008b6ef5-2200/rtx61v1.jpg',
            'body': 'In Britain, McDonald’s fries have four ingredients: potatoes, vegetable oil, dextrose, and salt.',
            'category': 'FOOD',
            'cp': 'Business Insider',
            'uploadDay': '2016/06/28',
            'uploadTime': '1835'
        },
        {
            'title': 'DELICIOUS APPLE CRUMBLE BARS',
            'imagePath': 'http://lovefoodies.com/wp-content/uploads/2016/07/Delicious-Apple-Crumble-Bars12.jpg',
            'body': 'This recipe came about because a dear friend of mine recently gave me the baking dish you see in the photos. As soon as I saw it, I knew I had to make a brand new recipe using the dish and also I would let my friends have whatever it was I had made. Immediately',
            'category': 'FOOD',
            'cp': 'Love foodies',
            'uploadDay': '2016/06/28',
            'uploadTime': '1840'
        },
        {
            'title': 'Spring Detox Plan',
            'imagePath': 'http://cdn.agilitycms.com/naturally-savvy/Images/Legacy/stories-springdetoxplan250x200.jpg',
            'body': 'Spring is the perfect time for a detox. The changing seasons and the signs of new life sprouting all around us inspire better eating, getting organized (“spring cleaning”) and serve as a reminder that summer is just around the corner.',
            'category': 'FOOD',
            'cp': 'Naturally savvy',
            'uploadDay': '2016/06/28',
            'uploadTime': '1845'
        },
        {
            'title': 'Malwani Chicken Masala',
            'imagePath': 'http://maunikagowardhan.co.uk/wp-content/uploads/2012/05/1.Malwani-chicken-masala-31-567x378-1.jpg',
            'body': 'When all you can think of is food, fishing and feasting on a scrumptious menu then the journey doesn’t quite account for much however hectic, tiresome and long it might be.',
            'category': 'FOOD',
            'cp': 'Maunika Gowardhan',
            'uploadDay': '2016/06/28',
            'uploadTime': '1850'
        },

        {
            'title': 'WHAT IS A FRENCH COUNTRY KITCHEN VERSUS AN ENGLISH COUNTRY KITCHEN?',
            'imagePath': 'http://edc.h-cdn.co/assets/15/17/980x490/landscape-1429552526-karol-finalfinal-10.jpg',
            'body': 'The ambiguity and confusion is understandable, as these two design styles share many similarities. However, they are also incredibly distinguishable once you know the colors, textures, and fabrics',
            'category': 'STYLE',
            'cp': 'ELLE Decor',
            'uploadDay': '2016/06/28',
            'uploadTime': '1905'
        },
        {
            'title': '6 Korean Beauty Products Every Woman Needs in Her Skin Care Routine',
            'imagePath': 'http://media.glamour.com/photos/577ed0ead57edcdd4e65cd6a/1:1/w_680,c_limit/blithe_vital_treatment_8_nourishing_beans_1024x1024.jpg',
            'body': 'A hydration-booster with a thin, watery texture that allows it to penetrate your skin quickly and effectively.',
            'category': 'STYLE',
            'cp': 'Lipstick',
            'uploadDay': '2016/06/28',
            'uploadTime': '1910'
        },
        {
            'title': 'The Duchess of Cambridge wears Alexander McQueen to watch Andy Murray in the men\'s Wimbledon final',
            'imagePath': 'http://www.telegraph.co.uk/content/dam/fashion/2016/07/10/duchess-g-xlarge_trans++PjDZOdMgceQ0ik-fUDgEdjw7fjCv6ssUa3zXACBM5Qs.jpg',
            'body': 'Style-wise, it’s been quite the week for the Duchess of Cambridge.',
            'category': 'STYLE',
            'cp': 'The Telegraph',
            'uploadDay': '2016/06/28',
            'uploadTime': '1915'
        },
        {
            'title': 'This "100 Years of Beauty" Video Celebrates Two Sides of Puerto Rican Heritage',
            'imagePath': 'http://media.glamour.com/photos/578298bc6352b6be3fcbfa42/master/w_743,c_limit/puerto%20rico%20beauty%20video.jpg',
            'body': 'We\'re more than a little obsessed with the "100 Years of..." video series: From turn-of-the-century Brazil to modern-day Ethiopia, it takes viewers on a time-traveling global journey that explains culture by way of beauty and fashion.',
            'category': 'STYLE',
            'cp': 'Lipstick',
            'uploadDay': '2016/06/28',
            'uploadTime': '1920'
        },
        {
            'title': 'Sports Illustrated model Robyn Lawley ‘dropped from beauty contracts’ once they find out her size',
            'imagePath': 'http://www.independent.co.uk/s3/files/styles/article_large/public/thumbnails/image/2016/07/10/13/robynlawley.jpg',
            'body': 'Fashion has always been uniform when it comes to the body types appearing on catwalks, billboards and splashed across fashion magazines.',
            'category': 'STYLE',
            'cp': 'Independent',
            'uploadDay': '2016/06/28',
            'uploadTime': '1925'
        },
        {
            'title': 'FRENCH SINGER PETITE MELLER IS WINNING OVER THE MUSIC AND FASHION WORLDS ONE ROUGED CHEEK AT A TIME',
            'imagePath': 'https://assets.rbl.ms/2591461/980x.jpg',
            'body': 'Petite Meller, the enigmatic and ardently pro-rouge pop singer, is talking about one of the friskier animals featured in her "Baby Love" video, shot in Nairobi late last year.',
            'category': 'STYLE',
            'cp': 'Paper',
            'uploadDay': '2016/06/28',
            'uploadTime': '1930'
        },
        {
            'title': 'Dolce and Gabbana fete Sophia Loren in Naples Alta Moda collection',
            'imagePath': 'http://www.telegraph.co.uk/content/dam/fashion/2016/07/10/dolce-large_trans++qVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpg',
            'body': 'Four years ago when Domenico Dolce and Stefano Gabbana launched their first Alta Moda collection in Sicily, it was in front of 100 guests',
            'category': 'STYLE',
            'cp': 'The Telegraph',
            'uploadDay': '2016/06/28',
            'uploadTime': '1935'
        },
        {
            'title': 'For the Love of Vintage',
            'imagePath': 'http://www.alreadypretty.com/wp-content/uploads/2016/07/2016-07-09-15.27.31-1024x1024.jpg',
            'body': 'Hello there, I’m so happy to have the opportunity to share another post with you! I thought long and hard about what I wanted to discuss this time around and I decided that it’s high time that I really opened up my heart to you!',
            'category': 'STYLE',
            'cp': 'Already pretty',
            'uploadDay': '2016/06/28',
            'uploadTime': '1940'
        },
        {
            'title': 'Brooke Shields, Newly Minted Curator, Shares Her Culture Obsessions The \'80s supermodel and actress (and now curator) wakes up with the Times and never goes to bed without kissing her daughters goodnight.',
            'imagePath': 'http://www.wmagazine.com/wp-content/uploads/2016/07/GettyImages-544420602-630x420.jpg',
            'body': 'This week, Brooke Shields teamed up with the New York Academy of Arts’s David Kratz to curate “Call of the Wild,” an animal kingdom-focused exhibit of NYAA graduates now up from now until Monday at Nova’s Ark Project as part of Art Southampton.',
            'category': 'STYLE',
            'cp': 'Philipp Plein',
            'uploadDay': '2016/06/28',
            'uploadTime': '1945'
        },
        {
            'title': 'What 15 Fashion Industry Giants Looked Like Back in the Day',
            'imagePath': 'http://cliqueimg.com/cache/posts/197151/what-15-fashion-industry-giants-looked-like-back-in-the-day-1830876-1467989091.600x0c.jpg',
            'body': 'The online community (this author included) loves a good throwback photo. ',
            'category': 'STYLE',
            'cp': 'Who What Wear',
            'uploadDay': '2016/06/28',
            'uploadTime': '1950'
        }
    ];

    return news_data;
};

/*
 * Gets news data.
 * If the list ended, this function will be called.
 * The news list is reached at the first or last position, the additional data is needed.
 * Returns additional news data.
 * Each news data include title, imagePath, body, category, cp, upload day, upload time, and id.
 * @public
 * @return {Object} news data
 */
getAdditionalNews = function() {
    var additional_news_data = {};
    additional_news_data.newsCount = 10;
    additional_news_data.news = [
        {
            'title': 'EU Referendum: How it feels to be English as Brexit beckons',
            'imagePath': 'http://ichef.bbci.co.uk/news/660/cpsprodpb/D3AC/production/_90088145_hi033690842.jpg',
            'body': 'As the UK awoke to news it was heading towards Brexit it quickly became clear that it was England doing the driving. So how does it feel to be English on a day your nation has altered the face of Britain?',
            'category': 'NEWS',
            'cp': 'BBC News',
            'uploadDay': '2016/06/28',
            'uploadTime': '2005'
        },
        {
            'title': 'John Doyle: Brexit and English soccer – the end of excellence?',
            'imagePath': 'http://static.theglobeandmail.ca/03c/sports/soccer/article30667057.ece/ALTERNATES/w220/so-doyle28sp1.JPG',
            'body': 'When England exited Euro 2012 in Kiev, at the hands of Italy, I was there and recall the English had precisely one shot on target.',
            'category': 'SPORTS',
            'cp': 'The globe and mail',
            'uploadDay': '2016/06/28',
            'uploadTime': '2010'
        },
        {
            'title': 'This Hilarious Photo of Khloé Kardashian and North West Will Make Your Day',
            'imagePath': 'http://cdn-img.instyle.com/sites/default/files/styles/684xflex/public/images/2016/06/062316-khloe-kardashian-lead.jpg?itok=ROjI9WHp',
            'body': 'Our favorite? The snap she posted of herself with niece North West, which shows the duo sticking their tongues out at each other as little Nori clutches a giant lollipop.',
            'category': 'CELEBRITY',
            'cp': 'W3 Live News',
            'uploadDay': '2016/06/28',
            'uploadTime': '2015'
        },
        {
            'title': 'Citigroup is suing AT&T for using one of the most common words in the English language',
            'imagePath': 'https://qzprod.files.wordpress.com/2016/06/ap_06042505097.jpg?quality=80&strip=all&w=1600',
            'body': 'The infringement was allegedly intentional, according to the complaint, leaving the bank no choice but to sue. The complaint says Citigroup contacted AT&T in March to express its concerns about the name',
            'category': 'BUSINESS',
            'cp': 'QUARTZ',
            'uploadDay': '2016/06/28',
            'uploadTime': '2020'
        },
        {
            'title': 'These 10 Tech Skills Are In High Demand by Employers',
            'imagePath': 'https://fortunedotcom.files.wordpress.com/2016/06/gettyimages-527099781.jpg?w=840&h=485&crop=1',
            'body': 'As a denizen of the tech industry, you know that the number of potential areas of specialization can be dizzying. From programming languages to software frameworks and beyond',
            'category': 'TECHNOLOGY',
            'cp': 'Monster',
            'uploadDay': '2016/06/28',
            'uploadTime': '2025'
        },
        {
            'title': 'How to take your love of science and turn it into a career',
            'imagePath': 'http://i.amz.mshcdn.com/Z8Da6ePBQ4_vMwkdUJz8b7Sqrao=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F125776%2FScreen_Shot_2016-06-23_at_4.23.39_PM.png',
            'body': 'Following your passion is the greatest gift you could give to the world — and to yourself. When that passion is science, it can mean exploring how the world works, building new machines and finding cures for diseases',
            'category': 'SCIENCE',
            'cp': 'Mashable Asia',
            'uploadDay': '2016/06/28',
            'uploadTime': '2030'
        },
        {
            'title': '6 Reasons To Fall In Love With Belgium',
            'imagePath': 'http://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/f1d65b13-9a3c-e611-932b-0050568e420d/630x355.jpg',
            'body': 'Belgium is easily one of our favorite destinations in the world, but it didn’t start out that way. In our initial visit, we didn’t even get to go as off-the-beaten-track as we would have liked.',
            'category': 'TRAVEL',
            'cp': 'Travel PULSE',
            'uploadDay': '2016/06/28',
            'uploadTime': '2035'
        },
        {
            'title': 'Coronation Street to screen sixth weekly episode',
            'imagePath': 'http://ichef.bbci.co.uk/news/660/cpsprodpb/6EEB/production/_90159382_29_06_coro_steve_michelle_02.jpg',
            'body': 'The production moved to its present location in 2013, after Granada Studios in Manchester, where it had been filmed, was sold for redevelopment.',
            'category': 'ENTERTAINMENT',
            'cp': 'BBC News',
            'uploadDay': '2016/06/28',
            'uploadTime': '2040'
        },
        {
            'title': 'Essential Vancouver English food guide',
            'imagePath': 'http://images.dailyhive.com/20160614160728/Mini-Yorkshire-Puddings-Fat-Badger-Vancouver.jpg',
            'body': 'When thinking of English food there are a few staples that instantly spring to mind. Comforting classics like bangers and mash, Shepherd’s pie, fish and chips, and English-style curries.',
            'category': 'FOOD',
            'cp': 'Daily hive',
            'uploadDay': '2016/06/28',
            'uploadTime': '2045'
        },
        {
            'title': 'Mastering different writing styles: 7 tips',
            'imagePath': 'http://www.nownovel.com/blog/wp-content/uploads/2016/06/Different-writing-styles-7-tips-to-master-style-1.jpg',
            'body': 'Writing style, broadly speaking, refers to the way something is written, opposed to the content or meaning of what is said.',
            'category': 'STYLE',
            'cp': 'Now Novel',
            'uploadDay': '2016/06/28',
            'uploadTime': '2050'
        }
    ];

    return additional_news_data;
};