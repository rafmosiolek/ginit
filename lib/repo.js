const _ = require('lodash');
const fs = require('fs');
const git = require('simple-git')();
const CLI = require('clui');
const Spinner = CLI.Spinner;

const inquirer = require('./inquirer');
const github = require('./github');

module.exports = {

    createRemoteRepo: async () => {
        const userGitHub = github.getInstance();
        console.log(userGitHub);
        const answers = await inquirer.askRepoDetails();

        const userData = {
            name: answers.name,
            description: answers.description,
            private: (answers.visibility === 'private')
        };

        const status = new Spinner("Creating remote repository...");
        status.start();

        try {
            const response = await userGitHub.repos.create(userData);
            return response.userData.ssh_url;
        } catch(err) {
            throw err;
        } finally {
            status.stop();
        }
    },

    createGitignore: async () => {
        const fileList = _.without(fs.readdirSync('.'), '.git', '.gitignore');

        if (fileList.length) {
            const answers = await inquirer.askIgnoreFiles(fileList);

            if (answers.ignore.length) {
                fs.writeFileSync('.gitignore', answers.ignore.join('\n'));
            } else {
                touch('.gitignore');
            }
        } else {
            touch('.gitignore');
        }
    }
}
