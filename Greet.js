module.exports = function (pool){

  // var person = '';
  // var greetingDone = 0;
   var message = '';
  // var mapNames = {};


  // function insertGreeting(){
  //   return greetingDone;
  // }

  async function greetingFunction(name, language){
  if (name !== '' && language !== undefined){

  let getUsers = await pool.query('select * from users where name =$1', [name]);
 

    if(getUsers.rowCount === 0){
      let resp = await pool.query('insert into users (name, count) values ($1, $2)', [name, 0]);
      console.log(resp);
    }
      await pool.query('update users set count =(count +1) where name =$1', [name])

  
    if (language === 'English') {
    return message = 'Hello, ' + name;
    }

    if(language === 'Afrikaans'){
    return message = 'Goeie Dag, ' + name;
    }
    
    if (language === 'IsiXhosa') {
    return message = 'Molo, ' + name;
    }
  }
 }



  async function greetCounter(){

    let nameCount = await pool.query('select * from users');
    let nameRows = nameCount.rows
    return nameRows.length
  }

  // function nameMap(){
  //   return mapNames
  // }

  async function reset(){
  let remove = await pool.query('delete from users');
  return remove;
  }

  return {
    greetingFunction,
    greetCounter,
    // nameMap,
     reset,
    // insertGreeting
  }
}