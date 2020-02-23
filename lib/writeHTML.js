const fs = require('fs');
const path = require('path');

const templatesDir = path.resolve(__dirname, "../templates");

const renderTeamHTML = employees => {
    const html = [];

    for (let employee of employees) {
        if (employee.getRole() === 'Manager') {
            html.push(renderManager(employee));
        } else if (employee.getRole() === 'Engineer') {
            html.push(renderEngineer(employee));
        } else {
            html.push(renderIntern(employee));
        }
    }

    return renderMain(html.join(""));
};

// functions to fill in html template with actual values

const renderManager = manager => {
    // assign this template to manager html template
    let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
    // replace placeholder variables (name, role, etc...) with user inputted values 
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    // return the template
    return template;
};
 
const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
    let template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
    // template.replace("team", html)
    // this will replace team with the manager, engineer and intern html (team member cards)
    template = replacePlaceholders(template, "team", html);
    return template;
};

const replacePlaceholders = (template, placeholder, value) => {
    // assign pattern to new regular expression that replaces all placeholder variables on all lines
    // g = global (all), m = multiple lines
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    // replace all instances of placeholder with value
    return template.replace(pattern, value);
};

module.exports = renderTeamHTML;