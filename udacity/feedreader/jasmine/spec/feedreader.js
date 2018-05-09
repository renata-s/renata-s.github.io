$(function () {
    describe('RSS Feeds', function () {

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * @description a test loops through each feed in the allFeeds object and ensures it has a URL defined and the URL is not empty.
         */
        it('urls are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeTruthy();
            };
        });

        /**
         * @description a test loops through each feed in the allFeeds object and ensures it has a name defined and the name is not empty.
         */
        it('names are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeTruthy();
            }
        });

    });

    describe('The menu', function () {

        /**
         * @description a test ensures the menu element is hidden by default.
         */
        it('menu element hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        /**
         * @description a test ensures the menu changes visibility when the menu icon is clicked. The menu display when clicked and hide when clicked again.
         */
        it('menu changes visibility when clicked', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {

        /**
        * @description a test ensures when the loadFeed function is called and completes its work.
        */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('define if entry has more than 0 entries', function () {
            expect($('.entry .feed')).toBeDefined();
        });
    });

    describe('New Feed Selection', function () {

        /**
        * @description a test ensures when a new feed is loaded by the loadFeed function the content actually changes.
        */
        beforeEach(function (done) {
            $('.feed').empty();
            loadFeed(0, function () {
                firstFeed = $('.feed .entry').html();

                loadFeed(1, function () {
                    secondFeed = $('.feed .entry').html();
                    done();
                });
            });
        });

        it('new feed is different', function () {
            expect(firstFeed).not.toBe(secondFeed);
        })
    });
}());
