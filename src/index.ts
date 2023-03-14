import TaggedText from "pixi-tagged-text";
import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import {Application, Container, Graphics, Loader} from "pixi.js";
import {SplitStyle} from "pixi-tagged-text/dist/types";

Loader.registerPlugin(WebfontLoaderPlugin)


const loader = Loader.shared;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 2440,
	height: 6000
});

loader.add("Sweater", "https://cdn.rhon.us/fonts/sweater_school_rg.otf");
loader.add("Montserrat", "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw5aXo.woff2");
loader.add("Climate Crisis", "https://fonts.gstatic.com/s/climatecrisis/v3/wEOpEB3AntNeKCPBVW9XOKlmp3AUgWFN1DvIvcM0gFpKiq8q.woff2");
loader.add("Open Sans", "https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjr0B4gaVI.woff2");
loader.add("./clampy.png");
loader.add("button", "./button.png");

const fonts = ["Sweater"];

loader.onComplete.add(() => start);

loader.load(start);

const words1 = "Hello and Goodbye"

const fontSize = 64;

const settings = {
	fontFamily: "Climate Crisis",
	fontSize: fontSize,
	wordWrapWidth: 750,
}

function fontExample(settings: any, splitStyle?: SplitStyle) {
	const container = new Container();
	settings.fontFamily = 'Arial';
	const title = new TaggedText("Split Style: " + splitStyle, {default: settings});
	container.addChild(title);
	for(let i=0; i < fonts.length; i++) {
		settings.fontFamily = fonts[i];
		const newText = new TaggedText(`${settings.fontFamily}\n${words1}`, {default: settings}, {debug: true, splitStyle: splitStyle});
		newText.y = 100 + i * 300;
		makeTextClickable(newText);
		console.log(newText.width);
		container.addChild(newText);
	}
	return container;
}
function start () {
	const wordSplit = fontExample(settings, "words");
	wordSplit.x = 100;
	app.stage.addChild(wordSplit);
	
	const characterSplit = fontExample(settings, "characters");
	characterSplit.x = 1000;
	app.stage.addChild(characterSplit);
}

// @ts-ignore
function drawUnderline(x: number, y: number, width: number) {
	const underline = new Graphics();
	underline.lineStyle(2, 0xff0000);
	underline.moveTo(x, 0);
	underline.lineTo(x + width, 0);
	underline.y = 64;
	return underline;
}

// @ts-ignore
function makeTextClickable (text: TaggedText) {
	text.interactive = true;
	text.textFields.forEach((t) => {
		t.interactive = true;
		t.on("click", () => {
			if(t.style.fill === "#ff0000") t.style.fill = "#000000";
			else {
				t.style.fill = "#ff0000";
			}
		})
		const lineContainer = new Container();
		lineContainer.setTransform(t.x, t.y, 1, 1, 0, 0, 0, 0, 0);
		text.addChild(lineContainer);
		lineContainer.addChild(drawUnderline(0, 0, t.width));
		// t.addChild(drawUnderline(t.x, t.y, t.width));
	});
}