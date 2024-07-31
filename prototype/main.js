import './style.css'

const alpha = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 }
const sides = ['black', 'white']
const max_squ = 8
const game = {
	player: true,
	selected_pos: '',
	maneuvers: [],
	board: [
		// first row fr. bottom
		"white_rook_queen", "white_knight_queen", "white_bishop_queen", "white_queen", "white_king", "white_bishop_king", "white_knight_king", "white_rook_king",
		// second row
		"white_pawn_1", "white_pawn_2", "white_pawn_3", "white_pawn_4", "white_pawn_5", "white_pawn_6", "white_pawn_7", "white_pawn_8",
		"", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "",
		// seventh row fr. bottom
		"black_pawn_1", "black_pawn_2", "black_pawn_3", "black_pawn_4", "black_pawn_5", "black_pawn_6", "black_pawn_7", "black_pawn_8",
		// eighth row
		"black_rook_queen", "black_knight_queen", "black_bishop_queen", "black_queen", "black_king", "black_bishop_king", "black_knight_king", "black_rook_king"
	],
	pieces: {
		white_rook_queen: { rank: 5, side: true },
		white_rook_king: { rank: 5, side: true },
		white_knight_queen: { rank: 3, side: true },
		white_knight_king: { rank: 3, side: true },
		white_bishop_queen: { rank: 3, side: true },
		white_bishop_king: { rank: 3, side: true },
		white_queen: { rank: 9, side: true },
		white_king: { rank: 9, side: true },
		white_pawn_1: { rank: 1, dir: 1, first_move: true, side: true },
		white_pawn_2: { rank: 1, dir: 1, first_move: true, side: true },
		white_pawn_3: { rank: 1, dir: 1, first_move: true, side: true },
		white_pawn_4: { rank: 1, dir: 1, first_move: true, side: true },
		white_pawn_5: { rank: 1, dir: 1, first_move: true, side: true },
		white_pawn_6: { rank: 1, dir: 1, first_move: true, side: true },
		white_pawn_7: { rank: 1, dir: 1, first_move: true, side: true },
		white_pawn_8: { rank: 1, dir: 1, first_move: true, side: true },
		black_rook_queen: { rank: 5, side: false },
		black_rook_king: { rank: 5, side: false },
		black_knight_queen: { rank: 3, side: false },
		black_knight_king: { rank: 3, side: false },
		black_bishop_queen: { rank: 3, side: false },
		black_bishop_king: { rank: 3, side: false },
		black_queen: { rank: 9, side: false },
		black_king: { rank: 9, side: false },
		black_pawn_1: { rank: 1, dir: -1, first_move: true, side: false },
		black_pawn_2: { rank: 1, dir: -1, first_move: true, side: false },
		black_pawn_3: { rank: 1, dir: -1, first_move: true, side: false },
		black_pawn_4: { rank: 1, dir: -1, first_move: true, side: false },
		black_pawn_5: { rank: 1, dir: -1, first_move: true, side: false },
		black_pawn_6: { rank: 1, dir: -1, first_move: true, side: false },
		black_pawn_7: { rank: 1, dir: -1, first_move: true, side: false },
		black_pawn_8: { rank: 1, dir: -1, first_move: true, side: false }
	},
	record: []
}

const pos_coord = (idx) => {
	const x = idx % max_squ
	const y = Math.floor(idx / max_squ)

	const nums = Object.values(alpha)
	const i = nums.indexOf(x)
	const a = alpha[Object.keys(alpha)[i]]

	return `${x}${y}`
}

const pos_idx = (coord) => alpha[coord[0]] + 8 * (Number(coord[1]) - 1)

const format_name = (name, pos) => {
	const piece = name.split('_')[1]
	return `${piece[0].toUpperCase() + piece.slice(1)} at ${pos.toUpperCase()}`
}

const move = (pre, post) => {
	const idx = pos_idx(pre)
	const piece = game.board[idx]

	const dest_idx = pos_idx(post)
	const dest_piece = game.board[dest_idx]

	if (dest_piece)
		return {
			status: false,
			message: `${format_name(piece, pre)} cannot move to ${post}`
		}

	return {
		status: true,
		message: `${format_name(piece, pre)} moved to ${post}`,
		deselect: [pre],
		move: { [idx]: dest_idx },
		piece
	}
}

const orbit = (pre, post) => {
	return {
		status: true,
		message: `${pre} orbited to ${post}`
	}
}

const shoot = (pre, post) => {
	return {
		status: true,
		message: `${pre} shot at ${post}`
	}
}

const bridge = (pre, post) => {
	return {
		status: true,
		message: `${pre} bridged ${post}`
	}
}

const unbridge = (pre, post) => {
	if (post)
		return unload(pre, post)
	return {
		status: true,
		message: `${pre} unbridged`
	}
}

const unload = (pre, post) => {
	return {
		status: true,
		message: `${pre} unloaded to ${post}`
	}
}

