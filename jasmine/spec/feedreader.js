/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        
        // loops through each feed and ensures that a url is definden and not empty
        it('have url', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

    // loops through each feed and ensures that a name is definden and not empty
        it('have name', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });
    
    
    describe('The Menu', function() {
        // Checks, if the class "menu-hidden" is inside the body
        it('is hidden by default', function() {
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
        
        // Checks that the menu reacts correctly when the icon is clicked 
        it('is displayed and hidden correctly', function() {
            // Triggers a click on the element with the class menu-icon-link
            $('.menu-icon-link').trigger('click');
            // through the click the menu has to be displayed. This means, the Class menu-hidden should not be in the body.
            expect($('body').hasClass("menu-hidden")).not.toBe(true);
            // Triggers a new click on the class menu-icon-link
            $('.menu-icon-link').trigger('click');
            // now the menu should be hidden again. the class menu-hidden should be in the body again
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });
    
    
    describe('Initial Entries', function() {

         // calls before the test the function loadFeed with the jasmine function done() as callback. So jasmine knows, when the async loading is finished.
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });

        // after the initial loading is completed it checks if a entry inside the class feed is existing.
        it('are loaded', function(done) {
            var feedHasEntrie = $('.feed').has('.entry-link');
            expect(feedHasEntrie.length).toBeGreaterThan(0);
            done();	
        });

    });
    
    
    describe('New Feed Selection', function() {

        // this test ensures, that a new feed is actually loaded
        var entriesBeforeLoad;
        var entriesAfterLoad;

        // calls before the test the function loadFeed with the jasmine function done() as callback. So jasmine knows, when the async loading is finished.
        beforeEach(function(done) {
            // empties the feed so that no prior content is existing
            $('.feed').empty();
            // load the first feed
            loadFeed(0, function(){
                // saves the content of the first feed
                entriesBeforeLoad = $('.feed').html();
                // loads the second feed
                loadFeed(1, function(){
                    // saves the content of the second feed
                    entriesAfterLoad = $('.feed').html();
                    done();
                });
                done();
            });
        });
         
        it('changes are working', function() {
            // matches the two saved contents. they shouldn't be equal.
            expect(entriesBeforeLoad).not.toEqual(entriesAfterLoad);
        });
    });
       
}());
