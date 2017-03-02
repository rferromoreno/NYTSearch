const express = require('express');
const ser = require('./services/nyt.api.service');


ser.getNews("20160101", "20170101", "Argentina")
    .then((data) => {
        console.log(data);
    }, (error)=>{
        console.log(error);
    });