const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { restoreDefaultPrompts } = require("inquirer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const roleInput = [
    {
        type: "list",
        name: "role",
        message: "Please select your role:",
        choices: 
        [ "Manager", "Engineer", "Intern", "Continue" ]
    },
];    

const staffInput = [
    {
        type: "input",
        name: "name",
        message: "Please enter your name:",
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your email address:",
    },
    {
        type: "input",
        name: "id",
        message: "Please enter your ID:",
    }
];  

const engineerInput = [
    {
        type: "input",
        name: "github",
        message: "Please enter your Github username:",
    } 
];

const internInput = [
    {
        type: "input",
        name: "school",
        message: "Please enter your school name:",
    } 
];

const managerInput = [
    {
        type: "input",
        name: "officeNumber",
        message: "Please enter your office number:",
    } 
];

const employees = [];

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function teamGenerator() {
    inquirer
        .prompt([...roleInput])
        .then((data) => {
        if (data.role === "Engineer") {
            createEngineer();
        } else if(data.role === "Intern") {
            createIntern();
        } else if(data.role === "Manager") {
            createManager();
        } else { 
            console.log(employees)
            console.log("Thank you for using the Team Profile Generator.")
            writeToFile("./output/team.html", render(employees))
        }
    })

    createEngineer = () => {
        return inquirer
            .prompt([...staffInput, ...engineerInput])
            .then(({ name, id, email, github }) => {
            let engineer = new Engineer(name, id, email, github);
        if (name === "" && id === "" && email === "" && github === "") {
            console.log("Incorrect entry. Try again.");
            createEngineer();
        } else {
            employees.push(engineer);
            teamGenerator();
        };
    });
    }

    createIntern = () => {
        return inquirer
            .prompt([...staffInput, ...internInput])
            .then(({ name, id, email, school }) => {
            let intern = new Intern(name, id, email, school);
        if (name === "" && id === "" && email === "" && school === "") {
            console.log("Incorrect entry. Try again.");
            createIntern();
        } else {
            employees.push(intern);
            teamGenerator();
            };
    });
    }

    createManager = () => {
        return inquirer
            .prompt([...staffInput, ...managerInput])
            .then(({ name, id, email, officeNumber }) => {
            let manager = new Manager(name, id, email, officeNumber);
        if (name === "" && id === "" && email === "" && officeNumber === "" && (officeNumber)) {
            console.log("Incorrect entry. Try again.");
            createManager();
        } else {
            employees.push(manager);
            teamGenerator();
            };
    });
    }


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
