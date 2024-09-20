import React, { useContext, useEffect, useState } from "react";
import apiCall from "../CustomHooks/apiCall";
import { Url, Method } from "../Constants/ApiConstants";
import t from "./translation.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../MyContextProvider";

export const AddNewBag = () => {
  const [state, setState] = useState({});
  const [riceBagsList, setRiceBagsList] = useState();

  const [totalPrice, setTotalPrice] = useState([]);
  const {isAuthenticated , token ,handleRedirect} = useContext(MyContext)

  useEffect(() => {
    const fetchRiceBags = async () => {
      const response = await apiCall({
        url: Url.getAllRiceBags,
        method: Method.GET,
        state: state,
        token , token
      },handleRedirect);
      setRiceBagsList(response.data.resultList);
    };
    fetchRiceBags();
  }, [token]);

  const handleSave = async (event) => {
    let response = "";
    try {
      if (state.riceBagId) {
        response = await apiCall({
          url: Url.updateRiceBag,
          method: Method.POST,
          state: state,
          token: token
        },handleRedirect);
      } else {
        response = await apiCall({
          url: Url.saveRiceBag,
          method: Method.POST,
          state: state,
          token: token
        },handleRedirect);
      }
  
      await toast.success(response.data.returnMsg);
      
      // Fetch updated list of rice bags
      const updatedRiceBagsResponse = await apiCall({
        url: Url.getAllRiceBags,
        method: Method.GET,
        state: state,
        token: token
      },handleRedirect);
      setRiceBagsList(updatedRiceBagsResponse.data.resultList);
      
      // Clear the state after saving
      clearData();
      setState({})
    } catch (error) {
      // Handle error here
      console.error("Error saving rice bag:", error);
    }
  };
  

  const clearData = () => {
    setState({});
  };

  const updateBag = async (riceBagId) => {
    try {
      const response = await apiCall({
        url: Url.getRiceBagById + riceBagId,
        method: Method.GET,
        state: state,
        token: token
      },handleRedirect);
  
      setState(response.data.results);
    } catch (error) {
      // Handle error here
      console.error("Error fetching rice bag:", error);
    }
  };
  

  const confirmDelete = async (riceBagId) => {
    try {
      const response = await apiCall({
        url: Url.deleteRiceBag + riceBagId,
        method: Method.POST,
        state: {},
        token: token
      },handleRedirect);
      
      await toast.success(response.data.returnMsg);
      
      // Fetch updated list of rice bags
      const updatedRiceBagsResponse = await apiCall({
        url: Url.getAllRiceBags,
        method: Method.GET,
        state: state,
        token: token
      },handleRedirect);
      setRiceBagsList(updatedRiceBagsResponse.data.resultList);
    } catch (error) {
      // Handle error here
      console.error("Error deleting rice bag:", error);
    }
  };
  

  const downloadPDF = async () => {

    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text("Hello World!", 10, 10);

    // Example of adding a table using jspdf-autotable plugin
    doc.autoTable({
      startY: 20,
      head: [
        [t["sl-No"], t["rice-bag-code"], t["rice-bag-name"], t["price-per-kg"]],
      ],
      body: riceBagsList.map((eachBag, index) => [
        index + 1,
        eachBag.riceBagCode,
        eachBag.riceBagName,
        eachBag.pricePerKg,
      ]),
    });

    // Save the PDF file
    doc.save("BagsReport.pdf");
  };

  return (
    <div>
      <div className="">
      <header>
        <h1>{t['add-new-bag']}</h1>
    </header>
        <div className="sale">
          <div className="form-page">
            <div className="form-group">
              <label className="col-md-6 label">{t["rice-bag-name"]} : </label>
              <input
               className="select-field"
               value={state.riceBagName || ""}
                onChange={(e) =>
                  setState({ ...state, riceBagName: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{t["rice-bag-code"]} : </label>
              <input
               className="select-field"
                value={state.riceBagCode || ''}
                onChange={(e) =>
                  setState({ ...state, riceBagCode: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{t["ourPrice-per-kg"]} : </label>
              <input
               className="select-field"
                type="number"
                value={state.ourPricePerKg || ''}
                onChange={(e) =>
                  setState({ ...state, ourPricePerKg: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{t["price-per-kg"]} : </label>
              <input
                type="number"
                 className="select-field"
                value={state.pricePerKg || ''}
                onChange={(e) =>
                  setState({ ...state, pricePerKg: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label className="col-md-6 label">{t["available-stock"]} : </label>
              <input
               className="select-field"
                type="number"
                value={state.stockAvailable || ''}
                onChange={(e) =>
                  setState({ ...state, stockAvailable: e.target.value })
                }
              ></input>
            </div>
            <div className="col-span">
              <button className="update-btn" onClick={handleSave}>
                {state && state.riceBagId ? t["update"] : t["save"]}
              </button>
              &nbsp;
              <button className="delete-btn" onClick={clearData}>
                {t["cancel"]}
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

      <table className="rice-table">
        <thead>
          <tr>
            <th>{t["sl-No"]}</th>
            <th>{t["rice-bag-code"]}</th>
            <th>{t["rice-bag-name"]}</th>
            <th>{t["price-per-kg"]}</th>
            <th>{t["update"]}</th>
            <th>{t["delete"]}</th>
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
                <td>{eachList.pricePerKg}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => {
                      updateBag(eachList.riceBagId);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      confirmDelete(eachList.riceBagId);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {riceBagsList && riceBagsList.length === 0 && (
        <div className="text-center">No Records Found</div>
      )}
    </div>
  );
};
