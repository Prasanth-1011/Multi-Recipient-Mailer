import Excel from "exceljs";

const parseData = async (file) => {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(await file.arrayBuffer());
    const worksheet = workbook.worksheets[0];
    const mails = [];

    worksheet.eachRow((row, rowNumber) => {
        let cellValue = row.getCell(1).value;
        if (cellValue && typeof cellValue === "object") {
            // For RichText Type
            if (cellValue.richText) {
                cellValue = cellValue.richText.map((r) => r.text).join("");
            } else if (cellValue.text) {
                cellValue = cellValue.text;
            } else {
                cellValue = String(cellValue);
            }
        }

        if (cellValue) {
            mails.push(cellValue.toString().trim());
        }
    });

    return mails;
};

export default parseData;
