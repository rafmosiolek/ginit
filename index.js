const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files.js');
const inquirer = require('./lib/inquirer');
const github = require('./lib/github');

clear();
console.log(
    chalk.cyan(
        figlet.textSync('Ginit', { horizontalLayout: 'full'})
    )
);

if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a git repository'));
    process.exit();
}

const executeTheInquirer = async () => {
    let token = github.getStoredGitHubToken();
    if (!token) {
        await github.setGithubCredentials();
        token = await github.registerNewToken();
    }
    console.log(token);
}

executeTheInquirer();
