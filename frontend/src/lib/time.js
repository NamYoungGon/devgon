function addLeadingZero(value) {
    return (value < 10 ? '0' : '') + value
}

module.exports = {
    addLeadingZero
}