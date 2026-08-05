import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportToExcel = async (fileName, sheetName, data) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(sheetName);

  if (data.length === 0) {
    return;
  }

  worksheet.columns = Object.keys(data[0]).map((key) => ({
    header: key.toUpperCase(),
    key: key,
    width: 25,
  }));

  data.forEach((item) => worksheet.addRow(item));

  worksheet.getRow(1).font = {
    bold: true,
  };

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(new Blob([buffer]), `${fileName}.xlsx`);
};
