export default (counts: {startIndex, idx, rowCount, rowLimit}) => {
    counts.idx += 1;
    counts.rowCount += 1;
    if (counts.rowCount > counts.rowLimit) {
        counts.idx = 1;
        counts.startIndex += 10;
        counts.rowCount = 0
    }
    return counts.startIndex + counts.idx;
}