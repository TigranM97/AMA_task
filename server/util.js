const csv = require("csv-parser");
const xml2js = require("xml2js");
const fs = require("fs");
const util = require("util");

function checkReferencesCSV(records) {
  const referenceCount = {};
  const nonUniqueReferences = [];

  records.forEach((record) => {
    const reference = record.Reference;
    if (!referenceCount[reference]) {
      referenceCount[reference] = 1;
    } else {
      referenceCount[reference]++;
      if (referenceCount[reference] === 2) {
        nonUniqueReferences.push(reference);
      }
    }
  });

  return records.filter((record) =>
    nonUniqueReferences.includes(record.Reference)
  );
}

function checkReferencesXML(records) {
  const referenceCount = {};
  const nonUniqueReferences = [];

  records.forEach((record) => {
    const reference = record["$"].reference;
    if (!referenceCount[reference]) {
      referenceCount[reference] = 1;
    } else {
      referenceCount[reference]++;
      if (referenceCount[reference] === 2) {
        nonUniqueReferences.push(reference);
      }
    }
  });

  return records.filter((record) => {
    const reference = record["$"].reference;
    return nonUniqueReferences.includes(reference);
  });
}

function checkEndBalanceCSV(records) {
  const failedRecords = [];
  records.forEach((record, i) => {
    if (
      (+record["Start Balance"] + +record.Mutation).toFixed(2) !=
      +record["End Balance"]
    ) {
      failedRecords.push[record];
    }
  });
  return failedRecords;
}

function checkEndBalanceXML(records) {
  const failedRecords = [];
  records.forEach((record, i) => {
    if (+record.startBalance + +record.mutation != +record.endBalance) {
      failedRecords.push[record];
    }
  });
  return failedRecords;
}

function checkExtention(miorimetype) {
  const arr = miorimetype.split("/");
  return arr[arr.length - 1];
}

function transformKeysToLowercase(records) {
  return records.map((record) => {
    const transformedRecord = {};
    Object.keys(record).forEach((key) => {
      transformedRecord[key.toLowerCase()] = record[key];
    });
    return transformedRecord;
  });
}

module.exports = {
  checkReferencesCSV,
  checkEndBalanceCSV,
  checkEndBalanceXML,
  checkReferencesXML,
  checkExtention,
  transformKeysToLowercase,
};
