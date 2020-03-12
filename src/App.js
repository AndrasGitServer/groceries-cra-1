import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [filter, setFilter] = useState('');
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [ingredients, setIngredients] = useState(
    [
      { name: 'flour' , amount: '2 cups' , needToGet: false},
      { name: 'tomatos', amount: '4 cups', needToGet: true}
    ]
  );

  const [filterred, setFilterred] = useState(
    [
      { name: 'flour' , amount: '2 cups' , needToGet: false},
      { name: 'tomatos', amount: '4 cups', needToGet: true}
    ]
  );


  const toggleNeedToGet = i => {
    console.log(i);
    let copy_of_ingredients = [...ingredients];
    copy_of_ingredients[i].needToGet = !copy_of_ingredients[i].needToGet;
    setIngredients(copy_of_ingredients);
    console.log(copy_of_ingredients);     // should be the same ! 
    console.log(ingredients);             // should be the same ! 
  }// *** toggleNeedToGet => function


  const addIngredient = event => {
    event.preventDefault();
    console.log('name=', event.target.name);
    console.log('value=', event.target.value);
    let newItem = { name, amount, needToGet: true};
    console.log( newItem );
    setIngredients( [...ingredients , newItem ]);     // Important added to both lists ! 
    setFilterred( [ ...filterred, newItem ]);         // Important added to both lists ! 
    setName('');
    setAmount('');

    // setTimeout( () => {                setTimeout() to implement the next statement that was below it ! 
    //   setFilterred( ingredients );
    //   alert("Hi");
    // }, 1000);

  }// ** addIngredient => function


  const filterThoseIngredients = event => {

    if (filter === 'All') {
      setFilter('ToGet') 
      let temp = ingredients.filter( item => item.needToGet);
      setFilterred( temp );
    }
    else {
      setFilter('All');
      setFilterred( ingredients );
    }
  }// ** filterThoseIngredients => function


  return (


    <div className="container">


      <div className="jumbotron">
        <h1>Grocery List</h1>
      </div>
      

      {/* *** Bootstrap row & col *** */}

      <div className="row">         
        <div className="col">

          {
            filter === 'All'  ?
            <>
              <button className="btn btn-info" disabled>All</button>
              <button className="btn btn-info" onClick={ filterThoseIngredients}>To get</button>
            </>
            :
            <>
              <button className="btn btn-info" onClick={ filterThoseIngredients}>All</button>
              <button className="btn btn-info" disabled>To Get</button>
            </>
          }

          <h1>{filter} Ingredients</h1>

          <table className="table table-striped"> 
            <tbody>
              <tr>
                <th>Need to Get:</th>
                <th>Name:</th>
                <th>Amount:</th>
              </tr>
              {
                filterred.map( (element, i) =>
                <tr key={i} className={ element.needToGet ? "" : "have"}>
                  <td> 
                    {
                      element.needToGet ? 
                      <button className="small btn btn-success" onClick={ event => toggleNeedToGet(i)}>Yes</button> : 
                      <button className="small btn btn-danger" onClick={ event => toggleNeedToGet(i)}>No</button>
                    } 
                  </td>
                  <td> {element.name} </td>
                  <td> {element.amount} </td>
                </tr>
                )
              }

             
            </tbody>
          </table>

        </div>


        <div className="col">

              <form onSubmit={ addIngredient }>
                
                <div className="form-group">
                  <label>Name</label>
                  <input 
                      type="text" 
                      className="form-control" 
                      onChange={ event => setName( event.target.value) }
                      value={name}
                  />
                </div>
                
                <div className="form-group">
                  <label>Amount</label>
                  <input 
                      type="text" 
                      className="form-control" 
                      onChange={ event => setAmount( event.target.value) }
                      value={amount}
                  />
                </div>


                <div >
                  <input type="submit" value="Add Ingredient" className="btn btn-primary" />
                </div>

              </form>

        </div>

      </div>

      {/* *** Bootstrap row & col *** */}


    </div>
  );
}// ** App component *************************************************


export default App;

