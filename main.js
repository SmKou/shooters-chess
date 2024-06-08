import './style.css'

const green = '#385546'
const off_green = '#CDAA7D'
const bg = '#E9D7BC'
const label = '#455C52'
const red = '#5F1510'

const a_code = 65
const max_squ = 8
const edge = 36

const cvs = document.getElementById('game')

const ui = {
    ctx: '',
}

const measure = {
    squ: 0,
    offset: 0
}

const board = [
    ['white-rook-left', 'white-knight-left', 'white-bishop-left', 'white-king', 'white-queen', 'white-bishop-right', 'white-knight-right', 'white-rook-right'],
    ['white-pawn-1', 'white-pawn-2', 'white-pawn-3', 'white-pawn-4', 'white-pawn-5', 'white-pawn-6', 'white-pawn-7', 'white-pawn-8'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['black-pawn-1', 'black-pawn-2', 'black-pawn-3', 'black-pawn-4', 'black-pawn-5', 'black-pawn-6', 'black-pawn-7', 'black-pawn-8'],
    ['black-rook-left', 'black-knight-left', 'black-bishop-left', 'black-king', 'black-queen', 'black-bishop-right', 'black-knight-right', 'black-rook-right']
]

const pieces = {

}

const playing_pieces = {
    white: {
        king: { is_on_board: true, rank: 9, bridge: '', captured: false },
        queen: { is_on_board: true, rank: 9, captured: false },
        rook: {
            left: { is_on_board: true, rank: 5, bridge: '', captured: false },
            right: { is_on_board: true, rank: 5, bridge: '', captured: false }
        },
        knight: {
            left: { is_on_board: true, rank: 3, bridge: '', captured: false },
            right: { is_on_board: true, rank: 3, bridge: '', captured: false }
        },
        bishop: {
            left: { is_on_board: true, rank: 3, bridge: '', captured: false },
            right: { is_on_board: true, rank: 3, bridge: '', captured: false }
        },
        pawn: [
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false }
        ]
    },
    black: {
        king: { is_on_board: true, rank: 9, bridge: '', captured: false },
        queen: { is_on_board: true, rank: 9, captured: false },
        rook: {
            left: { is_on_board: true, rank: 5, bridge: '', captured: false },
            right: { is_on_board: true, rank: 5, bridge: '', captured: false }
        },
        knight: {
            left: { is_on_board: true, rank: 3, bridge: '', captured: false },
            right: { is_on_board: true, rank: 3, bridge: '', captured: false }
        },
        bishop: {
            left: { is_on_board: true, rank: 3, bridge: '', captured: false },
            right: { is_on_board: true, rank: 3, bridge: '', captured: false }
        },
        pawn: [
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false },
            { is_on_board: true, rank: 1, bridge: '', captured: false }
        ]
    }
}

const chess = {
    board: ,
    pieces: {
    },

}

const size_canvas = () => {
    cvs.width = cvs.clientWidth
    cvs.height = cvs.clientHeight

    ui.ctx = cvs.getContext('2d')
}

const draw_board = () => {
    ui.squ = (cvs.width - 2 * edge) / 8
    ui.offset = ui.squ / 2

    ui.ctx.font = '28px sans-serif'
    ui.ctx.textAlign = 'center'
    ui.fillStyle = label
    for (let i = 0; i < max_squ; ++i) {
        ui.ctx.fillText((8 - i) + "", edge / 2, edge + i * ui.squ + ui.offset)
        ui.ctx.fillText(String.fromCharCode(a_code + i), edge + i * ui.squ + ui.offset, cvs.height - edge / 4)
    }

    let is_off_squ = false
    for (let i = 0; i < max_squ ** 2; ++i) {
        if (i % 8 !== 0)
            is_off_squ = !is_off_squ
        ui.ctx.fillStyle = is_off_squ ? green : off_green

        const x = edge + (i % max_squ) * ui.squ
        const y = edge + Math.floor(i / max_squ) * ui.squ
        ui.ctx.fillRect(x, y, ui.squ, ui.squ)
    }
}

const draw_pieces = () => {}

(() => {
    const cvs = document.getElementById('settings-btn-img')
    const ctx = cvs.getContext('2d')

    const d = 36
    const area = d / 6
    const t1 = [ [0, -3 * area], [area, -area], [-area, -area] ]
    const t2 = [ [0, 3 * area], [-area, area], [area, area] ]

    ctx.fillStyle = off_green

    const tri = t => {
        ctx.beginPath()
        ctx.moveTo(...t[0])
        ctx.lineTo(...t[1])
        ctx.lineTo(...t[2])
        ctx.closePath()
        ctx.fill()
    }

    ctx.translate(3 * area, 3 * area)
    ctx.scale(0.75, 0.75)
    ctx.beginPath()
    ctx.arc(0, 0, area + 2, 0, 2 * Math.PI)
    ctx.fill()
    tri(t1)
    tri(t2)
    for (let i = 0; i < 9; ++i) {
        ctx.rotate((Math.PI / 180) * 22.5)
        tri(t1)
        tri(t2)
    }

    ctx.fillStyle = red
    ctx.beginPath()
    ctx.arc(0, 0, area + area / 2, 0, 2 * Math.PI)
    ctx.fill()
})()

const load = () => {
    size_canvas()
    draw_board()
}

window.addEventListener('load', load)
window.addEventListener('resize', load)
