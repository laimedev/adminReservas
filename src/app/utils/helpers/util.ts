import * as XLSX from 'xlsx';

export class Util {

    static onlyIds(entity: any): number[] {
        let toMap = Array.isArray(entity) ? entity : []
        return toMap.map(e => e.id)
    }

    static download(data: any, fileName: string, sheet1 = 'Hoja1') {
        /*******************************\
         * Ctrl+C & Ctrl+V al extremo  *
         \******************************/

        /* generate worksheet */
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheet1);

        /* save to file */
        XLSX.writeFile(wb, `${fileName}.xlsx`);

    }
}
