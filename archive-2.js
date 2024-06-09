import './style.css'

const green = '#385546'
const off_green = '#CDAA7D'
const bg = '#E9D7BC'
const label = '#455C52'
const red = '#5F1510'

const colors = {
    background: '#E9D7BC',
    label: '#455C52',
    classic: {
        light_board: '#CDAA7D',
        dark_board: '#385546',
        valid_move: ''
    },
    contrast: {
        light_board: '#E4E6C3',
        dark_board: '222725',
        valid_move: '#899878'
    }
}

const a_code = 65
const max_squ = 8
const edge = 36

const cvs = document.getElementById('game')

const get_element = (name, value) => {
    const elements = document.getElementsByName(name)
    for (const element of elements)
        console.log(element, element.checked)

    const setting = document.querySelector('input[name="' + name + ':checked"]')
    if (!setting) console.error('no element')
    if (setting.name === name) console.log('name match')
    if (setting.checked) console.log('checked')
}

const retrieve_setting = (name) => () => document.querySelector(`input[name="${name}"]:checked`)

const ui = {
    ctx: '',
    squ: 0,
    offset: 0,
    colors: 'contrast',
    game: {
        current_player: true
    }
}

const new_game = () => {
    ui.game.board = [
        // first row fr. bottom
        'white-rook-left', 'white-knight-left', 'white-bishop-left', 'white-king', 'white-queen', 'white-bishop-right', 'white-knight-right', 'white-rook-right',
        // second row
        'white-pawn-0', 'white-pawn-1', 'white-pawn-2', 'white-pawn-3', 'white-pawn-4', 'white-pawn-5', 'white-pawn-6', 'white-pawn-7',
        // third row
        '', '', '', '', '', '', '', '',
        // fourth row
        '', '', '', '', '', '', '', '',
        // fifth row
        '', '', '', '', '', '', '', '',
        // sixth row
        '', '', '', '', '', '', '', '',
        // seventh row
        'black-pawn-0', 'black-pawn-1', 'black-pawn-2', 'black-pawn-3', 'black-pawn-4', 'black-pawn-5', 'black-pawn-6', 'black-pawn-7',
        'black-rook-left', 'black-knight-left', 'black-bishop-left', 'black-king', 'black-queen', 'black-bishop-right', 'black-knight-right', 'black-rook-right'
    ]
    ui.game.playing_pieces = {
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
}

const pieces = {
    king: {

    },
    queen: {},
    rook: {},
    knight: {},
    bishop: {},
    pawn: {}
}

const get_pieces = (side) => {

}
const get_piece = (pos) => {}

const size_canvas = () => {
    cvs.width = cvs.clientWidth
    cvs.height = cvs.clientHeight
    ui.ctx = cvs.getContext('2d')

    ui.ctx.font = '28px sans-serif'
    ui.ctx.textAlign = 'center'

    ui.squ = (cvs.width - 2 * edge) / 8
    ui.offset = ui.squ / 2
}

const alpha = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 }
const pos_coord = (idx) => {
    const x = idx % max_squ
    const y = Math.floor(idx / max_squ)

    const nums = Object.values(alpha)
    const i = nums.indexOf(x)
    const a = alpha[Object.keys(alpha)[i]]

    return `${x}${y}`
}
const pos_idx = (coord) => {
    if (isNaN(coord[0]))
        return alpha[coord[0]] + 8 * Number(coord[1])
    return alpha[coord[1]] + 8 * Number(coord[0])
}

const draw_board = () => {
    ui.fillStyle = colors.label
    for (let i = 0; i < max_squ; ++i) {
        ui.ctx.fillText((8 - i) + "", edge / 2, edge + i * ui.squ + ui.offset)
        ui.ctx.fillText(String.fromCharCode(a_code + i), edge + i * ui.squ + ui.offset, cvs.height - edge / 4)
    }
    let is_off_squ = false
    for (let i = 0; i < max_squ ** 2; ++i) {
        if (i % 8 !== 0)
            is_off_squ = !is_off_squ
        if (test.hasOwnProperty(i))
            ui.ctx.fillStyle = test[i]
        else
            ui.ctx.fillStyle = is_off_squ ? colors[ui.colors].dark_board : colors[ui.colors].light_board
        const x = (i % max_squ + 1) * ui.squ - edge
        const y = (8 - Math.floor(i / max_squ)) * ui.squ - 1.5 * edge
        ui.ctx.fillRect(x, y, ui.squ, ui.squ)

        if (ui.game.board[i]) {
            const piece_path = ui.game.board[i].split('-')
            let piece_info = ui.game.playing_pieces
            for (const idx of piece_path)
                piece_info = piece_info[idx]
            if (!piece_info.is_on_board) continue;
            const side = piece_path.includes('white')

            ui.ctx.fillStyle = side ? 'white' : 'black'
            ui.ctx.strokeStyle = !side ? 'white' : 'black'
            ui.ctx.lineWidth = 10

            ui.ctx.beginPath()
            ui.ctx.arc(x + ui.squ / 2, y + ui.squ / 2, ui.squ / 4, 0, 2 * Math.PI)
            ui.ctx.stroke()
            ui.ctx.fill()

            ui.ctx.fillText(piece_info.rank, x + ui.squ / 8, y + ui.squ / 4 + ui.squ / 8)
            ui.ctx.fillStyle = side ? 'blue' : 'red'
            ui.ctx.fillText(piece_path[1][0].toUpperCase(), x + ui.squ / 2, y + ui.squ * 3 / 4 - ui.squ / 8)
        }
    }
}

const draw_king = () => {}

const draw_pieces = () => {

}

(() => {
    const cvs = document.getElementById('settings-btn-img')
    const ctx = cvs.getContext('2d')

    const d = 36
    const area = d / 6
    const t1 = [ [0, -3 * area], [area, -area], [-area, -area] ]
    const t2 = [ [0, 3 * area], [-area, area], [area, area] ]

    ctx.fillStyle = colors[ui.colors].light_board

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

    ctx.fillStyle = colors.background
    ctx.beginPath()
    ctx.arc(0, 0, area + area / 2, 0, 2 * Math.PI)
    ctx.fill()
})()

const update_settings = () => {

}

document.getElementById('settings-btn').addEventListener('click', () => document.getElementById('settings').classList.toggle('inactive'))
document.getElementById('settings').addEventListener('click', draw_board)



const load = () => {
    size_canvas()
    new_game()
    get_element("graphics", "coins")
    get_element("colors", "classic")
    // draw_board()
}

window.addEventListener('load', load)
window.addEventListener('resize', load)
