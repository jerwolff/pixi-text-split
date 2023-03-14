import TaggedText from "pixi-tagged-text";
import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import {Application, Loader} from "pixi.js";
import {TaggedTextOptions} from "pixi-tagged-text/dist/types";

Loader.registerPlugin(WebfontLoaderPlugin)


const loader = Loader.shared;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 2440,
	height: 1440
});

loader.add("Sweater", "https://cdn.rhon.us/fonts/sweater_school_rg.otf");
loader.add("Montserrat", "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw5aXo.woff2");
loader.add("Climate Crisis", "https://fonts.gstatic.com/s/climatecrisis/v3/wEOpEB3AntNeKCPBVW9XOKlmp3AUgWFN1DvIvcM0gFpKiq8q.woff2");
loader.add("Open Sans", "https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjr0B4gaVI.woff2");
loader.add("./clampy.png");
loader.add("button", "./button.png");

loader.onComplete.add(() => start);

loader.load(start);

const words1 = "The quick brown fox jumped over the lazy dog.\n"
const words2 = "a b c d e f g h i j k l m n o p q r s t u v w x y z.\n"
const words3 = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z."

const fontSize = 32;

const settings = {
	fontFamily: "Climate Crisis",
	fontSize: fontSize,
	wordWrapWidth: 800,
}

const options: TaggedTextOptions = {
	debug: true,
}

const taggedTexts: TaggedText[] = [];

taggedTexts.push(new TaggedText("Arial\n" + words1 + words2 + words3, {default: {...settings, fontFamily: "Arial"}},
	options));

taggedTexts.push(new TaggedText("Garamond\n" + words1 + words2 + words3, {default: {...settings, fontFamily: "Garamond"}},
	options));

taggedTexts.push(new TaggedText("Montserrat\n" + words1 + words2 + words3, {default: {...settings, fontFamily: "Montserrat"}},
	options));

taggedTexts.push(new TaggedText("Sweater\n" + words1 + words2 + words3, {default: {...settings, fontFamily: "Sweater"}},
	options));

taggedTexts.push(new TaggedText("Open Sans\n" + words1 + words2 + words3, {default: {...settings, fontFamily: "Open Sans"}},
	options));

taggedTexts.push(new TaggedText("Climate Crisis\n" + words1 + words2 + words3, {default: settings},
	options));
function start () {
	
	for(let i=0; i < taggedTexts.length; i++) {
		app.stage.addChild(taggedTexts[i]);
		taggedTexts[i].x = 100;
		taggedTexts[i].y = 100 + i * 200;
	}
	
}

// @ts-ignore
function makeTextClickable (text: TaggedText) {
	text.interactive = true;
	text.textFields.forEach((t) => {
		t.interactive = true;
		t.on("click", () => {
			t.style.fill = "#ff0000";
		})
	});
}