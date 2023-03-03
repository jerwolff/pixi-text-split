import TaggedText from "pixi-tagged-text";
import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import { Application, Loader, Sprite, Ticker } from "pixi.js";

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

loader.add("Students", "../fonts/tss.ttf");
loader.add("./clampy.png");

loader.onComplete.add(() => start);

loader.load(start);
function start () {
	console.log("AESDF")

	const clampy: Sprite = Sprite.from("clampy.png");

	clampy.anchor.set(0.5);

	clampy.x = app.screen.width / 2;
	clampy.y = app.screen.height / 2;

	app.stage.addChild(clampy);
	
	const text1 = new TaggedText("Hello", {default: {
			fontFamily: "Students",
			fontSize: 120,
			textTransform  : "capitalize",
		}}, {debug: true, debugConsole: true, splitStyle: "characters"});
	
	let colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff", "#ffffff", "#000000"];
	let sizes = [240, 160, 120, 100, 80, 60, 40, 20];
	
	console.log(text1.textFields.forEach((t, i) => t.style.fill=colors[i]));
	
	// console.log(text1.tagStyles);
	let timer = 0;
	const numFramesPerColor = 400;
	app.stage.addChild(text1);
	Ticker.shared.add((delta) => {
		timer += delta;
		if (timer < 1000 / numFramesPerColor) return;
		timer = 0;
		colors = colors.slice(1).concat(colors[0]); // rotate colors
		sizes = sizes.slice(1).concat(sizes[0]); // rotate sizes
		text1.textFields.forEach((t, i) => {
			t.style.fill = colors[i]
			t.style.fontSize = sizes[i]
		});
		text1.setText("nowwa")
	})
}