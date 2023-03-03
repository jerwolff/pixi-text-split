import TaggedText from "pixi-tagged-text";
import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import {Application, Loader, Ticker, utils} from "pixi.js";
import {hsl2rgb} from "./hue2rgb";

Loader.registerPlugin(WebfontLoaderPlugin)

const loader = Loader.shared;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

loader.add("Students", "https://cdn.rhon.us/fonts/sweater_school_rg.otf");
loader.add("./clampy.png");

loader.onComplete.add(() => start);

loader.load(start);
function start () {
	
	const text1 = new TaggedText("Wow doesn't this look pretty?", {default: {
			fontFamily: "Students",
			fontSize: 80,
		}}, {debugConsole: true, splitStyle: "characters"});
	
	// text1.interactive = true;
	
	text1.on("pointerdown", () => {
		window.alert("CLICKED " + text1.text);
	});
	
	text1.textFields.forEach((t) => {
		t.interactive = true;
		t.on("click", () => {
			t.style.fill = "#ff0000";
		})
	});
	
	app.stage.addChild(text1);
	
	// Create array of 50 unique colors in descending order from the rainbow
	// let colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8b00ff", "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8b00ff", "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8b00ff", "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8b00ff", ]
	// @ts-ignore
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
		text1.textFields.forEach((t, i) => {
			t.style.fill = colors2[i]
		});
	})
}