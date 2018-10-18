const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files.js');
const inquirer = require('./lib/inquirer');

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
    const credentials = await inquirer.askGithubCredentials();
    console.log(credentials);
}

executeTheInquirer();