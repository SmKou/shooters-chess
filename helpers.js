const alpha = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 }

const pos_coord = (idx) => {
    if (idx < 0)
        return ''
        const idx_fr_vals = Object.values(alpha).indexOf(idx % max_squ)
        const x = Object.keys(alpha)[idx_fr_vals]
        const y = Math.floor(idx / max_squ) + 1
        return `${x}${y}`
}

const pos_idx = (coord) => {
    if (!coord)
        return -1
        return alpha[coord[0]] + 8 * (Number(coord[1]) - 1)
}

export default {
    pos_coord,
    pos_idx
}
