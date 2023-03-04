import TaggedText from "pixi-tagged-text";
import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import {Application, Loader, Ticker, utils} from "pixi.js";
import {hsl2rgb} from "./hue2rgb";
import Button from "./Button";

Loader.registerPlugin(WebfontLoaderPlugin)

const loader = Loader.shared;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1024,
	height: 768
});

loader.add("Sweater", "https://cdn.rhon.us/fonts/sweater_school_rg.otf");
loader.add("./clampy.png");
loader.add("button", "./button.png");

loader.onComplete.add(() => start);

loader.load(start);

const words = "The quick brown fox jumped over the lazy dog."

let rainbowText =  new TaggedText("rainbow\n\n" + words, {default: {
		fontFamily: "Sweater",
		fontSize: 64
	}}, {});

let characterSplit = new TaggedText("character split\n\n" + words, {default: {
		fontFamily: "Sweater",
		fontSize: 64,
	}}, {splitStyle: "characters"});

let noSplit = new TaggedText("no split\n\n" + words, {default: {
		fontFamily: "Sweater",
		fontSize: 64,
	}});

let wordSplit = new TaggedText("word split\n\n" + words, {default: {
		fontFamily: "Sweater",
		fontSize: 64,
	}}, {splitStyle: "words"});

let tagExample = new TaggedText("We can also use custom tags for styling. Default and <smol>smol</smol> and <yuge>BIG</yuge>", {
	default: {
		fontFamily: "Arial",
		fontSize: 64,
		align: 'center'
	},
	smol: {
		fontSize: 32,
	},
	yuge: {
		fontSize: 128,
	}});

let things = [rainbowText, characterSplit, noSplit, wordSplit, tagExample];

let currentThing = 0;
function start () {
	
	const button = new Button({label: "Click me!", x: 300, y: 600, width: 200, height: 100, onTap: nextThing});
	addRainbowText();
	makeTextClickable(characterSplit);
	makeTextClickable(noSplit);
	makeTextClickable(wordSplit);
	
	app.stage.addChild(button);
}

const nextThing = () => {
	app.stage.removeChild(things[currentThing]);
	currentThing = (currentThing + 1) % things.length;
	app.stage.addChild(things[currentThing]);
}

function addRainbowText () {

	rainbowText.interactive = true;

	rainbowText.on("pointerdown", () => {
		window.alert("CLICKED " + rainbowText.text);
	});

	rainbowText.textFields.forEach((t) => {
		t.interactive = true;
		t.on("click", () => {
			t.style.fill = "#ff0000";
		})
	});

	// Create array of 50 unique colors in descending order from the rainbow
	let colors2 = Array.from({length: 50}, (_, i) => {
		const hue = i / 50 * 360;
		const rgb = hsl2rgb(hue / 360, 1, 0.5);
		return utils.rgb2hex(rgb);
	});
	let timer = 0;
	const numFramesPerColor = 300;
	Ticker.shared.add((delta) => {
		timer += delta;
		if (timer < numFramesPerColor / 60) return;
		timer = 0;
		colors2 = colors2.slice(1).concat(colors2[0]); // rotate colors
		// sizes = sizes.slice(1).concat(sizes[0]); // rotate sizes
		rainbowText.textFields.forEach((t, i) => {
			t.style.fill = colors2[i]
		});
	})
	
}

function makeTextClickable (text: TaggedText) {
	text.interactive = true;
	text.textFields.forEach((t) => {
		t.interactive = true;
		t.on("click", () => {
			t.style.fill = "#ff0000";
		})
	});
}