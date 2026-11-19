
import * as vscode from 'vscode';

export function registerLineCounter(context: vscode.ExtensionContext) {
    const countLinesCommand = vscode.commands.registerCommand('codehelper.countLines', () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showWarningMessage('No file is open!');
            return;
        }

        const document = editor.document;

        let emptyLines = 0;
        let commentLines = 0;
        let codeLines = 0;
        let inBlockComment = false;

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i).text;
            const trimmedLine = line.trim();

            if (trimmedLine === '') {
                emptyLines++;
            }
            else if (inBlockComment) {
                const end = trimmedLine.indexOf('*/');

                if (end === -1) {
                    commentLines++;
                }
                else {
                    const afterComment = trimmedLine.substring(end + 2).trim();

                    if (afterComment === '') {
                        commentLines++;
                    }
                    else {
                        codeLines++;
                    }

                    inBlockComment = false;
                }
            }
            else if (trimmedLine.startsWith('//')) {
                commentLines++;
            }
            else if (trimmedLine.startsWith('/*')) {
                const end = trimmedLine.indexOf('*/', 2);

                if (end === -1) {
                    commentLines++;
                    inBlockComment = true;
                }
                else {
                    const afterComment = trimmedLine.substring(end + 2).trim();

                    if (afterComment === '') {
                        commentLines++;
                    }
                    else {
                        codeLines++;
                    }
                }
            }
            else {
                codeLines++;
            }
        }

        const output = vscode.window.createOutputChannel('CodeHelper');

        output.clear();
        output.appendLine('----- CodeHelper: Line Counter -----');
        output.appendLine('File: ' + document.fileName);
        output.appendLine('Total lines: ' + document.lineCount);
        output.appendLine('Empty lines: ' + emptyLines);
        output.appendLine('Comment lines: ' + commentLines);
        output.appendLine('Code lines: ' + codeLines);
        output.show();
    });

    context.subscriptions.push(countLinesCommand);
}
