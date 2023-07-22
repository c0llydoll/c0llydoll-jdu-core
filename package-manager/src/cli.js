const inquirer = require("inquirer");

module.exports = async () => {
    console.log("");
    console.log(`${global.project.name} v${global.project.version} by ${global.project.author}`);
    console.log("");
    const { command } = await inquirer
        .prompt([
            {
                type: "list",
                name: "command",
                message: "What would you like to do?",
                choices: [
                    new inquirer.Separator(),
                    {
                        value: "map-create-p4",
                        name: "Create map package from P4",
                    },
                    {
                        value: "map-update-p4",
                        name: "Update map package from P4",
                    },
                    // new inquirer.Separator()
                ],
            }
        ])
    return command;
};