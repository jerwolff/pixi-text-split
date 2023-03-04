import {NineSlicePlane, Texture, Text} from "pixi.js";

export default class Button extends NineSlicePlane {
    settings: {
        width: number;
        height: number;
        x: number;
        y: number;
        fontSize: number;
        label: string;
        stroke: string;
        strokeThickness: number;
        onTap?: () => void;
        onOver?: () => void;
        onOut?: () => void;
        onDown?: () => void;
        onUp?: () => void;
    };
    label: Text;
    
    isOver = false;
    isActive = false;
    constructor(settings: any) {
        const texture = Texture.from('button')
        const notScalableArea = 20 // Indent from left, top, right and bottom sides in pixels
        super(texture, notScalableArea, notScalableArea, notScalableArea, notScalableArea)

        /** Contains settings for the button */
        this.settings = {
            // Default values
            width: 200,
            height: 100,
            x: 300,
            y: 300,

            fontSize: 35,
            label: 'Button',
            stroke: '#336699',
            strokeThickness: 4
        }

        // Main text on the button
        this.label = new Text('')
        this.label.anchor.set(0.5);
        this.addChild(this.label)

        // Update visual appearance
        this.update(settings);
        
        this.interactive = true;
        
        this.buttonMode = true;
        
        this.on('pointertap', this.onTap);
        this.on('pointerover', this.onOver);
        this.on('pointerout', this.onOut);
        this.on('pointerdown', this.onDown);
        this.on('pointerup', this.onUp);
        this.on('pointerupoutside', this.onUp);
        
    }
    
    onTap = () => {
        if (this.settings.onTap) this.settings.onTap()
    }

    onOver = () => {
        this.isOver = true
        this.update()
    }

    onOut() {
        this.isOver = false
        this.update()
    }

    onDown() {
        this.isActive = true
        this.update()
    }

    onUp() {
        this.isActive = false
        this.update()
    }

    /** Updates the button's appearance after changing its settings */
    update(settings?: any) {
        // Creating new settings which include old ones and apply new ones over it
        this.settings = {
            ...this.settings, // including old settings
            ...settings, // including new settings
        }

        this.label.text = this.settings.label
        this.label.style = {
            fontSize: this.settings.fontSize + 'px',
            fill: '#ffffff',
            stroke: this.settings.stroke,
            strokeThickness: this.settings.strokeThickness,
        }

        this.onResize()
    }

    /** Changes sizes and positions each time when the button updates */
    onResize() {
        this.width = this.settings.width
        this.height = this.settings.height
        this.x = this.settings.x;
        this.y = this.settings.y;

        this.label.x = this.width * 0.5
        this.label.y = this.height * 0.5

        this.pivot.set(this.width * 0.5, this.height * 0.5)
    }
}