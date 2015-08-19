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
			var feedLength = allFeeds.length;
			for(var i=0; i<feedLength; i++){
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe(0);
			}
		});
		
		// loops through each feed and ensures that a name is definden and not empty
        it('have name', function() {
			var feedLength = allFeeds.length;
			for(var i=0; i<feedLength; i++){
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe(0);
			}
		});
    });
    
    
    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
		
		/* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        // Checks, if the class "menu-hidden" is inside the body
        it('is hidden by default', function() {
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
        
        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

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
    
    
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
		
		/* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */ 
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
    
    
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
		
		 /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var entriesBeforeLoad;
        var entriesAfterLoad;

        // calls before the test the function loadFeed with the jasmine function done() as callback. So jasmine knows, when the async loading is finished.
        beforeEach(function(done) {
            // empties the feed so that no prior content is existing
            $('.feed').empty();
            loadFeed(0, function(){
                done();
            });
            // saves a example content after the first loading.
            entrieBeforeLoad = $('.feed').find("h2").text();
        });
         
        it('changes are working', function(done) {
            // loading of another feed
		    loadFeed(1, function(){
                done();
            });
            // saves a content example at the same position as the first loading
            entrieAfterLoad = $('.feed').find("h2").text();	
            // checks if the two content example are not matching (meaning they changed, so it worked correctly)
            expect(entrieBeforeLoad).not.toEqual(entrieAfterLoad);
            done();
        });

    });
       
}());
