import test from "./test"
import "./style.css"

const alpha = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 }

const game = {
    player: true,
    side: "white",
    maneuvers: [],
}

/* --------------------------------------------- MANEUVERS
 * Pawn: _
 * Rook: R
 * Knight: N
 * Bishop: B
 * Queen: Q
 * King: K
 *
 * Positions: a-h1-8
 * Maneuver:
 * = [piece][action][pos][action][pos]
 * = [piece][action][action][pos]
 *
 * Move: [piece]m[pos]
 * Shoot: [piece]x[pos]-[rank]
 * Unload: [piece]u[pos]
 * Bridge|Capture: [piece]r[pos]
 * Unbridge: [piece]u
 *
 * move -> [shoot|unload|bridge-capture|unbridge]
 * shoot -> [move|unload|bridge-capture|unbridge]
 * unload
 * bridge-capture -> [move|shoot|unload|unbridge]
 * unbridge -> [move|shoot|unload|bridge-capture]
 *
 * Chess Notation eg. "Pawn to b6" : b6, or "Knight to a6" : Na6
 * when the computer goes back a step, how does it know what position a piece came from?
 */

game.board = [
  // first row fr. bottom
    "white-rook-queen",
    "white-knight-queen",
    "white-bishop-queen",
    "white-queen",
    "white-king",
    "white-bishop-king",
    "white-knight-king",
    "white-rook-king",
    // second row
    "white-pawn-0",
    "white-pawn-1",
    "white-pawn-2",
    "white-pawn-3",
    "white-pawn-4",
    "white-pawn-5",
    "white-pawn-6",
    "white-pawn-7",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    // seventh row fr. bottom
    "black-pawn-0",
    "black-pawn-1",
    "black-pawn-2",
    "black-pawn-3",
    "black-pawn-4",
    "black-pawn-5",
    "black-pawn-6",
    "black-pawn-7",
    // eighth row
    "black-rook-queen",
    "black-knight-queen",
    "black-bishop-queen",
    "black-queen",
    "black-king",
    "black-bishop-king",
    "black-knight-king",
    "black-rook-king",
]

game.pieces = {
    white: {
        rook_queen: { rank: 5 },
        rook_king: { rank: 5 },
        knight_queen: { rank: 3 },
        knight_king: { rank: 3 },
        bishop_queen: { rank: 3 },
        bishop_king: { rank: 3 },
        queen: { rank: 9 },
        king: { rank: 9 },
        pawns: [
            { rank: 1, dir: 1, first_move: true },
            { rank: 1, dir: 1, first_move: true },
            { rank: 1, dir: 1, first_move: true },
            { rank: 1, dir: 1, first_move: true },
            { rank: 1, dir: 1, first_move: true },
            { rank: 1, dir: 1, first_move: true },
            { rank: 1, dir: 1, first_move: true },
            { rank: 1, dir: 1, first_move: true },
        ],
    },
    black: {
        rook_queen: { rank: 5 },
        rook_king: { rank: 5 },
        knight_queen: { rank: 3 },
        knight_king: { rank: 3 },
        bishop_queen: { rank: 3 },
        bishop_king: { rank: 3 },
        queen: { rank: 9 },
        king: { rank: 9 },
        pawns: [
            { rank: 1, dir: -1, first_move: true },
            { rank: 1, dir: -1, first_move: true },
            { rank: 1, dir: -1, first_move: true },
            { rank: 1, dir: -1, first_move: true },
            { rank: 1, dir: -1, first_move: true },
            { rank: 1, dir: -1, first_move: true },
            { rank: 1, dir: -1, first_move: true },
            { rank: 1, dir: -1, first_move: true },
          ],
    },
}

/*
 * Move: 1 squ forward to unoccupied space (2 if first move)
 * - En passant: enemy pawn moves 2 squ forward, nearby pawn move forward diagonal past enemy = capture
 * - Promote: pawn reaches last enemy line => rook, knight, bishop, queen | king (if none other on board)
 * Shoot: forward diagonal
 * - move in series: shoot and take movement
 */
const pawn = () => {}

/*
 * Move:
 */
const rook = () => {}

const knight = () => {}

const bishop = () => {}

const queen = () => {}

const king = () => {}

test()
