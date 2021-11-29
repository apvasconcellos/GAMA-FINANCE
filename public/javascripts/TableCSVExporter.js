class TableCSVExporter {
    constructor(table, includeHeaders = true){
        this.table = table;
        this.rows = Array.from(table.querySelectorAll("tr"))
    }
    convertToCSV () {
        const lines = [];
        const numCols = this._findLongestRowLength();
        for (const row of this.rows){
            let line = "";
            for (let i = 0; i < numCols; i++) {
                if (row.children[i] !== undefined){
                    line += TableCSVExporter.parseCell(row.children[i]);
                }
                line += (i !== (numCols - 1)) ? "," : "";
            }
            lines.push(line);
        }
        return lines.join("\n");
    }
    _findLongestRowLength() {
        return this.rows.reduce((num, row) => row.childElementCount > num ? row.childElementCount : num, 0);
    }
    static parseCell (tableCell) {
       let parsedValue = tableCell.textContent;
       parsedValue = parsedValue.replace(/"/g, `"`);
       parsedValue = /[", \n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;
       return parsedValue;
    }
}