const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const cohortsName = process.argv[2];
const limit = process.argv[3];
const values = [cohortsName, limit];
//console.log(values);

const query = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort 
FROM students 
JOIN cohorts ON cohorts.id = cohort_id 
WHERE cohorts.name = $1 
LIMIT $5;`;

pool.query(`
SELECT id, name, cohort_id
FROM students
LIMIT 5;
`)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.error('query error', err.stack));



pool.query(query, values)
  .then(res => {
  //console.log(res.rows);
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  }).catch(err => console.error('query error', err.stack));