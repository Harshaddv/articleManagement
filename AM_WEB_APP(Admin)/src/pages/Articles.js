import React, { useState } from "react";
import NavBar from "../component/NavBar";

import $, { readyException } from "jquery";
import { _add_News_API, _fetch_news_data,_delete_news_data,_update_News_API } from "../services/articleService";
import { Link } from "react-router-dom";

import Modal from "react-modal";
import { toast } from "react-toastify";

function Articles(props) {

 
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height:'90vh'
    },
  };
  function toggledrawer(params) {
    $("#sidebar").toggleClass("active");
  }

  const [news_list,set_news_list]=useState([]);

  const _get_data = async () => {
    _fetch_news_data()
      .then((response) => {
        set_news_list(response?.data?.data);
      })
      .catch((error) => {
        // if(error.response.status===403){
        //   localStorage.clear();
        //   toast.error("Session Expired !");
        //   window.location="/";
        // }
      });
  };

  React.useEffect(() => {
    _get_data();
  }, []);


  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [updateModalIsOpen, setupdateModalIsOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [updateTitle, setUpdateTitle] = React.useState("");
  const [updateDescription, setUpdateDescription] = React.useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openUpdateModal(id, title, description) {
    setId(id)
    setUpdateTitle(title)
    setUpdateDescription(description);
    setupdateModalIsOpen(true);
  }

  function closeUpdateModal() {
    setupdateModalIsOpen(false);
  }


  const [title,set_title]=useState("");
  const [description,set_description]=useState("");
  const [image,set_image]=useState("");

  const add_news = async () => {
    if(title === ""){
      toast.error("Please enter title");
      return false;
    }
    if(description === ""){
      toast.error("Please enter description")
      return false;
    }
    if(image === ""){
      toast.error("Image is required");
      return false;
    }
    _add_News_API(title,description, image )
    .then(response=>{
      if(response.data.code===200){
          response.data.message
          toast.success(response?.data?.message);
          closeModal();
          _get_data();
      }
    })
    .catch(error=>{
      toast.error(error);
    })
  }

  const update_news = async () => {
    if(updateTitle === ""){
      toast.error("Please enter title");
      return false;
    }
    if(deupdateDescriptionscription === ""){
      toast.error("Please enter description")
      return false;
    }
    _update_News_API(id,updateTitle,updateDescription, image )
    .then(response=>{
      if(response.data.code===200){
          response.data.message
          toast.success(response?.data?.message);
          closeModal();
          _get_data();
      }
    })
    .catch(error=>{
      toast.error(error);
    })
  }

  const _delete_news_by_id = async (id) => {
    _delete_news_data(id)
    .then(response=>{
      if(response.data.code===200){
          response.data.message
          toast.success(response?.data?.message);
          _get_data();
      }
    })
    .catch(error=>{
      toast.error(error);
    })
  }

  return (
    <div className="wrapper">
      <NavBar />
      <div id="content">
        <div className="d-flex justify-content-around">
          <button
            className="row mr-5 mb-2"
            style={{ marginTop: "-15px" }}
            onClick={toggledrawer}
          >
            Toogle
          </button>
          <button
            className="row mr-5 mb-2"
            style={{ marginTop: "-15px" }}
            type="button"
            onClick={openModal}
          >
            Add
          </button>
        </div>
        <br></br>
<table style={{ width: "100%", tableLayout: "fixed"}}>
  <tr>
    <th>Id</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
  </tr>
  <br/>
  {news_list.map((item, index) => {
              return (
  <tr className="alert" role="alert" id={item._id}>
                  <td>{index + 1}</td>
                  <td><img style={{width: "90px"}} src={'http://localhost:5000'+item?.image} /></td>
                  <td>{item?.title}</td>
                  <td>
                   
                      {item?.description}
                   
                  </td>
                  <td style={{weidth : "10px"}}>{item?.createdOn}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      id={item?._id}
                      onClick={()=>openUpdateModal(item?._id ,item?.title,item?.description )}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      onClick={()=>_delete_news_by_id(item?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
 
</table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Add News</h2>
        <button onClick={closeModal}>close</button>
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-wrapper">
              <label htmlFor="">Title:</label>
              <div className="form-holder">
                <input type="text" className="form-control" value={title} onChange={e=>set_title(e.target.value)} />
              </div>
            </div>
          <div className="form-wrapper">
              <label htmlFor="">Description:</label>
              <div className="form-holder">
                <textarea type="text" className="form-control" value={description} onChange={e=>set_description(e.target.value)} />
              </div>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Image:</label>
              <div className="form-holder">
                <input type="file"  className="form-control" accept="image/*" onChange={e=>set_image(e.target.files[0])} />
              </div>
            </div>
          <div className="d-flex justify-content-around">
            <button onClick={()=>add_news()}>Add</button>
          </div>
        </form>
      </Modal>
      <Modal
                 isOpen={updateModalIsOpen}
                 onRequestClose={closeUpdateModal}
                 style={customStyles}
                 contentLabel="Example Modal"
                 id={id}
               >
                 <h2>Update News</h2>
                 <button onClick={closeUpdateModal}>close</button>
                 <form onSubmit={(e) => e.preventDefault()}>
                     <div className="form-wrapper">
                       <label htmlFor="">Title:</label>
                       <div className="form-holder">
                         <input type="text"  value={updateTitle} className="form-control"  onChange={e=>setUpdateTitle(e.target.value)} />
                         
                       </div>
                     </div>
                   <div className="form-wrapper">
                       <label htmlFor="">Description:</label>
                       <div className="form-holder">
                         <textarea type="text" value={updateDescription} className="form-control" onChange={e=>setUpdateDescription(e.target.value)} />
                       </div>
                     </div>
                     <div className="form-wrapper">
                       <label htmlFor="">Image:</label>
                       <div className="form-holder">
                         <input type="file"  className="form-control" accept="image/*" onChange={e=>set_image(e.target.files[0])} />
                       </div>
                     </div>
                   <div className="d-flex justify-content-around">
                     <button onClick={()=>update_news()}>Update</button>
                   </div>
                 </form>
               </Modal>
    </div>
  );
}

export default Articles;
