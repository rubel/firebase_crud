import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from './firebaseConfig';
import UserRow from './UserRow';
import { Field, Form, Formik } from 'formik';

function Users() {
    const [allUsers,setAllUsers] = useState([]);
    const [selectedUserId,setSelectedUserId] = useState("");
    const [addUserFormVisible,setAddUserFormVisible] = useState(false);
    const usersCollection = collection(db,"users");
    

    async function getAllUsers() {    
        const res = await getDocs(usersCollection);
        let receivedUsers = res.docs.map((u)=>({...u.data(),id:u.id}));
        setAllUsers(receivedUsers);
    }

    function getAddUserInitialValues(){
        if(selectedUserId===""){
            return {
                name:"",
                age:0
            }    
        }

        return getSelectedUserDetails();
    }
    function getSelectedUserDetails(){
        for (let i = 0; i < allUsers.length; i++) {
            if(allUsers[i].id === selectedUserId){
                return allUsers[i];
            }
        }
        return null;
    }
    function editUserDetailsPressed(id){
        setSelectedUserId(id);
        setAddUserFormVisible(true);
    }
    async function addNewUserToFirebase(values){
        console.log(values);

        if(selectedUserId === ""){
            await addDoc(usersCollection,values);
        }else{
            const userDoc = doc(db,"users",selectedUserId)
            await updateDoc(userDoc,values);
        }
        
        setAddUserFormVisible(false);
        getAllUsers();
    }
    async function removeSelectedUser(id){
        const userDoc = doc(db,"users",id)
        await deleteDoc(userDoc)
        getAllUsers();
    }
    useEffect(() => {
        getAllUsers();
    }, [])
      
  return (
    <div>
        <div className="fullShadow" style={addUserFormVisible ? { display: "flex" } : { display: "none" }}>
              <div className="addOrderFormBg">
                <div><h3>Add New User</h3></div>
                <Formik
                  initialValues={getAddUserInitialValues()}
                  enableReinitialize
                  onSubmit={(values) => {
                    addNewUserToFirebase(values);
                  }}>
                  <Form>
                    <div className="form-outline" style={{ padding: "10px 10px" }}>
                        <label>Name</label>
                        <Field
                            type="text"
                            name="name"
                            autoComplete="disabled"
                            label="Name"
                            className="form-control form-control-lg"
                        />
                    </div>

                    <div className="form-outline" style={{ padding: "10px 10px" }}>
                        <label>Age</label>
                        <Field
                            type="number"
                            name="age"
                            autoComplete="disabled"
                            label="Age"
                            className="form-control form-control-lg"
                        />
                    </div>

                    <div style={{ width: "40%", margin: "80px auto 0px" }}>
                          <button
                            style={{ width: "40%" }}
                            className="btn btn-secondary btn-lg"
                            type="button"
                            onClick={() => {
                              setAddUserFormVisible(false);
                            }}>
                            Cancel
                          </button>

                          <button
                            style={{ width: "40%", marginLeft: "20px" }}
                            className="btn btn-primary btn-lg"
                            type="submit">
                            Save
                          </button>
                        </div>
                    
                  </Form>
                </Formik>
            </div>
        </div>
        {/* .....end add form here...... */}
        <div>All Users</div>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col" colSpan={4} style={{textAlign:"right"}}>
                        <button className="btn btn-primary btn-lg" onClick={()=>{setAddUserFormVisible(true)}}>
                            + Add User
                        </button>
                    </th>
                </tr>
                <tr>
                    <th scope="col" style={{width: "20%"}}>id</th>
                    <th scope="col" style={{width: "40%"}}>Name</th>
                    <th scope="col" style={{width: "20%"}}>Age</th>
                    <th scope="col" style={{width: "20%"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allUsers.map((usr,index)=>(
                    <UserRow key={index} details={usr} removeUser={removeSelectedUser} editUserDetails={editUserDetailsPressed} />
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Users