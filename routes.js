/*const express = require('express');
const router = express.Router();

// Middleware to parse JSON data
router.use(express.json());

// Get all reports
router.get('/reports', (req, res) => {
  const pool = req.app.locals.pool; // Access the pool variable from the app locals
  pool.query('SELECT * FROM reportList', (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      res.json(results);
    }
  });
});

// Get a single report by ID
router.get('/reports/:id', (req, res) => {
  const pool = req.app.locals.pool; // Access the pool variable from the app locals
  const reportId = req.params.id;
  pool.query('SELECT * FROM reportList WHERE id = ?', [reportId], (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Report not found' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

// POST: Create a new report
router.post('/reports', (req, res) => {
    console.log(req.body)
    const pool = req.app.locals.pool;
  
    const fields = [
        'term', 'name', 'class', 'DOB', 'POB', 'enrollment', 'master', 'situation', 'test1', 'test2',
        'eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1', 'acc1', 'citi1', 'rel1', 'food1',
        'chem1', 'bio1', 'phy1', 'comp1', 'sport1', 'logic1', 'hb1',
        'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2', 'acc2', 'citi2', 'rel2', 'food2',
        'chem2', 'bio2', 'phy2', 'comp2', 'sport2', 'logic2', 'hb2',
        'average', 'ta', 'na', 'punishment', 'DC', 'DMC', 'AMC', 'paid', 'owing', 'summonDate', 'summonTime', 'note'
      ];


// Comma-separated list of field names in the INSERT query
const fieldsList = fields.join(', ');
// Array of placeholders for the field values in the VALUES part of the INSERT query
const valuePlaceholders = fields.map(() => '?').join(', ');

const query = `INSERT INTO reportList (${fieldsList}) VALUES (${valuePlaceholders})`;

// Replace this line with the actual values you want to insert into the database
const reportData = fields.map((field) => {
    const value = req.body[field];
    // Convert empty fields to 0
    return value === "" ? 0 : value;
  });
  
  // console.log("QUERY" +query)
  // console.log("REPORTDATA" +reportData);

  pool.query(query, reportData, (err, results) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'Failed to insert data into the database' });
    } else {
      res.json({ message: 'Report created successfully', id: results.insertId });
    }
  });
});

// PUT: Update an existing report by ID
router.put('/reports/:id', (req, res) => {
    const pool = req.app.locals.pool;
    const reportId = req.params.id;
  
    const fields = [
      'term', 'name', 'class', 'DOB', 'POB', 'enrollment', 'master', 'situation', 'test1', 'test2',
      'eng1', 'fre1', 'math1', 'hist1', 'lit1', 'geo1', 'econs1', 'comm1', 'acc1', 'citi1', 'rel1', 'food1',
      'chem1', 'bio1', 'phy1', 'comp1', 'sport1', 'logic1', 'hb1',
      'eng2', 'fre2', 'math2', 'hist2', 'lit2', 'geo2', 'econs2', 'comm2', 'acc2', 'citi2', 'rel2', 'food2',
      'chem2', 'bio2', 'phy2', 'comp2', 'sport2', 'logic2', 'hb2',
      'average', 'ta', 'na', 'punishment', 'DC', 'DMC', 'AMC', 'paid', 'owing', 'summonDate', 'summonTime', 'note'
    ];
  
    // Generate the SET clause for the SQL query
    const setClause = fields.map(field => `${field} = ?`).join(', ');
  
    // Create an array of values to be updated in the database
    const updateValues = fields.map(field => {
      const value = req.body[field];
      // Convert empty fields to 0
      return value === "" ? 0 : value;
    });
  
    // Add the reportId to the end of the updateValues array
    updateValues.push(reportId);
  
    // SQL query to update the report
    const query = `UPDATE reportList SET ${setClause} WHERE id = ?`;
  
    pool.query(query, updateValues, (err, results) => {
      if (err) {
        console.error('Error updating data in the database:', err);
        res.status(500).json({ error: 'Failed to update data in the database' });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Report not found' });
        } else {
          res.json({ message: 'Report updated successfully' });
        }
      }
    });
  });
  

  // DELETE: Delete a report by ID
router.delete('/reports/:id', (req, res) => {
    const pool = req.app.locals.pool;
    const reportId = req.params.id;
  
    pool.query('DELETE FROM reportList WHERE id = ?', [reportId], (err, results) => {
      if (err) {
        console.error('Error deleting data from the database:', err);
        res.status(500).json({ error: 'Failed to delete data from the database' });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Report not found' });
        } else {
          res.json({ message: 'Report deleted successfully' });
        }
      }
    });
  });

// Add more API endpoints for other CRUD operations as needed

module.exports = router;
*/




const express = require('express');
const router = express.Router();
const Report = require('./models/report'); // Import your Mongoose model for the report collection
const mongoose = require('mongoose');


// Middleware to parse JSON data
router.use(express.json());

// Route to check MongoDB connection status
router.get('/status', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send('Connected to MongoDB!');
  } else {
    res.send('Not connected to MongoDB!');
  }
});

// Get all reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find({});
    res.json(reports);
    
  } catch (err) {
    console.error('Error fetching data from the database:', err);
    res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
});

// Get a single report by ID
router.get('/reports/:id', async (req, res) => {
  const reportId = req.params.id;
  try {
    const report = await Report.findById(reportId);
    if (!report) {
      res.status(404).json({ message: 'Report not found' });
    } else {
      res.json(report);
    }
  } catch (err) {
    console.error('Error fetching data from the database:', err);
    res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
});

// POST: Create a new report
router.post('/reports', async (req, res) => {
    
  try {
    const reportData = req.body;
    const newReport = await Report.create(reportData);
    res.json({ message: 'Report created successfully', id: newReport._id });
  } catch (err) {
    console.error('Error inserting data into the database:', err);
    res.status(500).json({ error: 'Failed to insert data into the database' });
  }
});

// PUT: Update an existing report by ID
router.put('/reports/:id', async (req, res) => {
  // req.body._id = req.body.id.toString();
  const reportId = req.params.id;
  try {
    const updatedReport = await Report.findByIdAndUpdate(reportId, req.body, { new: true });
    if (!updatedReport) {
      res.status(404).json({ message: 'Report not found' });
    } else {
      res.json({ message: 'Report updated successfully' });
    }
  } catch (err) {
    console.error('Error updating data in the database:', err);
    res.status(500).json({ error: 'Failed to update data in the database' });
  }
});

// DELETE: Delete a report by ID
router.delete('/reports/:id', async (req, res) => {

  const reportId = req.params.id
  // console.log("Report ID: "+ reportId)
  try {
    const deletedReport = await Report.findByIdAndDelete(reportId);
    if (!deletedReport) {
      res.status(404).json({ message: 'Report not found' });
    } else {
      res.json({ message: 'Report deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting data from the database with id:', reportId, ":",err);
    res.status(500).json({ error: 'Failed to delete data from the database' });
  }
});

// Add more API endpoints for other CRUD operations as needed

module.exports = router;
