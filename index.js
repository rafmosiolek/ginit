#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files.js');
const inquirer = require('./lib/inquirer');
const github = require('./lib/github');
const repo = require('./lib/repo');

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

const getGitHubToken = async () => {
    // If token already exists, fetch it from a configstore
    let token = github.getStoredGitHubToken();
    if (token) {
        return token;
    }

    // No token found, use credentials to access user's GitHub acc
    await github.setGithubCredentials();

    // Register new token
    token = await github.registerNewToken();
    return token;
}

const runApp = async () => {
    try {
        // Retrieve & set authentication token
        const token = await getGitHubToken();
        github.setupGitHubOAuthAuthentication(token);

        // Create a remote repo
        const url = await repo.createRemoteRepo();

        // Create .gitignore file
        await repo.createGitignore();

        // Setup local repo and push to remote
        const done = await repo.initializeNewRepo(url);
        if (done) {
            console.log(chalk.green('All done!'));
        }
    } catch(err) {
        if (err) {
            switch (err.code) {
                case 401:
                    console.log(chalk.red("Couldn't log you in. Please provide correct credentials/token."));
                    break;
                case 422:
                    console.log(chalk.red("Remote repository with the same name already exists"));
                    break;
                default:
                    console.log(chalk.red(err));
            }
        }
    }
}

runApp();
