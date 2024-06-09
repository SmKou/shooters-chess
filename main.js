import './style.css'

const graphics = ['shooters', 'trad', 'coins']
const background = ['plain', 'stars']

const colors = {
    background: '#E9D7BC',
    label: '#455C52',
    classic: {
        light_board: '#CDAA7D',
        dark_board: '#385546',
        valid_move: '#899878'
    },
    contrast: {
        light_board: '#E4E6C3',
        dark_board: '#222725',
        valid_move: '#899878'
    }
}

const a_code = 65
const alpha = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 }
const max_squ = 8
const edge = 36

const cvs = document.getElementById('game')
const ui = {
    ctx: '',
    squ: 0,
    offset: 0,
    graphics: 'coins',
    background: 'plain',
    anims: false,
    colors: 'classic',
    players: 1
}



document.getElementById('graphics-btn').addEventListener('click', () => {
    let idx = graphics.indexOf(ui.graphics) + 1
    if (idx === graphics.length)
        idx = 0
    ui.graphics = graphics[idx]
    const cvs = document.getElementById('graphics-btn-img')
    cvs.width = cvs.clientWidth
    cvs.height = cvs.clientHeight
    const ctx = document.getContext('2d')
    switch (ui.graphics) {
        case 'shooters':
        case 'trad':
        case 'coins':
        default:
    }
})


// Populate game info

const game_info = document.getElementById('game-info')

const game_info_option = (child) => {
    const option = document.createElement('option')
    const info = typeof child === 'string' ? child : child.className
    option.value = info
    option.append(document.createTextNode(info.className[0] + info.className.slice(1)))
    return option
}
game_info.append(game_info_option('Do not display info'))
document.getElementById('info').childNodes.forEach(child => game_info.append(game_info_option(child))

