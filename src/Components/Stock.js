import React, { useEffect, useState } from "react";
import t from "./translation.json";
import apiCall from "../CustomHooks/apiCall";
import { Method, Url } from "../Constants/ApiConstants";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const Stock = () => {
  const [state, setState] = useState({});
  const [bagsNames, setBagsName] = useState();
  const [riceBagsList, setRiceBagsList] = useState();
  const [grandTotal, setGrandTotal] = useState({});
  const [formattedDate , setFormattedDate] = useState('')

  useEffect(() => {
    const fetchAllRiceBagNames = async () => {
      const response = await apiCall({
        url: Url.fetchAllRiceBagNames,
        method: Method.GET,
        state: state,
      });
      if (response && response.data && response.data.resultList) {
        const resultList = response.data.resultList;
        setBagsName(resultList);
      }
    };

    fetchAllRiceBagNames();

    const currentDate = new Date();

  // Format the date as needed (example: YYYY-MM-DD)
  setFormattedDate(currentDate.toISOString().slice(0, 10));

    handleSerach();
  }, []);

  const handleSerach = async () => {
    const response = await apiCall({
      url: Url.getStockReport,
      method: Method.GET,
      state: state,
    });
    setRiceBagsList(response.data.resultList);
    setGrandTotal(response.data.results);
    console.log(response);
  };

  const clearData = () => {
    setState({});
  };

  const downloadPDF = async () => {
    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Set font styles (optional)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');

    // Add content to the PDF
    doc.text("My Stock Report", 65, 10);

    // Example of adding a table using jspdf-autotable plugin
    doc.autoTable({
      startY: 20,
      head: [
        [
          t["sl-No"],
          t["rice-bag-code"],
          t["rice-bag-name"],
          t["available-stock"],
         "Total Price (Available Stock)",
        "Total Price (Our Price)",
        "Total Amount Profit"
        ],
      ],
      body: riceBagsList.map((eachBag, index) => [
        index + 1,
        eachBag.riceBagCode,
        eachBag.riceBagName,
        eachBag.stockAvailable,
        (eachBag.pricePerKg * eachBag.stockAvailable).toLocaleString(),
          (eachBag.ourPricePerKg * eachBag.stockAvailable).toLocaleString(),
          (eachBag.pricePerKg * eachBag.stockAvailable -eachBag.ourPricePerKg * eachBag.stockAvailable).toLocaleString(),
      ]),
      // Add styles to table headers
    headStyles: {
      cellPadding: 5,
      fillColor: [41, 128, 185], // Header background color
      textColor: [255], // Header text color
      fontStyle: 'bold' // Bold font style for header
    },
    // Add styles to table cells
    styles: {
      cellPadding: 5,
      fontSize: 10,
      fontStyle: 'normal',
      textColor: [12, 50, 100] // Cell text color
    },
    });

    // Save the PDF file
    doc.save(`StocksReport(${formattedDate}).pdf`);
  };

  return (
    <div>
      <div className="row">
        <div className="sale">
          <div className="form-page">
            <div className="col-span">
              <label>{t["rice-bag-name"]} : </label>
              <select
                className="select-field"
                onChange={(e) =>
                  setState({ ...state, riceBagName: e.target.value })
                }
                value={state.riceBagName || ""} // Add this line to control the select value
              >
                <option value="">{t["select"]}</option>
                {bagsNames &&
                  bagsNames.map((eachbag, index) => (
                    <option key={index} value={eachbag.value}>
                      {eachbag.label}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-span">
              <label>{t["date"]} : </label>
              <input
                type="date"
                value={state.data || ""}
                onChange={(e) => setState({ ...state, date: e.target.value })}
              />
            </div>

            <div className="col-span">
              <button className="update-btn" onClick={handleSerach}>
                {t["search"]}
              </button>
              &nbsp;
              <button className="delete-btn" onClick={clearData}>
                {t["clear"]}
              </button>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
      <div className="pdfDiv">
        <FontAwesomeIcon
          icon={faFilePdf} // Regular PDF icon
          style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}
          onClick={downloadPDF}
        />
      </div>
      <div className="row">
      <table className="rice-table">
        <thead>
          <tr>
            <th>{t["sl-No"]}</th>
            <th>{t["rice-bag-code"]}</th>
            <th>{t["rice-bag-name"]}</th>
            <th>{t["available-stock"]}</th>
            <th>{t["tot-price-avbStock"]}</th>
            <th>{t["tot-price-ofOur-avbStock"]}</th>
            <th>{t["tot-amt-profit"]}</th>
          </tr>
        </thead>
        <tbody>
          {riceBagsList &&
            riceBagsList.length > 0 &&
            riceBagsList.map((eachList, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{eachList.riceBagCode}</td>
                <td>{eachList.riceBagName}</td>
                <td>{eachList.stockAvailable}</td>
                <td>
                  {(
                    eachList.pricePerKg * eachList.stockAvailable
                  ).toLocaleString()}
                </td>
                <td>
                  {(
                    eachList.ourPricePerKg * eachList.stockAvailable
                  ).toLocaleString()}
                </td>
                <td style={{ color: "green" }}>
                  {(
                    eachList.pricePerKg * eachList.stockAvailable -
                    eachList.ourPricePerKg * eachList.stockAvailable
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
      {riceBagsList && riceBagsList.length === 0 && (
        <div className="text-center">No Records Found</div>
      )}
    </div>
  );
};

export default Stock;
