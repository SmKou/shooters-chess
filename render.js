const a_code = 65
const max_squ = 8
const edge = 36

const size = (cvs) => {
    cvs.width = cvs.clientWidth
    cvs.height = cvs.clientHeight

    const ctx = cvs.getContext('2d')
    ctx.font = '28px sans-serif'
    ctx.textAlign = 'center'

    const squ = (cvs.width - 2 * edge) / 8
    const offset = squ / 2
    const area = squ / 8
    const unit = area / 2

    return { ctx, squ, offset, area, unit }
}

const labels = (ui, colors) => {
    ui.ctx.fillStyle = colors.label
    for (let i = 0; i < max_squ; ++i) {
        ui.ctx.fillText(
            (8 - i) + "",
                        edge / 2 + edge / 8,
                        edge + i * ui.squ + ui.offset
        )
        ui.ctx.fillText(
            String.fromCharCode(a_code + i),
                        edge + i * ui.squ + ui.offset + edge / 4,
                        cvs.height - edge / 4
        )
    }
}

// How do the valid maneuvers get drawn on the board?
const board = (ui, colors) => {
    let is_dark_squ = false
    for (let i = 0; i < max_squ ** 2; ++i) {
        if (i % 8 !== 0) is_dark_squ = !is_dark_squ
            ui.ctx.fillStyle = is_dark_squ ? colors.dark_squ : colors.light_squ

            const x = (i % max_squ + 1) * ui.squ - edge
            const y = (8 - Math.floor(i / max_squ)) * ui.squ - 1.5 * edge
            ui.ctx.fillRect(x, y, ui.squ, ui.squ)

            // if (game.valid[pos_coord(i)]) {
            //     const mode = game.valid[pos_coord(i)]
            //     if (mode === 'move') {}
            //     if (mode === 'shoot') {}
            //     if (mode === 'series') {}
            // }
    }
}

export default {
    size,
    labels,
    board
}
