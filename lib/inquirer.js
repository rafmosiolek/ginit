const inquirer = require('inquirer');
const files = require('./files');

module.exports = {

    askGithubCredentials : () => {
        const gitHubUsernameEnquiry = 'Enter your GitHub username or e-mail address:';
        const gitHubPasswordEnquiry = "Please enter your password."
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: gitHubUsernameEnquiry,
                validate: (userInputValue) => {
                    if (userInputValue.length) {
                        return true;
                    } else {
                        return gitHubUsernameEnquiry;
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: gitHubPasswordEnquiry,
                validate: (userInputValue) => {
                    if (userInputValue.length) {
                        return true;
                    } else {
                        return gitHubPasswordEnquiry;
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }
}
