const { pool } = require('../connectors/db');
const revokedUncreditedLicences = require('../queries/revokedUncreditedLicences');
const { logger } = require('../../logger');
const { generateCsv } = require('../helpers/write-csv-to-s3');
const { getFinancialYear } = require('../helpers/financial-year');
const handler = async () => {
  try {
    const financialYear = getFinancialYear(new Date());

    // Run query
    const res = await pool.query(revokedUncreditedLicences, [financialYear]);

    // Write results to S3
    const filename = 'revokedUncreditedLicences.csv';
    generateCsv(filename, res.rows, res.fields);
  } catch (e) {
    logger.error(e);
  }
};

exports.handler = handler;
