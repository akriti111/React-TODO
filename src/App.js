import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);

    
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text:e.target.value,
        key:Date.now()
      }
    })
  }
  addItem(e){
    //prevent refresh
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if(newItem.text!==''){
      //adding newItem to list
      //first parameter : unpack all the items in the list and converts them into individual items
      //second parameter is added to the list
      //destructing Assignment
      const newItems = [...this.state.items,newItem]; 
      //updating items 
      //setting currentItem to initial empty values     
      this.setState({
        items:newItems,
        currentItem:{
          text:'',
          key:''
        }
      })
    }
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(item => item.key!==key);
    this.setState({
      items: filteredItems
    })
  }
  setUpdate(text,key){
    const items = this.state.items;
    //iterate via each item to check
    items.map( item=>{
      if(item.key === key){
        item.text = text;
      }
    })
    this.setState({
      items: items
    })
  }
  render(){
    return(
        <div className="App">
          <header>
          <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter a Task .." value={this.state.currentItem.text} onChange={this.handleInput}/>
          <button type="submit">Add</button>
            </form>
          </header>
          <ListItems items = {this.state.items} deleteItem = {this.deleteItem} setUpdate = {this.setUpdate}></ListItems>
        </div>
    );
  }
}
export default App;
