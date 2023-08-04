import React from "react";

import * as FileSaver from "file-saver";

import * as XLSX from "xlsx";

export const ExportCSV = ({ csvData }) => {
  /**
   * @description - for file name
   */
  const fileName = `data ${new Date()}`;

  /**
   * @description - for file type
   */
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  /**
   * @description - for file extension
   */
  const fileExtension = ".xlsx";

  /**
   * @description - for file excel file export
   */
  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="export-button"
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      Export
    </button>
  );
};
