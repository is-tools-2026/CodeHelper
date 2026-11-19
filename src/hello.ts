import * as vscode from 'vscode';

export function registerHello(context: vscode.ExtensionContext) {
    const helloCommand = vscode.commands.registerCommand(
        'codehelper.hello',
        () => {
            vscode.window.showInformationMessage(
                'Hello, World! [Ваше Имя]'
            );
        }
    );

    context.subscriptions.push(helloCommand);
}
