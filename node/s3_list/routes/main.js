const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const env = require('dotenv').config({ path: '../../.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AWS = require('aws-sdk');
const ID = process.env.ID;
const SECRET = process.env.SECRET;
const BUCKET_NAME = 'kibwa-15';
const MYREGION = 'ap-southeast-1';
const s3 = new AWS.S3({ accessKeyId: ID, secretAccessKey: SECRET, region: MYREGION });

app.get('/list', (req, res) => {
    const params = {
        Bucket: BUCKET_NAME,
        Delimiter: '/',
        Prefix: 'uploadedFiles/',
    };
    s3.listObjects(params, function (err, data) {
        if (err) throw err;
        res.json(data.Contents);
    });
});

module.exports = app;
