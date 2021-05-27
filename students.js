const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// console.log(input);
const args = process.argv.slice(2);
const cohortName = args[0];
const limit = args[1];
const values = [`%${cohortName}%`, limit];

const queryString = `
SELECT students.id as student_id, cohorts.name AS cohort, students.name AS name
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  });
