import help from '/helpers'
import props from '/settings'
import game from '/game'
import render from '/render'
import './style.css'

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

const clear = (side) => {
    document.getElementById('user').innerHTML = side[0].toUpperCase() + side.slice(1)
    document.getElementById
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

const get_piece = (idx) => {
    if (idx < 0)
        return false
    let path = game.board[idx].split('-')
    let piece = game.pieces
    while (path.length)
        piece = piece[path.shift()]
    return piece
}

const pawn = (idx) => {
    const piece = get_piece(idx)
    const bridge_piece = get_piece(piece.bridge)

    const maneuvers = []

    const dir = idx + 8 * piece.dir
    const dir_left = dir + 1 * piece.dir
    const dir_right = dir - 1 * piece.dir

    if (!game.board[dir]) {
        const dir_dir = dir + 8 * piece.dir
        const dir_dir_left = dir_dir + 1 * piece.dir
        const dir_dir_right = dir_dir - 1 * piece.dir

        const maneuver = { move_to: dir }
        maneuvers.push(maneuver)

        if (game.board[dir_dir_left])
            maneuvers.push({ ...maneuver, shoot_at: dir_dir_left })
        if (game.board[dir_dir_right])
            maneuvers.push({ ...maneuver, shoot_at: dir_dir_right })
    }

    if (game.board[dir_left]) {
        const maneuver = { shoot_at: dir_left }
        maneuvers.push(maneuver)
        maneuvers.push({ ...maneuver, move_to: dir_left })
    }

    if (game.board[dir_right]) {
        const maneuver = { shoot_at: dir_right }
        maneuvers.push(maneuver)
        maneuvers.push({ ...maneuver, move_to: dir_right })
    }

    const left = idx + 1 * piece.dir
    const right = idx - 1 * piece.dir
    const backward = idx - 8 * piece.dir

    if (piece.bridge >= 0) {
        const maneuver = { unbridge_with: piece.bridge }
        maneuvers.push(maneuver)

        if (game.board[dir_left])
            maneuvers.push({ ...maneuver,  shoot_at: dir_left })
        if (game.board[dir_right])
            maneuvers.push({ ...maneuver, shoot_at: dir_right })
    }
    else {
        if (game.board[left])
            maneuvers.push({ bridge_with: left })
        if (game.board[right])
            maneuvers.push({ bridge_with: right })
        if (game.board[backward])
            maneuvers.push({ bridge_with: backward })
        if (game.board[dir])
            maneuvers.push({ bridge_with: dir })
    }

    return maneuvers
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
    const ui = render.size(document.getElementById('game'))
    const settings = props.settings
    const game = game.setup()

    render.labels(ui, settings.colors.val())
    render.board(ui, settings.colors.val())

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
