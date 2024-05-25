import './style.css'

const green = '#385546'
const off_green = '#cdaa7d'
const lbl_color = '#455c52'
const a_code = 65
const max_squ = 8     
const edge = 36

const ui = {
    canvas: document.getElementById('game'),
    ctx: '',
    squ: 0,
    offset: 0
}

const size_canvas = () => {
    ui.canvas.width = ui.canvas.clientWidth
    ui.canvas.height = ui.canvas.clientHeight
    ui.ctx = ui.canvas.getContext("2d")
}

const draw_board = () => {
    ui.squ = (ui.canvas.clientWidth - 72) / 8
    ui.offset = ui.squ / 2

    ui.ctx.font = '28px sans-serif'
    ui.ctx.textAlign = 'center'
    ui.ctx.fillStyle = lbl_color
    for (let i = 0; i < max_squ; ++i) {
        ui.ctx.fillText((8 - i) + "", edge / 2, edge + (i * ui.squ) + ui.offset)
        ui.ctx.fillText(String.fromCharCode(a_code + i), edge + (i * ui.squ) + ui.offset, ui.canvas.clientHeight - (edge / 4))
    }

    let is_clr_squ = false
    for (let i = 0; i < max_squ ** 2; ++i) {
        if (i % 8 !== 0)
            is_clr_squ = !is_clr_squ
        ui.ctx.fillStyle = is_clr_squ ? green : off_green

        const x = edge + (i % max_squ) * ui.squ
        const y = edge + Math.floor(i / max_squ) * ui.squ

        ui.ctx.fillRect(x, y, ui.squ, ui.squ)
    }

    ui.ctx.lineWidth = 2
    ui.ctx.strokeStyle = green
    ui.ctx.strokeRect(edge, edge, ui.squ * 8, ui.squ * 8)
}

const draw_starship = ({ x, y }, clr) => {
    const { ctx, squ } = ui
    const area = squ / 5
    const unit = area / 4

    const x_offset = edge + (x - 1) * squ
    const y_offset = edge + (8 - y) * squ

    ctx.fillStyle = clr
    ctx.beginPath()
    ctx.moveTo(x_offset, y_offset + 3 * area + unit)
    // left tail of wing
    ctx.lineTo(x_offset, y_offset + squ)
    ctx.lineTo(x_offset + unit, y_offset + squ)
    // shifted right
    ctx.lineTo(x_offset + area + unit, y_offset + 4 * area - unit)
    ctx.lineTo(x_offset + 2 * area + 2 * unit, y_offset + squ)
    ctx.lineTo(x_offset + 4 * area - unit, y_offset + 4 * area - unit)
    ctx.lineTo(x_offset + squ - unit, y_offset + squ)
    ctx.lineTo(x_offset + squ, y_offset +  squ)
    // shifted left
    ctx.lineTo(x_offset + squ, y_offset + 3 * area + unit)
    ctx.lineTo(x_offset + squ - unit, y_offset + 3 * area + unit)
    ctx.lineTo(x_offset + squ - unit, y_offset + 4 * area - unit)
    ctx.lineTo(x_offset + 4 * area, y_offset + 3 * area)
    ctx.lineTo(x_offset + 4 * area, y_offset + 2 * area)
    ctx.lineTo(x_offset + 4 * area - unit, y_offset + 2 * area)
    ctx.lineTo(x_offset + 4 * area - unit, y_offset + 3 * area - unit)
    ctx.lineTo(x_offset + 3 * area, y_offset + 2 * area)
    ctx.lineTo(x_offset + 3 * area, y_offset + area)
    ctx.lineTo(x_offset + 3 * area - unit, y_offset + area)
    ctx.lineTo(x_offset + 3 * area - unit, y_offset)
    ctx.lineTo(x_offset + 2 * area + unit, y_offset)
    ctx.lineTo(x_offset + 2 * area + unit, y_offset + area)
    ctx.lineTo(x_offset + 2 * area, y_offset + area)
    ctx.lineTo(x_offset + 2 * area, y_offset + 2 * area)
    ctx.lineTo(x_offset + area + unit, y_offset + 3 * area - unit)
    ctx.lineTo(x_offset + area + unit, y_offset + 2 * area + unit)
    ctx.lineTo(x_offset + area, y_offset + 2 * area + unit)
    ctx.lineTo(x_offset + area, y_offset + 3 * area)
    ctx.lineTo(x_offset + unit, y_offset + 4 * area - unit)
    ctx.lineTo(x_offset + unit, y_offset + 3 * area + unit)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = '#f00'
    ctx.fillRect(x_offset, y_offset + 3 * area, unit, unit)
    ctx.fillRect(x_offset + area, y_offset + 2 * area, unit, unit)
    ctx.fillRect(x_offset + 4 * area - unit, y_offset + 2 * area, unit, unit)
    ctx.fillRect(x_offset + squ - unit, y_offset + 3 * area, unit, unit)
    ctx.beginPath()
    ctx.moveTo(x_offset + 2 * area, y_offset + 3 * area)
    ctx.lineTo(x_offset + 2 * area, y_offset + 3 * area + 2 * unit)
    ctx.lineTo(x_offset + 2 * area + unit, y_offset + 3 * area + 2 * unit)
    ctx.lineTo(x_offset + 2 * area + unit, y_offset + 3 * area + unit)
    ctx.lineTo(x_offset + 2 * area + 3 * unit, y_offset + 3 * area + unit)
    ctx.lineTo(x_offset + 2 * area + 3 * unit, y_offset + 3 * area + 2 * unit)
    ctx.lineTo(x_offset + 3 * area, y_offset + 3 * area + 2 * unit)
    ctx.lineTo(x_offset + 3 * area, y_offset + 3 * area)
    ctx.lineTo(x_offset + 2 * area + 2 * unit, y_offset + 2 * area + 2 * unit)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(x_offset + 2 * area, y_offset + 4 * area)
    ctx.lineTo(x_offset + 2 * area + unit, y_offset + 4 * area)
    ctx.lineTo(x_offset + 2 * area + unit, y_offset + squ - unit)
    ctx.lineTo(x_offset + area + 3 * unit, y_offset + squ - unit)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(x_offset + 2 * area + 3 * unit, y_offset + 4 * area)
    ctx.lineTo(x_offset + 2 * area + 3 * unit, y_offset + squ - unit)
    ctx.lineTo(x_offset + 3 * area + unit, y_offset + squ - unit)
    ctx.lineTo(x_offset + 3 * area, y_offset + 4 * area)
    ctx.closePath()
    ctx.fill()
}

const draw_pawn = ({ x, y }, clr) => {}
const draw_bishop = ({ x, y }, clr) => {}
const draw_knight = ({ x, y }, clr) => {}
const draw_rook = ({ x, y }, clr) => {}
const draw_queen = ({ x, y }, clr) => {}
const draw_king = ({ x, y }, clr) => {}

size_canvas()
draw_board()
draw_starship({ x: 1, y: 2 }, '#fff')

let timeout;
window.addEventListener('resize', () => {
    clearTimeout(timeout)
    timeout = setTimeout(size_canvas, 20)
})