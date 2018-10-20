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
                validate : (userInputValue) => {
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
                validate : (userInputValue) => {
                    if (userInputValue.length) {
                        return true;
                    } else {
                        return gitHubPasswordEnquiry;
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },

    askRepoDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));
        const repoNameEnquiry = 'Enter a name of your repository:';

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: repoNameEnquiry,
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: (repoName) => repoName.length ? true : repoNameEnquiry
            },
            {
                type: 'input',
                name: 'description',
                default: argv._[1] || null,
                message: 'Please provide a description of your repository (optional):'
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Is your repository public or private?',
                choices: ['public', 'private'],
                default: 'public'
            }
        ];
        return inquirer.prompt(questions);
    }
}