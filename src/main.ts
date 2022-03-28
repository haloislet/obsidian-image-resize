import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Menu,Setting } from 'obsidian';

import { setSize, clearSize } from "./convert"


interface MyPluginSettings {
	size: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	size: '300'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		this.registerEvent(
			this.app.workspace.on("editor-menu", (menu, editor) => {
				this.handleContext(menu, editor);
			})
		);
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}
	handleContext(menu: Menu, editor: Editor): boolean {
		const selectedText = editor.getSelection();
		const { size } = this.settings
		const width = Number(size.split('x')[0])
		const height = Number(size.split('x')[1])
		if (!selectedText) {
			return false;
		}
		menu.addItem((item) => {
			item.setTitle(`宽度调整为 ${size}`)
				.setIcon("image")
				.onClick(() => {
					const text = setSize(selectedText, width, height)
					editor.replaceSelection(text);
				});
		});
		menu.addItem((item) => {
			item.setTitle("清空宽度")
				.setIcon("image")
				.onClick(() => {
					const text = clearSize(selectedText)
					editor.replaceSelection(text);
				});
		});
		return true;
	}
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'obsidian image resize 设置'});

		new Setting(containerEl)
			.setName('常用尺寸')
			.setDesc('300 或者 300x300')
			.addText(text => text
				.setPlaceholder('请输入图片常用尺寸')
				.setValue(this.plugin.settings.size)
				.onChange(async (value) => {
					this.plugin.settings.size = value;
					await this.plugin.saveSettings();
				}));
	}
}
