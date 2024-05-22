import './style.css'

const green = '#385546'
const beige = '#e9d7bc'
const lbl_color = '#455c52'

const canvas = document.getElementById('game')
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight
const ctx = canvas.getContext("2d")

const size_canvas = () => {
}

const draw_board = () => {
    const a_code = 65
    const max_squ = 8     
    const squ = (canvas.clientWidth - 72) / 8
    const edge = 36
    const offset = squ / 2

    ctx.font = '28px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillStyle = lbl_color
    for (let i = 0; i < max_squ; ++i) {
        ctx.fillText((8 - i) + "", edge / 2, edge + (i * squ) + offset)
        ctx.fillText(String.fromCharCode(a_code + i), edge + (i * squ) + offset, canvas.clientHeight - (edge / 2))
    }
}
draw_board()

