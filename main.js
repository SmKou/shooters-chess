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
    // true: person
    players: [true, true],
    // true: white = players[1]
    player: false
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
                { rank: 1, bridge: '', captured: false, dir: 1 },
                { rank: 1, bridge: '', captured: false, dir: 1 },
                { rank: 1, bridge: '', captured: false, dir: 1 },
                { rank: 1, bridge: '', captured: false, dir: 1 },
                { rank: 1, bridge: '', captured: false, dir: 1 },
                { rank: 1, bridge: '', captured: false, dir: 1 },
                { rank: 1, bridge: '', captured: false, dir: 1 },
                { rank: 1, bridge: '', captured: false, dir: 1 }
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
                { rank: 1, bridge: '', captured: false, dir: -1 },
                { rank: 1, bridge: '', captured: false, dir: -1 },
                { rank: 1, bridge: '', captured: false, dir: -1 },
                { rank: 1, bridge: '', captured: false, dir: -1 },
                { rank: 1, bridge: '', captured: false, dir: -1 },
                { rank: 1, bridge: '', captured: false, dir: -1 },
                { rank: 1, bridge: '', captured: false, dir: -1 },
                { rank: 1, bridge: '', captured: false, dir: -1 }
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

// How do the valid maneuvers get drawn on the board?
const draw_board = () => {
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

/*
 * 1. start_turn
 * Change current player
 * Get side >> side
 * Clear input fields
 * List of player's pieces >> list: side |> get_pieces
 * - if player: list |> load_select(#user-pieces, _)
 * - else: compute(list)
 *
 * Computer sequenece:
 * 1. start_turn
 * 2. compute
 * 3. run_decision
 * 4. declare_maneuver
 *
 * Player sequence:
 * 1. start_turn
 * 2. 'change' on #user-pieces: select_piece
 *    >> input maneuver
 * 3. 'click' on #submit-btn: declare_maneuver
 *    or
 *    'click' on #skip-btn: start_turn
 */

const start_turn = () => {
    game.player = !game.player
    const side = game.player ? 'white' : 'black'
    document.getElementById('user').innerHTML = side[0].toUpperCase() + side.slice(1)

    document.getElementById('user-maneuvers').innerHTML = ''

    const pieces_list = get_pieces(side)
    if (game.players[Number(game.player)]) {
        pieces_list.unshift({ value: '', name: 'Select a piece' })
        load_select(document.getElementById('user-pieces'), pieces_list)
    }
    else computer(pieces_list)
}

/*
 * 2. get_pieces(side)
 * List of side-pieces >> { name: <select_text>, value: <coordinate> }
 * - <select_text>: <coordinate> <Piece>
 */
const get_pieces = (side) => {
    const on_board = []
    for (let i = 0; i < game.board.length; ++i) {
        const piece = game.board[i].split('-')

        let piece_copy = [...piece]
        let piece_data = game.pieces
        while (piece_copy.length)
            piece_data[piece_copy.shift()]

        if ((piece[0] === side && piece_data.captured) || (piece[0] !== side && !piece_data.captured))
            continue;

        const coord = pos_coord(i)

        on_board.push({
            name: coord + ' ' + piece[1][0].toUpperCase() + piece[1].slice(1),
            value: coord
        })
    }
    return on_board
}

/*
 * 3. select_piece(coord)
 * Convert coordinate to index
 * Get piece: <side>-<piece_type>-<number|board_side>
 * Based on piece => get valid maneuvers
 * - func piece_type(idx) => list<object>[{
 *        move_to,
 *        bridge_with,
 *        unbridge,
 *        unload_to,
 *        shoot_at
 * }, ...]
 */

const pawn = (idx) => {
    let path = game.board[idx].split('-')
    let piece = game.pieces
    while (path.length)
        piece = piece[path.shift()]
}

const bishop = (idx) => {}

const knight = (idx) => {}

const rook = (idx) => {}

const queen = (idx) => {}

const king = (idx) => {}

const select_piece = (coord) => {
    const idx = pos_idx(coord)
    if (idx >= game.board.length)
        return { error: 'Invalid position' }
    const piece = game.board[idx].split('-')

    let maneuvers = {}
    switch (piece[1]) {
        case 'pawn':
            maneuvers = pawn(idx)
            break
        case 'bishop':
            maneuvers = bishop(idx)
            break
        case 'knight':
            maneuvers = knight(idx)
            break
        case 'rook':
            maneuvers = rook(idx)
            break
        case 'queen':
            maneuvers = queen(idx)
            break
        case 'king':
            maneuvers = king(idx)
            break
        default:
            console.error('Invalid piece')
            return;
    }
    console.log(maneuvers)
}

// Algorithms:
// Ranking
// Bridging
// Offensive
// Defensive
const run_decision = (list, coord_list = list.map(itm => itm.value)) => {
    const maneuvers = coord_list.map(coord => {
        const valid = select_piece(coord)
        if (valid.error)
            return;
        return valid
    })
}

/*
 * 4. declare_maneuver(maneuver)
 */

// maneuver
// Object{ value: coord, move_to, bridge_with, unbridge, unload_to, shoot_at }
const declare_maneuver = (maneuver) => {}

// list |> run_decision |> declare_maneuver
const compute = (list) => {
    const maneuver = run_decision(list)
    declare_maneuver(maneuver)
}

const load_select = (select_elm, list) => {
    select_elm.innerHTML = ''
    list.forEach(itm => {
        const option = document.createElement('option')
        option.value = itm.value
        option.append(document.createTextNode(itm.name))
        select_elm.append(option)
    })
}

const load_game_info = () => {
    const elms = Array.from(document.querySelectorAll('#info div'))
    const list = elms.map(elm => {
        const classnames = elm.className.split(' ')
        const name = classnames.length > 2 ? classnames[1][0].toUpperCase() + classnames[1].slice(1) : classnames[0][0].toUpperCase() + classnames[0].slice(1)
        const value = classnames[0]
        return { name, value }
    })
    list.unshift({ name: 'View more info', value: '' })
    load_select(document.getElementById('game-info'), list)
}
load_game_info()

const load = () => {
    size_canvas()
    new_game()
    draw_labels()
    draw_board()

    start_turn()
}

document.getElementById('game-info').addEventListener('change', e => {
    const value = e.target.value
    const info = document.getElementById('info')
    if (!value) {
        if (!info.classList.contains('inactive'))
            info.classList.toggle('inactive')
        return;
    }

    if (info.classList.contains('inactive'))
        info.classList.toggle('inactive')
    const active = document.querySelector('#info div:not(.inactive)')
    if (active)
        active.classList.toggle('inactive')
    const classname = document.querySelector('.' + value).className.split(' ')[0]
    document.querySelector('#info div.' + classname).classList.toggle('inactive')
})

document.getElementById('user-pieces').addEventListener('change', e => {
    const coord = e.target.value
    select_piece(coord)
})

window.addEventListener('load', load)
window.addEventListener('resize', load)
