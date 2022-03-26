import {
	Editor,
	Menu,
	Plugin
} from "obsidian";

export default class MyPlugin extends Plugin {
	async onload() {
		this.registerEvent(
			this.app.workspace.on("editor-menu", (menu, editor) => {
				this.handleContext(menu, editor);
			})
		);
	}
	handleContext(menu: Menu, editor: Editor): boolean {
		const selectedText = editor.getSelection();
		if (!selectedText) {
			return false;
		}
		menu.addItem((item) => {
			item.setTitle("宽度调整为 300")
				.setIcon("image")
				.onClick(() => {
					const text = selectedText.replace(/\[\]/g, "[300]");
					editor.replaceSelection(text);
				});
		});
		menu.addItem((item) => {
			item.setTitle("清空宽度")
				.setIcon("image")
				.onClick(() => {
					const text = selectedText.replace(/\[.*?\]/g, "[]");
					editor.replaceSelection(text);
				});
		});
		return true;
	}
}
