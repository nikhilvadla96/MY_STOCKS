import React, { useContext, useEffect, useState } from "react";
import t from "./translation.json";
import apiCall from "../CustomHooks/apiCall";
import { Url, Method } from "../Constants/ApiConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { MyContext } from "../MyContextProvider";

const Sale = () => {
  const [state, setState] = useState({
    riceQuantity: "",
    riceBagName: "",
  });
  const [bagsNames, setBagsName] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const { isAuthenticated, token, setIsAuthenticated ,handleRedirect } = useContext(MyContext);

  const riceQuantityOptions = [
    { value: "5", label: "5 Kgs" },
    { value: "10", label: "10 Kgs" },
    { value: "15", label: "15 Kgs" },
    { value: "20", label: "20 Kgs" },
    { value: "25", label: "25 Kgs" },
    { value: "26", label: "26 Kgs" },
  ];

  useEffect(() => {
    const fetchAllRiceBagNames = async () => {
      try {
        const response = await apiCall({
          url: Url.fetchAllRiceBagNames,
          method: Method.GET,
          state: state,
          token: token,
        },handleRedirect);
        if (response && response.data && response.data.resultList) {
          setBagsName(response.data.resultList);
        }
      } catch (error) {
        console.error("Error fetching rice bag names:", error);
      }
    };

    fetchAllRiceBagNames();
  }, [token]);

  const handleSave = async () => {
    try {
      const response = await apiCall({
        url: Url.saveBagsSoldOut,
        method: Method.POST,
        state: state,
        token: token,
      },handleRedirect);
      await toast.success(response.data.returnMsg);

      // Optionally fetch updated list or perform other state updates
      clearData();
    } catch (error) {
      console.error("Error saving bags sold out:", error);
      toast.error("Failed to save bags sold out");
    }
  };

  const clearData = () => {
    setState({
      riceQuantity: "",
      riceBagName: "",
    });
    setIsChecked(false);
  };

  const isCheckBox = () => {
    setIsChecked(!isChecked);
    setState((prevState) => ({
      ...prevState,
      riceQuantity: "",
    }));
  };

  const handleChange = (selectedOption) => {
    setState((prevState) => ({
      ...prevState,
      riceBagName: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleQuantityChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      riceQuantity: e.target.value,
    }));
  };

  return (
    <div>
      <header>
        <h1>{t["sale"]}</h1>
      </header>
      <div className="sale">
        <div className="form-page">
          <div className="form-group">
            <label className="col-md-6 label">{t["rice-bag-name"]} :</label>
            <Select
              className="select-field"
              onChange={handleChange}
              value={
                bagsNames.find((option) => option.value === state.riceBagName) ||
                null
              }
              options={bagsNames}
            />
          </div>
          <div className="form-group">
            <label className="col-md-6 label">{t["rice-quantity"]} :</label>
            {isChecked ? (
              <input
                type="number"
                value={state.riceQuantity}
                onChange={handleQuantityChange}
              />
            ) : (
              <Select
                className="select-field"
                onChange={(selectedOption) => {
                  setState((prevState) => ({
                    ...prevState,
                    riceQuantity: selectedOption ? selectedOption.value : "",
                  }));
                }}
                value={
                  riceQuantityOptions.find(
                    (option) => option.value === state.riceQuantity
                  ) || null
                }
                options={riceQuantityOptions}
              />
            )}
          </div>
          <div className="form-group">
            <label className="col-md-6 label">{t["loose-rice"]} :</label>
            <input type="checkbox" checked={isChecked} onChange={isCheckBox} />
          </div>
          <div className="col-span">
            <button className="update-btn" onClick={handleSave}>
              {t["sold"]}
            </button>
            &nbsp;
            <button className="delete-btn" onClick={clearData}>
              {t["clear"]}
            </button>
            &nbsp;
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sale;
