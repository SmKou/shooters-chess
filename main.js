import './style.css'

const a_code = 65
const max_squ = 8
const edge = 36
const alpha = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7
}
const colors = {
    background: '#E9D7BC',
    label: '#455C52',
    light_squ: '#CDAA7D',
    dark_squ: '#385546'
}

const cvs = document.getElementById('game')
const ui = {
    ctx: '',
    squ: 0,
    offset: 0,
    area: 0,
    unit: 0
}

const size_canvas = () => {
    cvs.width = cvs.clientWidth
    cvs.height = cvs.clientHeight
    ui.ctx = cvs.getContext('2d')
    ui.ctx.font = '28px sans-serif'
    ui.ctx.textAlign = 'center'

    ui.squ = (cvs.width - 2 * edge) / 8
    ui.offset = ui.squ / 2

    ui.area = ui.squ / 8
    ui.unit = ui.area / 2
}

const game = {
    players: [true, true],    // true: person
    player: false,              // true: white
    valid: {},
    current_piece: '',
    move_to: '',
    unbridge: false,
    bridge_with: '',
    unload_to: '',
    shoot_at: ''
}

const new_game = () => {
    game.board = [
        // first row fr. bottom
        'white-rook-queen', 'white-knight-queen', 'white-bishop-queen', 'white-queen', 'white-king',  'white-bishop-king', 'white-knight-king', 'white-rook-king',
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
        'black-rook-queen', 'black-knight-queen', 'black-bishop-queen', 'black-queen', 'black-king', 'black-bishop-king', 'black-knight-king', 'black-rook-king'
    ]

    // queen = left side, king = right side
    game.pieces = {
        white: {
            king: { rank: 9, bridge: '', captured: false },
            queen: { rank: 9, captured: false },
            rook: {
                queen: { rank: 5, bridge: '', captured: false },
                king: { rank: 5, bridge: '', captured: false }
            },
            knight: {
                queen: { rank: 3, bridge: '', captured: false },
                king: { rank: 3, bridge: '', captured: false }
            },
            bishop: {
                queen: { rank: 3, bridge: '', captured: false },
                king: { rank: 3, bridge: '', captured: false }
            },
            pawn: [
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false }
            ]
        },
        black: {
            king: { rank: 9, bridge: '', captured: false },
            queen: { rank: 9, captured: false },
            rook: {
                queen: { rank: 5, bridge: '', captured: false },
                king: { rank: 5, bridge: '', captured: false }
            },
            knight: {
                queen: { rank: 3, bridge: '', captured: false },
                king: { rank: 3, bridge: '', captured: false }
            },
            bishop: {
                queen: { rank: 3, bridge: '', captured: false },
                king: { rank: 3, bridge: '', captured: false }
            },
            pawn: [
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false },
                { rank: 1, bridge: '', captured: false }
            ]
        }
    }
}

const pos_coord = (idx) => {
    const idx_fr_vals = Object.values(alpha).indexOf(idx % max_squ)
    const x = Object.keys(alpha)[idx_fr_vals]
    const y = Math.floor(idx / max_squ) + 1
    return `${x}${y}`
}

const pos_idx = (coord) => alpha[coord[0]] + 8 * (Number(coord[1]) - 1)

const draw_labels = () => {
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

const draw_board = () => {
    let is_dark_squ = false
    for (let i = 0; i < max_squ ** 2; ++i) {
        if (i % 8 !== 0) is_dark_squ = !is_dark_squ
        ui.ctx.fillStyle = is_dark_squ ? colors.dark_squ : colors.light_squ

        const x = (i % max_squ + 1) * ui.squ - edge
        const y = (8 - Math.floor(i / max_squ)) * ui.squ - 1.5 * edge
        ui.ctx.fillRect(x, y, ui.squ, ui.squ)

        if (game.valid[pos_coord(i)]) {
            const mode = game.valid[pos_coord(i)]
            if (mode === 'move') {}
            if (mode === 'shoot') {}
            if (mode === 'series') {}
        }
    }
}

const start_turn = () => {
    game.player = !game.player
    const side = game.player ? 'white' : 'black'
    document.getElementById('user').innerHTML = side[0].toUpperCase() + side.slice(1)

    document.getElementById('move-to').innerHTML = ''
    document.getElementById('bridge-with').innerHTML = ''
    document.getElementById('unload-to').innerHTML = ''
    document.getElementById('shoot-at').innerHTML = ''

    game.move_to = ''
    game.unbridge = false
    game.bridge_with = ''
    game.unload_to = ''
    game.shoot_at = ''

    const pieces_list = get_pieces(side)
    load_select(document.getElementById('user-pieces'), pieces_list)
    if (game.players[Number(game.player)])
        run_decision(pieces_list)
}

const get_pieces = (side) => {
    const on_board = []
    for (let i = 0; i < game.board.length; ++i)
        if (game.board[i].includes(side))
            on_board.push(i)
    const list = on_board.map(idx => {
        const coord = pos_coord(idx)
        const piece = game.board[idx].split('-')
        const name = coord + ' ' + piece[1][0].toUpperCase() + piece[1].slice(1)
        return { value: coord, name }
    })
    return list
}

const select_piece = (coord) => {
    const idx = pos_idx(coord)
    const piece = game.board[idx].split('-')
    console.log(idx, piece)
}

const declare_maneuver = () => {}

// Algorithms:
// Ranking
// Bridging
// Offensive
// Defensive
const run_decision = (list) => {}

const load_select = (select_elm, list) => {
    select_elm.innerHTML = ''
    list.forEach(itm => {
        const option = document.createElement('option')
        option.value = itm.value
        option.append(document.createTextNode(itm.name))
        select_elm.append(option)
    })
}

const load = () => {
    size_canvas()
    new_game()
    draw_labels()
    draw_board()

    start_turn()
}


document.getElementById('user-pieces').addEventListener('change', e => {
    const coord = e.target.value
    select_piece(coord)
})

window.addEventListener('load', load)
window.addEventListener('resize', load)
