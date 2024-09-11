import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function createPremadeFile(uri: vscode.Uri, context: vscode.ExtensionContext) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found.');
        return;
    }

    // Load premade snippets from premade_snippet.json
    const snippetPath = path.join(context.extensionPath, 'src', 'templates', 'premade_snippet.json');
    if (!fs.existsSync(snippetPath)) {
        vscode.window.showErrorMessage('Premade snippet file not found.');
        return;
    }

    const snippets = JSON.parse(fs.readFileSync(snippetPath, 'utf-8'));
    const snippetKeys = Object.keys(snippets);

    // Show the user a list of available snippets
    const selectedSnippet = await vscode.window.showQuickPick(snippetKeys, {
        placeHolder: 'Select a snippet to generate a file'
    });

    if (!selectedSnippet) {
        vscode.window.showErrorMessage('No snippet selected.');
        return;
    }

    // Prompt the user for a filename
    const fileName = await vscode.window.showInputBox({
        prompt: 'Enter the file name for the snippet',
        placeHolder: 'e.g., MyClass'
    });

    if (!fileName) {
        vscode.window.showErrorMessage('No file name provided.');
        return;
    }

    const folderPath = uri.fsPath;
    const snippetContent = snippets[selectedSnippet].replace(/{{className}}/g, fileName);
    const filePath = path.join(folderPath, `${fileName}.dart`);

    // Create the file with the snippet content
    fs.writeFileSync(filePath, snippetContent);
    vscode.window.showInformationMessage(`${fileName}.dart has been created from the ${selectedSnippet} snippet!`);
}
