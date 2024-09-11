

🧩 Any Boilerplate Generator Extension
===================================

This Visual Studio Code extension generates boilerplate code to help you kickstart your projects quickly.

Installation
------------

1.  Open Visual Studio Code.
2.  Go to the Extensions view by clicking on the Extensions icon in the Sidebar or pressing `Ctrl+Shift+X`.
3.  Search for **Any Boilerplate Generator**.
4.  Click **Install** on the extension page.

Usage
-----

### Generating Boilerplate Code

1.  Open the Command Palette with `Ctrl+Shift+P` or `Cmd+Shift+P` on macOS.
2.  Type and select **Any Boilerplate Maker** to start the boilerplate generation process.
3.  Select a template from the list (e.g., **Auth** or **Sample**).
4.  Follow the prompts to specify details such as class names.
5.  The boilerplate code will be generated based on your choices.

### Creating Premade Files from Snippets

1.  Right-click on a folder in the Explorer view.
2.  Select **Create File From Snippet** from the context menu.
3.  Choose a snippet from the list of available snippets.
4.  Enter the filename for the new file.
5.  The file will be created with the snippet content and the filename you provided.

Available Commands
------------------

*   `extension.anyBoilerplate`: Starts the boilerplate generation process. Prompts the user to select a template and generate code based on the chosen template.
*   `extension.createPremadeFile`: Creates a file from a premade snippet. Available from the folder context menu in the Explorer view. Prompts the user to select a snippet and enter a filename.

Generating a Custom VS Code Extension
-------------------------------------

To generate a custom VS Code extension using this boilerplate, follow these steps:

1.  Clone the repository or copy the extension files to your local machine.
2.  Open the folder containing the extension in Visual Studio Code.
3.  Run `npm install` to install the necessary dependencies.
4.  Add your **Templates** and **Snippets** on **Templates** directory. This [snippet generator](https://snippet-generator.app/) will help you to convert your code into snippet.
5.  Test/Debug `npm run compile`
6.  Use the `vsce` command-line tool to package the extension. Install it globally with `npm install -g vsce` if you haven't already.
7.  Run `vsce package` to create a .vsix file for your extension.
8.  Install the extension in VS Code by opening the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS), typing **Install from VSIX...**, and selecting your .vsix file.

Contributing
------------

Contributions are welcome! Please submit pull requests or report issues to the repository.

License
-------

Copyright (c) Ar Rahman. All rights reserved.

This code is licensed under the terms of the MIT License. It is free for personal use and modification. Redistribution and publication of modified or unmodified code are not permitted.

Any use of this code must include the following copyright notice: "Copyright (c) Ar Rahman. All rights reserved."

For inquiries or permissions beyond the scope of this license, please contact the copyright holder.

Contact
-------

If you have any questions or need support, please contact [arrahman.xd](mailto:arrahman.xd@gmail.com).
