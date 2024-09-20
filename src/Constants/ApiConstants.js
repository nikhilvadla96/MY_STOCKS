import React from 'react'

export const Url = {
  login:"api/auth/login",
  verifyToken : "api/auth/verifyToken",
  updateUsersDetails : "api/auth/updateUsersDetails",
  getUserInfo : "api/auth/getUserInfo/",
  getAllRiceBags : 'api/ricebag/getAllRiceBags',
  saveRiceBag : 'api/ricebag/saveRiceBag',
  getRiceBagById :'api/ricebag/getRiceBagById/',
  updateRiceBag :'api/ricebag/updateRiceBag' ,
  deleteRiceBag :'api/ricebag/deleteRiceBag/',
  fetchAllRiceBagNames : 'api/ricebag/fetchAllRiceBagNames',
  saveBagsSoldOut :"api/sale/saveBagsSoldOut",
  getRiceBagsSoldOut :"api/sale/getRiceBagsSoldOut/",
  getStockReport : "api/ricebag/getStockReport",
  //downloadPDF : "api/pdf/download-pdf"
  downloadPDF :"api/pdf/api/download-pdf",
  getTotalRiceBagsPricePerDay :"api/sale/getTotalRiceBagsPricePerDay",
  getEachRiceBagsDetails : "api/sale/getEachRiceBagsDetails"
}

export const Method = {
  GET :'get',
  POST : 'post'
}