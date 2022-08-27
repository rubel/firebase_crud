import React from 'react'

function UserRow({details,editUserDetails,removeUser}) {
    function editUserPressed(){
        editUserDetails(details.id);
    }
    function removeUserPressed(){
        removeUser(details.id);
    }
    return (
        <tr>
            <td scope="row">{details.id}</td>
            <td>{details.name}</td>
            <td>{details.age}</td>
            <td>
            <button className="btn btn-primary btn-lg" onClick={()=>{editUserPressed()}}>
                Edit
            </button>
            <button className="btn btn-danger btn-lg" style={{marginLeft:"10px"}} onClick={()=>{removeUserPressed()}}>
                Remove
            </button>
            </td>
        </tr>
    )
}

export default UserRow