const render_piece = (div, piece) => {
	const span = document.createElement('span')
	span.setAttribute('class', 'piecename')
	span.append(
		document.createTextNode(
			piece[1] === 'knight' ? 'N' : piece[1][0].toUpperCase()
		)
	)
	div.append(span)

	const superscript = document.createElement('span')
	superscript.setAttribute('class', 'superscript')
	superscript.append(document.createTextNode(piece[0][0].toUpperCase()))
	div.append(superscript)

	if (piece.length > 2) {
		const subscript = document.createElement('span')
		subscript.setAttribute('class', 'subscript')
		subscript.append(document.createTextNode(piece[2][0].toUpperCase()))
		div.append(subscript)
	}
}

const draw = () => {
	document.getElementById('board').innerHTML = ''
	for (let i = 0; i < max_squ ** 2; ++i) {
		const div = document.createElement("div")
		const idx_val = Object.values(alpha).indexOf(i % max_squ)
		div.id = `${Object.keys(alpha)[idx_val]}${Math.floor(i / max_squ) + 1}`
		if (game.board[i]) {
			const piece = game.board[i].split('_')
			render_piece(div, piece)
		}
		document.getElementById('board').append(div)
	}
	document.getElementById('user-command').value = ''
	document.getElementById('confirmation').value = ''
}
draw()

const deselect = (pos) => {
	document.getElementById(pos).style.background = 'transparent'
	const piece = game.board[pos_idx(pos)]
	const bridged = game.pieces[piece].bridged
	if (bridged)
		document.getElementById(bridged).style.background = 'transparent'
}

const select = (pos) => {
	if (pos === game.pos) return;

	if (game.pos) {
		deselect(game.pos)
		game.pos = ''
	}

	if (!game.board[pos_idx(pos)]) return;

	document.getElementById(pos).style.background = 'lightgreen'
	game.pos = pos

	const piece = game.board[pos_idx(pos)]
	const bridge = game.pieces[piece]?.bridged
	if (bridge)
		document.getElementById(bridge).style.background = 'lightgreen'
}

const command = []

const actions_controller = (pre, post, cmd) => {
	switch (cmd) {
		case 'm':
			return move(pre, post)
		case 'x':
			return shoot(pre, post)
		case 'r':
			return bridge(pre, post)
		case 'u':
			if (post)
				return unload(pre, post)
			else
				return unbridge(pre, post)
		default:
			return {
				status: false,
				message: `Improper maneuver: ${pre}${cmd}${post}`
			}
	}
}

const controller = ({ piece, actions, targets }) => {
	const changes = {
		move: [],
		remove: [],
		message: []
	}

	let target = targets.shift()
	while (actions.length) {
		const action = actions.shift()
		const res = actions_controller(piece, target, action)
		if (!res.status)
			return res

		if (res.piece)
			piece = res.piece
		if (res.move)
			changes.move.push(res.move)
		if (res.remove)
			changes.remove.push(res.remove)

		if (targets.length)
			target = targets.shift()
		changes.message.push(res.message)
	}

	return changes
}

const change_board = ({ move, remove }) => {
	for (const coord of remove) {
		const idx = pos_idx(coord)
		const piece = game.board[idx]
		delete(game.pieces[piece])
		game.board[idx] = ''
	}

	for (const coord of Object.keys(move)) {
		const idx = pos_idx(coord)
		const piece = game.board[idx]

		const dest_idx = pos_idx[move[coord]]
		const dest_piece = game.board[dest_idx]
		if (dest_piece)
			return {
				status: false,
				message: `Error found: ${dest_piece} at ${move[coord]}, ${piece} cannot move.`
			}

		game.board[idx] = ''
		game.board[dest_idx] = piece
	}

	return { status: true }
}

const clear = (message) => {
	if (message)
		document.getElementById('confirmation').innerHTML = message
	document.getElementById('user-command').value = ''
	command.length = 0
}

document.getElementById('user-command').addEventListener('keydown', e => {
	// Command construction
	if (e.key === 'Backspace') {
		if (!command.length) return;
		if (command[command.length - 1].length > 1)
			command[command.length - 1] = command[command.length - 1].slice(0, -1)
		else
			command.pop()
		return;
	}
	if (!isNaN(e.key)) {
		const v = command[command.length - 1]
		command[command.length - 1] = v + e.key
	}
	if (e.key !== 'Enter' && new RegExp(/[a-hmrux]/i).test(e.key))
		command.push(e.key)

	if (e.key !== 'Enter') return;

	// Command execution
	document.getElementById('confirmation').innerHTML = ''
	const cmd = command.join('')

	if (command.length > 5) {
		clear(`Invalid maneuver: ${cmd}`)
		return;
	}

	for (const token of command)
		if (token.length < 1 || token.length > 2) {
			clear(`Invalid maneuver: ${cmd}`)
			return;
		}

	const tokens = {
		piece: command.shift().toUpperCase(),
		actions: [],
		targets: []
	}

	let counts = []
	while (command.slice().length) {
		const token = command.shift()
		if (token.length === 1)
			tokens.actions.push(token)
		else
			tokens.targets.push(token.toUpperCase())
		counts[token.length - 1]
	}

	if (counts[0] > counts[1]) {
		clear(`Invalid maneuver: ${cmd}`)
		return;
	}

	select(tokens.piece)
	const res = controller(tokens)
	change_board(res)
	clear(res.message)
})
