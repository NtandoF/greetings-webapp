module.exports = function (pool) {
  
  var message = '';

  async function greetingFunction(name, language) {

    if (name && name !== '' && language !== undefined) {
      
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      let getUsers = await pool.query('select * from users where name =$1', [name]);

      if (getUsers.rowCount === 0) {
        let resp = await pool.query('insert into users (name, language, count) values ($1, $2 , $3)', [name, language, 0]);
        console.log(resp);
      }
      await pool.query('update users set count =(count +1), language=$2 where name =$1', [name, language])


      if (language === 'English') {
        return message = 'Hello, ' + name;
      }

      if (language === 'Afrikaans') {
        return message = 'Goeie Dag, ' + name;
      }

      if (language === 'IsiXhosa') {
        return message = 'Molo, ' + name;
      }
    }
    
  }



  async function greetCounter() {

    let nameCount = await pool.query('select * from users');
    let nameRows = nameCount.rows
    return nameRows.length
  }

  async function reset() {
    let remove = await pool.query('delete from users');
    return remove;
  }

  return {
    greetingFunction,
    greetCounter,
    reset
  }
}