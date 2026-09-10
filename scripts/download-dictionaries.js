#!/usr/bin/env node
/* Reproducibly downloads the free Kaikki/Wiktionary JSONL dictionaries.
   The downloaded files are reference data and are intentionally git-ignored. */
const fs=require('fs');const path=require('path');const {pipeline}=require('stream/promises');const https=require('https');
const root=path.resolve(__dirname,'..'),output=path.join(root,'dictionaries');fs.mkdirSync(output,{recursive:true});
const sources={en:'https://kaikki.org/dictionary/English/kaikki.org-dictionary-English.jsonl.gz',de:'https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl.gz'};
function download(url,destination){return new Promise((resolve,reject)=>{https.get(url,response=>{if(response.statusCode>=300&&response.statusCode<400&&response.headers.location)return download(response.headers.location,destination).then(resolve,reject);if(response.statusCode!==200)return reject(new Error(url+' returned '+response.statusCode));pipeline(response,fs.createWriteStream(destination)).then(resolve,reject)}).on('error',reject)})}
(async()=>{for(const [language,url] of Object.entries(sources)){const destination=path.join(output,language+'.jsonl.gz');console.log('Downloading',language);await download(url,destination)}console.log('Dictionaries saved in',output)})().catch(error=>{console.error(error);process.exitCode=1});
