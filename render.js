const a_code = 65
const max_squ = 8
const edge = 36

const size_canvas = (cvs) => {
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

export default {
    size_canvas
}
