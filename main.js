import p5 from 'p5'
import './style.css'

const setup = (p) => {
    p.createCanvas(p.windowWidth, p.windowHeight)
}

const draw = (p) => {
    p.background(20)
}

const sketch = p => {
    p.setup = setup(p)
    p.draw = draw(p)
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
}
new p5(sketch)