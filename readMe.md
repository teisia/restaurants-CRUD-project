#Create a Restaurant Listing!

You're going to create your first project using all the skills you learned this week and from previous weeks!
*All Images are provided for you in the images folder! Feel free to use your own tho!*

##1. Wire it Up!
Get an express app wired up and ready
Install your sql database
Get your server going!
...and most importantly ... Commit!

##2. Index Page
I should be able to see all the restaurants in my database on this page.

![image](images/index.jpg)

...COMMIT...

##3. New Restaurant
When the user clicks the 'new restaurant' link they are directed to a form.
![image](images/new.jpg)
* When the user clicks 'Submit' the page should redirect to the index, and the new restaurant should show up on your index page.
* Check your database to make sure the new restaurant information has been added!

...COMMIT...

##4.Show Restaurant
When a user clicks on the NAME of the restaurant, they are taken to a show page where they see details about the restaurant
![image](images/show.jpg)
* Remember: attention to detail is important!

...COMMIT...

##5. Edit Restaurant
* When a user clicks to edit the restaurant information they are taken a form that is already filled with existing information
* Once edited, the user should be redirected to the index page
![image](images/edit.jpg)
* Be sure to check your database to see the changes are being implemented!

...COMMIT...

##6. Delete Restaurant
If the user clicks to delete a restaurant the restaurant will be deleted from the database and will no longer show up on the index page

...COMMIT...

#STRETCH GOALS

1. Create a subnav bar on the index page where we can filter our search
  * Users can filter all restaurants by:
    * Rating
    * State
    * Cuisine

2. Refactor the views to use the same template for Edit and New
  * look up Express include

3. Write validations for form inputs that ensures:
  * Restaurant Name length is not longer than 40 characters
  * Location is not longer than 40 characters
  * The Image is a valid url OR file
  * Description is not empty

  *All validation functions should be written outside of your routes.*

4. Extract all database calls out of your routes and use functions that do the work for you instead.

5. When the user creates a new restaurant, or edits the restaurant information, they should be able to see their image render before submitting
