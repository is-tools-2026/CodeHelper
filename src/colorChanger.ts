import * as vscode from 'vscode';

export function registerColorChanger(context: vscode.ExtensionContext) {
    const command = vscode.commands.registerCommand(
        'codehelper.changeColor',
        async () => {
            const redText = await vscode.window.showInputBox({
                prompt: 'Введите красный цвет (0-255)',
                placeHolder: 'Например, 30'
            });
            if (redText === undefined) return;

            const greenText = await vscode.window.showInputBox({
                prompt: 'Введите зелёный цвет (0-255)',
                placeHolder: 'Например, 40'
            });
            if (greenText === undefined) return;

            const blueText = await vscode.window.showInputBox({
                prompt: 'Введите синий цвет (0-255)',
                placeHolder: 'Например, 60'
            });
            if (blueText === undefined) return;

            const values = [redText, greenText, blueText].map(Number);
            const valid = values.every(
                value => Number.isInteger(value) &&
                    value >= 0 &&
                    value <= 255
            );

            if (!valid) {
                vscode.window.showErrorMessage(
                    'Каждое RGB-значение должно быть целым числом от 0 до 255.'
                );
                return;
            }

            const hex = '#' + values
                .map(value => value.toString(16).padStart(2, '0'))
                .join('');

            const settings = vscode.workspace.getConfiguration('workbench');
            const current = settings.get<Record<string, string>>(
                'colorCustomizations'
            ) || {};

            await settings.update(
                'colorCustomizations',
                { ...current, 'editor.background': hex },
                vscode.ConfigurationTarget.Global
            );

            vscode.window.showInformationMessage(
                'Цвет редактора изменён на ' + hex
            );
        }
    );

    context.subscriptions.push(command);
}
