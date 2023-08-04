import { useEffect, useState } from 'react';
import './App.css';


function App() {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getData());
    const [itemEdit, setItemEdit] = useState("");
    const [toggleIcon, setToggleIcon] = useState(false);


    function getData() {
        const list = localStorage.getItem("mytask");
        if (list) {
            return JSON.parse(list);
        }
        else {
            return [];
        }
    }

    function addItems() {
        if (!inputData) {
            alert("Please enter valid data")
        }
        else if (inputData && toggleIcon) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === itemEdit) {
                        return { ...curElem, name: inputData };
                    }
                    return curElem;
                })

            )

        }
        else {
            const newData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newData])
            setInputData("");
        }
    }
    function deleteAll() {
        setItems([]);
    }
    function deleteItem(index) {
        const updatedList = items.filter((curElem)=> {
            return curElem.id !== index
        })
        setItems(updatedList)
    }


    function editItem(index) {
        const editedItem = items.find((curElem) => {
            return curElem.id === index
        })
        setInputData(editedItem.name);
        setItemEdit(index);
        setToggleIcon(true);


    }



      useEffect(() => {
        localStorage.setItem('mytask', JSON.stringify(items));

    },[items]);
    return (
        <>
        <div className='Screen'>
            <div className='App'>
                <div className='container'>
                    <div className='row'>

                        <div className='col-md-4 offset-md-4'>
                            <div className='heading'><h3> TO DO LIST </h3></div>
                            <div className='card'>
                            <div className='card-header'>  
                           
                           
                            <input type="text" placeholder='Task'  className="box" size="37" value={inputData} onChange={(e) => { setInputData(e.target.value) }} />
                             {

                                toggleIcon ?  <i className='fa fa-edit' onClick={addItems}> </i> :  <i className='fa fa-plus' onClick={addItems}> </i>
                             }</div>
                             <div className='card-body'>
                           
                                <ul>
                                    {
                                        items.map((curElem, index) => {
                                            return (
                                                <li key={index}> {curElem.name} <i className='fa fa-edit' onClick={() => editItem(curElem.id)}> </i> <i className='fa fa-trash bin' onClick={()=> deleteItem(curElem.id)}> </i> </li>

                                            )

                                        })
                                    }

                                </ul>
                                </div>
                             <div className='footer'> <button className='btn btn-danger' onClick={deleteAll}> deleteAll </button></div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>


        </>
    )
}

export default App;