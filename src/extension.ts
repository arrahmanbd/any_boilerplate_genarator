import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createPremadeFile } from './premadeSnippet';

/**
 * @file
 * 2024-09-11
 * AnyBoilerplate Generator Extension for VS Code
 * 
 * Copyright (c) Ar Rahman. All rights reserved.
 * 
 * This code is licensed under the terms of the MIT License.
 * It is free for personal use and modification. Redistribution and 
 * publication of modified or unmodified code are not permitted.
 * 
 * Any use of this code must include the following copyright notice:
 * "Copyright (c) Ar Rahman. All rights reserved."
 * 
 * For inquiries or permissions beyond the scope of this license, 
 * please contact the copyright holder.
 * 
 * @version 0.0.1
 * @description An extension for generating boilerplate code in VS Code.
 * 
 * @param {vscode.ExtensionContext} context - The context for the extension.
 * 
 * @see [MIT License](https://opensource.org/licenses/MIT)
 */

export function activate(context: vscode.ExtensionContext) {
    console.log('Boilerplate extension is now active!');
    // Command to create boilerplate
    let anyBoilerplate = vscode.commands.registerCommand('extension.anyBoilerplate', async () => {
        // Prompt the user to select a template
        const templateOptions = ['Auth', 'Sample'];
        const selectedTemplate = await vscode.window.showQuickPick(templateOptions, {
            placeHolder: 'Select a template to generate boilerplate',
        });

        if (!selectedTemplate) {
            vscode.window.showErrorMessage('No template selected.');
            return;
        }

        // Resolve the path to the template file
        const templatePath = path.join(context.extensionPath, 'src', 'templates', `${selectedTemplate.toLowerCase()}.json`);
        if (!fs.existsSync(templatePath)) {
            vscode.window.showErrorMessage(`Template file ${selectedTemplate} not found.`);
            return;
        }

        // Read the template file
        const template = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));

        // Get the current workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }

        // Create the folder structure based on the template
        const folders = template.folders;
        folders.forEach((folder: string) => {
            const folderPath = path.join(workspaceFolder, folder);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
        });

        // Create files with snippet code
        const files = template.files;
        for (const [filePath, content] of Object.entries(files)) {
            // If the file content includes a placeholder for class name, prompt the user for a class name
            if ((content as string).includes('{{className}}')) {
                const fileName = await vscode.window.showInputBox({
                    prompt: `Enter the class name for ${filePath}`,
                    placeHolder: 'e.g., AuthController'
                });

                if (fileName) {
                    // Replace the placeholder with the actual class name and create the file
                    const finalContent = (content as string).replace(/{{className}}/g, fileName);
                    const fullPath = path.join(workspaceFolder, filePath);
                    fs.writeFileSync(fullPath, finalContent);
                }
            } else {
                // Just create the file with the provided content
                const fullPath = path.join(workspaceFolder, filePath);
                fs.writeFileSync(fullPath, content as string);
            }
        }

        vscode.window.showInformationMessage(`${template.templateName} has been applied!`);
    });

    // Command to create premade files from snippets
    let createPremadeFileCommand = vscode.commands.registerCommand('extension.createPremadeFile', async (uri: vscode.Uri) => {
        await createPremadeFile(uri, context);
    });

    context.subscriptions.push(anyBoilerplate);
    context.subscriptions.push(createPremadeFileCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
