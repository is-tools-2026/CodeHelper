
import * as vscode from 'vscode';
import { registerHello } from './hello';
import { registerLineCounter } from './lineCounter';
import { registerColorChanger } from './colorChanger';


export function activate(context: vscode.ExtensionContext) {
    console.log('CodeHelper is active!');

    registerHello(context);
    registerLineCounter(context);
    registerColorChanger(context);
}


export function deactivate() {}
