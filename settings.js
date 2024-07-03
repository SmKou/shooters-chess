const defaults = {
    graphics: 0,
    anims: false,
    colors: 0,
    players: [true, true],  // true: person
    input_modes: 0
}

const options = {
    graphics: [],
    colors: [],
    input_modes: []
}

class Setting {
    constructor(name) {
        this.mode = defaults[name]
        this.opt = options[name]
    }
    val() { return this.opt[this.mode] }
    update(args) {
        switch (typeof this.mode) {
            case 'number':
                this.mode++
                if (this.mode >= this.opt.length)
                    this.mode = 0
                return true
            case 'boolean':
                this.mode = !this.mode
                return true
            default:
                if (!args
                || typeof this.mode !== typeof args
                || this.mode.length !== args.length)
                    return false;
                this.mode = args
                return true
        }
    }
}

const settings = {}
for (const key of Object.keys(defaults))
    settings[key] = new Setting(key)

export default settings
