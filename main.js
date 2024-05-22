import './style.css'

const green = '#385546'
const beige = '#e9d7bc'
const lbl_color = '#455c52'

const ui = {
    canvas: document.getElementById('game'),
    ctx: ''
}

const size_canvas = () => {
    ui.canvas.width = ui.canvas.clientWidth
    ui.canvas.height = ui.canvas.clientHeight
    ui.ctx = ui.canvas.getContext("2d")
}

const draw_board = () => {
    const a_code = 65
    const max_squ = 8     
    const squ = (ui.canvas.clientWidth - 72) / 8
    const edge = 36
    const offset = squ / 2

    ui.ctx.font = '28px sans-serif'
    ui.ctx.textAlign = 'center'
    ui.ctx.fillStyle = lbl_color
    for (let i = 0; i < max_squ; ++i) {
        ui.ctx.fillText((8 - i) + "", edge / 2, edge + (i * squ) + offset)
        ui.ctx.fillText(String.fromCharCode(a_code + i), edge + (i * squ) + offset, ui.canvas.clientHeight - (edge / 4))
    }

    let is_clr_squ = false
    for (let i = 0; i < max_squ ** 2; ++i) {
        if (i % 8 !== 0)
            is_clr_squ = !is_clr_squ
        ui.ctx.fillStyle = is_clr_squ ? green : beige

        const x = edge + (i % max_squ) * squ
        const y = edge + Math.floor(i / max_squ) * squ

        ui.ctx.fillRect(x, y, squ, squ)
    }

    ui.ctx.lineWidth = 2
    ui.ctx.strokeStyle = green
    ui.ctx.strokeRect(edge, edge, squ * 8, squ * 8)
}

const draw_pawn = ({ x, y }, clr) => {}
const draw_bishop = ({ x, y }, clr) => {}
const draw_knight = ({ x, y }, clr) => {}
const draw_rook = ({ x, y }, clr) => {}
const draw_queen = ({ x, y }, clr) => {}
const draw_king = ({ x, y }, clr) => {}

size_canvas()
draw_board()

let timeout;
window.addEventListener('resize', () => {
    clearTimeout(timeout)
    timeout = setTimeout(size_canvas, 20)
})