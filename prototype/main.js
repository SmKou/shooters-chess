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
		white: {
			white_rook_queen: { rank: 5 },
			white_rook_king: { rank: 5 },
			white_knight_queen: { rank: 3 },
			white_knight_king: { rank: 3 },
			white_bishop_queen: { rank: 3 },
			white_bishop_king: { rank: 3 },
			white_queen: { rank: 9 },
			white_king: { rank: 9 },
			white_pawn_1: { rank: 1, dir: 1, first_move: true },
			white_pawn_2: { rank: 1, dir: 1, first_move: true },
			white_pawn_3: { rank: 1, dir: 1, first_move: true },
			white_pawn_4: { rank: 1, dir: 1, first_move: true },
			white_pawn_5: { rank: 1, dir: 1, first_move: true },
			white_pawn_6: { rank: 1, dir: 1, first_move: true },
			white_pawn_7: { rank: 1, dir: 1, first_move: true },
			white_pawn_8: { rank: 1, dir: 1, first_move: true }
		},
		black: {
			black_rook_queen: { rank: 5 },
			black_rook_king: { rank: 5 },
			black_knight_queen: { rank: 3 },
			black_knight_king: { rank: 3 },
			black_bishop_queen: { rank: 3 },
			black_bishop_king: { rank: 3 },
			black_queen: { rank: 9 },
			black_king: { rank: 9 },
			black_pawn_1: { rank: 1, dir: -1, first_move: true },
			black_pawn_2: { rank: 1, dir: -1, first_move: true },
			black_pawn_3: { rank: 1, dir: -1, first_move: true },
			black_pawn_4: { rank: 1, dir: -1, first_move: true },
			black_pawn_5: { rank: 1, dir: -1, first_move: true },
			black_pawn_6: { rank: 1, dir: -1, first_move: true },
			black_pawn_7: { rank: 1, dir: -1, first_move: true },
			black_pawn_8: { rank: 1, dir: -1, first_move: true }
		}
	}
}

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

const format_name = (name, pos) => {
	const piece = name.split('_')[1]
	return `${name[0].toUpperCase() + name.slice(1)} at ${pos.toUpperCase()}`
}

const pawn = {
	move: () => {},
	shoot: () => {}
}

const rook = {}

const bishop = {}

const knight = {}

const queen = {}

const king = {}

const move = (pre, post) => {}

const orbit = (pre, post) => {}

const shoot = () => {}

const bridge = (pre, post) => {

}

const unbridge = () => {}

const unload = () => {}


const board = document.getElementById('board')
const draw = () => {
	board.innerHTML = ''
	for (let i = 0; i < max_squ ** 2; ++i) {
		const div = document.createElement("div")
		const idx_val = Object.values(alpha).indexOf(i % max_squ)
		div.id = `${Object.keys(alpha)[idx_val]}${8 - Math.floor(i / max_squ)}`
		if (game.board[i]) {
			const piece = game.board[i].split('_')

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
		board.append(div)
	}
	document.getElementById('user-command').value = ''
	document.getElementById('confirmation').value = ''
}
draw()

const select = (pos) => {
	if (pos === game.pos) return;
	const pieces = game.pieces[sides[Number(game.player)]]

	if (game.pos) {
		document.getElementById(game.pos).style.background = 'transparent'

		const bridged = pieces[game.board[pos_idx(game.pos)]].bridged
		if (bridged)
			document.getElementById(bridged).style.background = 'transparent'

		game.pos = ''
	}

	document.getElementById(pos).style.background = 'lightgreen'

	const bridge = pieces[game.board[pos_idx(pos)]].bridged
	if (bridge)
		document.getElementById(bridge).style.background = 'lightgreen'
}

const command = []
document.getElementById('user-command').addEventListener('keydown', e => {
	if (e.key === 'Backspace') {
		if (command[command.length - 1].length > 1)
			command[command.length - 1] = command[command.length - 1].slice(0, -1)
		else
			command.pop()
		return;
	}
	if (!isNaN(e.key) || e.key === '-') {
		const v = command[command.length - 1]
		command[command.length - 1] = v + e.key
	}
	if (new RegExp(/[a-z]/i).test(e.key))
		command.push(e.key)

	if (e.key !== 'Enter') return;

	select(command[0].toUpperCase())
	if (command.length < 2) return;
})
