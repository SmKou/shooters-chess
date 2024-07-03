const setup = () => {

    const board = [
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
    const pieces = {
        white: {
            king: { rank: 9, bridge: -1, captured: false },
            queen: { rank: 9, captured: false },
            rook: {
                queen: { rank: 5, bridge: -1, captured: false },
                king: { rank: 5, bridge: -1, captured: false }
            },
            knight: {
                queen: { rank: 3, bridge: -1, captured: false },
                king: { rank: 3, bridge: -1, captured: false }
            },
            bishop: {
                queen: { rank: 3, bridge: -1, captured: false },
                king: { rank: 3, bridge: -1, captured: false }
            },
            pawn: [
                { rank: 1, bridge: -1, captured: false, dir: 1 },
                { rank: 1, bridge: -1, captured: false, dir: 1 },
                { rank: 1, bridge: -1, captured: false, dir: 1 },
                { rank: 1, bridge: -1, captured: false, dir: 1 },
                { rank: 1, bridge: -1, captured: false, dir: 1 },
                { rank: 1, bridge: -1, captured: false, dir: 1 },
                { rank: 1, bridge: -1, captured: false, dir: 1 },
                { rank: 1, bridge: -1, captured: false, dir: 1 }
            ]
        },
        black: {
            king: { rank: 9, bridge: -1, captured: false },
            queen: { rank: 9, captured: false },
            rook: {
                queen: { rank: 5, bridge: -1, captured: false },
                king: { rank: 5, bridge: -1, captured: false }
            },
            knight: {
                queen: { rank: 3, bridge: -1, captured: false },
                king: { rank: 3, bridge: -1, captured: false }
            },
            bishop: {
                queen: { rank: 3, bridge: -1, captured: false },
                king: { rank: 3, bridge: -1, captured: false }
            },
            pawn: [
                { rank: 1, bridge: -1, captured: false, dir: -1 },
                { rank: 1, bridge: -1, captured: false, dir: -1 },
                { rank: 1, bridge: -1, captured: false, dir: -1 },
                { rank: 1, bridge: -1, captured: false, dir: -1 },
                { rank: 1, bridge: -1, captured: false, dir: -1 },
                { rank: 1, bridge: -1, captured: false, dir: -1 },
                { rank: 1, bridge: -1, captured: false, dir: -1 },
                { rank: 1, bridge: -1, captured: false, dir: -1 }
            ]
        }
    }

    return {
        player: false,  // true: white = players[1]
        board,
        pieces
    }
}

export default {
    setup
}
