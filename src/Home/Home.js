import React from 'react';
import Slider from 'react-slick';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { FaCartPlus,FaRemoveFormat } from 'react-icons/fa'
const Home = () => {
    //define state
    const [dataProd, setDataProd] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const [itemDetail, setItemDetail] = useState({});
    const [listCart, setListCart] = useState([]);
    //slick slider
    const Settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: true,
        slideToshow: 1,
        slidesToScroll: 1,
        speed: 500,
    }

    //fetch data api
    const baseUrl = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';
    useEffect(() => {
        axios.get(baseUrl).then((response) => {
            const newData = response.data.map((item) => {
                item['sl'] = 1;
                return item
            })
            setDataProd(newData)
            setDataSearch(newData)
          
        }).catch(error => {
            console.log('error api')
        })

    }, []);

    //init list Prod
    const renderListProd = () => {
        return dataSearch.map((item, index) => {
            return <div className='col-md-3 mb-4' key={index}>
                <div className="card text-white bg-success">
                    <img className="card-img-top" src={item.image} alt={item.name} />
                    <div className="card-body ">
                        <h4 className="card-title">{item.name}</h4>
                        <p className="card-text"><strong className='text-black'>{item.price}</strong>$</p>
                        {/* Button trigger modal */}
                        <button type="button" onClick={() => { handleDetail(item) }} className="btn w-100 mb-2" data-toggle="modal" data-target="#modelId">
                            View Detail
                        </button>
                        <button onClick={()=>{handleAddCart(item)}} className='btn w-100'>Add Cart</button>
                    </div>
                </div>
            </div>
        })
    }

    //handle view detail
    const handleDetail = (item) => {
        setItemDetail(item)
    }

    //handleAddCart
    const handleAddCart=(item)=>{
        //check xem item co trong listCart chua
        let index=[...listCart].findIndex(i=>i.id===item.id);
        if(index!=-1){
            setListCart([...listCart],listCart[index].sl+=1)
        }
        else{
            setListCart([...listCart,item])
        }
    }

    //tang giam item
    const handlePlusSub=(item,b)=>{
        //true= plus
        //false=subtract
        let index=[...listCart].findIndex(i=>i.id===item.id);
        if(b==true){
            setListCart([...listCart],listCart[index].sl+=1)
        }
        else{
            let newSl=listCart[index].sl;
            if(newSl>1){
                setListCart([...listCart],listCart[index].sl-=1)
            }
            else{
                setListCart([...listCart],listCart[index].sl=1)
            }
            
        }
    }

    //remove itemCart
    const handleRemoveItemCart=(item)=>{
        let index=[...listCart].findIndex(i=>i.id===item.id);
        if(index!==-1){
            let removeCart=[...listCart];
            removeCart.splice(index,1)
            setListCart(removeCart)
        }
        console.log('delete');
    }
    
    //render listCart
    const renderListCart=()=>{
        return listCart.map((item,index)=>{
            return <tr key={index}>
                <td>{item.id}</td>
                <td><img src={item.image} width='100px' alt={item.name}></img></td>
                <td>{item.name}</td>
                <td>{item.price}$</td>
                <td><button onClick={()=>{handlePlusSub(item,false)}}>-</button>{item.sl}<button onClick={()=>{handlePlusSub(item,true)}}>+</button></td>
                <td>{item.price*item.sl}$</td>
                <td><span className='text-danger' onClick={()=>{handleRemoveItemCart(item)}}>Delete</span></td>
            </tr>
        })
    }

    //search by name
    const handleSearch = (e) => {
        const { name, value } = e.target;

        const dataS = dataProd.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        setDataSearch(dataS);
    }

    //handle count cart
    const countCart=()=>{
        let sum=[...listCart].reduce((total,curValue)=>{
            return total+curValue.sl
        },0)
        return sum;
    }
  
    return (
        <div>
            {/* section mainvisual */}
            <section className='sec-mv'>
                <Slider {...Settings}>
                    <div>
                        <img src='../../images/slider01.png'></img>
                    </div>
                    <div>
                        <img src='../../images/slider02.png'></img>
                    </div>
                    <div>
                        <img src='../../images/slider03.png'></img>
                    </div>
                </Slider>
            </section>
            {/* section product */}
            <section className='sec-product'>
                <div className='container'>
                    <div className='d-flex justify-content-between mb-5'>
                        <h2>Vestable  <FaCartPlus onClick={() => { console.log('1') }} data-toggle="modal" data-target="#modelId1"></FaCartPlus><small className=''>({countCart()})</small></h2>
                        <div className='d-flex'>
                            <input onChange={(e) => { handleSearch(e) }} className='form-control' placeholder='search by name...' style={{ width: "200px" }}></input>
                        </div>
                    </div>
                    <div className='row'>
                        {renderListProd()}
                    </div>
                    {/* modal detail Item*/}
                    <div>
                        {/* Modal */}
                        <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className='mb-0 text-center'>Infomation</h3>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className='w-100'><img src={itemDetail.image} style={{ width: '100%' }}></img></div>
                                        <h5 className="modal-title text-success">{itemDetail.name}</h5>
                                        <strong>{itemDetail.price}$</strong>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* modal Cart Item */}                
                    {/* Modal */}
                    <div className="modal fade" id="modelId1" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <div className="modal-dialog" role="document" style={{maxWidth:'800px'}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">My Cart</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Thumbnail</th>
                                                <th>Name</th>                                              
                                                <th>Price</th>
                                                <th>quantity</th>
                                                <th>total money</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderListCart()}
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>


        </div>
    );
}

export default Home;
