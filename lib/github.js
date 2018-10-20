const octokit = require('@octokit/rest')();
const Configstore = require('configstore');
const pkg = require('../package.json');
const _ = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');

const inquirer = require('./inquirer');
const conf = new Configstore(pkg.name);

module.exports = {

    getInstance : () => {
        return octokit;
    },

    getStoredGitHubToken : () => {
        return conf.get('github.token');
    },

    setGithubCredentials : async () => {
        const credentials = await inquirer.askGithubCredentials();
        octokit.authenticate(
            _.extend(
                {
                type: 'basic',
                },
                credentials
            )
        );
    },

    registerNewToken : async () => {
        const authenticationSpinner = new Spinner('Authenticating, please wait...');
        authenticationSpinner.start();

        try {
            const response = await octokit.authorization.create({
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'ginit, the command-line tool for initalizing Git repositories'
            });
            const token = response.data.token;
            if (token) {
                conf.set('github.token', token);
                return token;
            } else {
                throw new Error("Missing Token", "Github token was not found");
            }
        } catch (err) {
            throw err;
        } finally {
            authenticationSpinner.stop();
        }
    },

    setupGitHubOAuthAuthentication : (token) => {
        octokit.authenticate({
            type: 'oauth',
            token: token
        });
    }
}
