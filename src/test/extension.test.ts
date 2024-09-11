import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

suite('Boilerplate Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    // Test to ensure the extension is properly activated
    test('Extension activation test', async () => {
        const extension = vscode.extensions.getExtension('your.extension.id'); // Replace with your extension ID
        assert.ok(extension, 'Extension should be available.');
        await extension?.activate();
        assert.ok(extension?.isActive, 'Extension should be active after activation.');
    });

    // Test to check if the command 'extension.createBoilerplate' is registered
    test('Command registration test', async () => {
        const commands = await vscode.commands.getCommands(true);
        const commandExists = commands.includes('extension.createBoilerplate');
        assert.ok(commandExists, "'extension.createBoilerplate' command should be registered.");
    });

    // Test to check if the template files exist
    test('Template files existence test', () => {
        const templatePath = path.join(__dirname, '..', '..', 'src', 'templates', 'auth.json');
        assert.ok(fs.existsSync(templatePath), 'auth.json template should exist.');
    });

    // Test to check if folders and files are created correctly
    test('Boilerplate generation test', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        assert.ok(workspaceFolders, 'Workspace folder should be open.');

        const rootPath = workspaceFolders![0].uri.fsPath;

        // Simulate running the command
        await vscode.commands.executeCommand('extension.createBoilerplate');

        // Verify if folders were created
        const expectedFolders = ['controller', 'repo', 'views', 'widgets'];
        expectedFolders.forEach(folder => {
            const folderPath = path.join(rootPath, folder);
            assert.ok(fs.existsSync(folderPath), `${folder} folder should be created.`);
        });

        // Verify if files were created with correct content
        const expectedFiles = {
            'controller/AuthController.dart': '// This is the AuthController file.',
            'repo/AuthRepository.dart': '// This is the AuthRepository file.',
            'views/AuthView.dart': '// This is the AuthView file.',
            'widgets/AuthWidget.dart': '// This is the AuthWidget file.'
        };

        for (const [filePath, expectedContent] of Object.entries(expectedFiles)) {
            const fullPath = path.join(rootPath, filePath);
            assert.ok(fs.existsSync(fullPath), `${filePath} should be created.`);
            const fileContent = fs.readFileSync(fullPath, 'utf-8');
            assert.ok(fileContent.includes(expectedContent), `${filePath} should have the correct content.`);
        }
    });
});
