const alpha = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 }
const max_squ = 8
const board = document.getElementById("board")


export default () => {
    for (let i = 0  i < max_squ ** 2  ++i) {
        const div = document.createElement("div")
        const idx_val = Object.values(alpha).indexOf(i % max_squ)
        div.id = `${Object.keys(alpha)[idx_val]}${Math.floor(i / max_squ) + 1}`
        div.style.border = "1px solid black"
        board.append(div)
    }
}
