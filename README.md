# Software Engineering Team Generator
A Node CLI application that allows a manager to generate a website with their team's information

## The Assignment
This project was a homework assignement for UW full-stack coding bootcamp. The instructions were to build a Node CLI application that asks a user for information about their engineering team and then use that information to render an HTML webpage. The HTML page should display a name, id and email for each team member and then other information based on whether the team member was a manager, engineer, or intern. The application was also required to pass unit tests.

## The Process
We were given a suggested directory structure and file names. The JavaScript files included class files for different types of team members. The super class was to be employee and have name, id and email properties and methods that return these. The child classes (manager, engineer, and intern) were to inherit all properties from employee but have their own unique properties. Then I wrote unit tests for each class, making sure I got back the expected out come for each.

After writing the classes and exporting the modules I started importing everything I would need into the main app.js file. In order to prompt the user for information I needed inquirer and to write an HTML file I needed fs. I also importated the class files and another js file I would use to write code for rendering the HTML. 

Next I set up the HTML templates. I included the HTML boiler plate in the main.html template, and left room in the body to write in the cards for the team members. In the HTML files for each type of employee I included a bootstrap-styled card that would include all required information.

In the app.js files I started writing the questions to prompt the user for information. Depending on what the user entered, the program would either make a new instance of manager, engineer or intern and then ask the user another question depending on the type. The team member object is then pushed to an array that holds all the members. The user is then asked if they want to enter another employee and the code runs again until they reply no. The program then lets the user know their team profile is being generated.

The most challanging part of this assignment was rendering the HTML page. In the writeHTML.js file functions are called that will replace placeholders in the HTML template files with information gathered from the user. Then the renderTeamHTML function is exported to the app.js file. After the user has entered all their info, the renderTeamHTML function is called with the team member array as an argument. This ends the application by writing all the templates to one team.html file that will appear in the output folder. Then a message appears telling the user where to find their team profile and how to view it.

## Next Steps
I could improve upon this project by adding more tests and validating information entered by the user. For example, I could make sure the email or github profile entered by the user are valid, and if not prompt them to try entering them again. I could also add some more styles to the final profile making it a bit more unique. 

## Thanks for reading :smile:
Please contact me with any question or comments: austenpturner@msn.com
