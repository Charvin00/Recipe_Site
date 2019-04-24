import React from 'react';
import User from './User';

const Users = ({ users }) => {
  const userList = Object.keys(users).map( user => (
      <User user={user}/>
  ) );
  return (
    <div className="users dropdown-content">
      {userList}
    </div>
  );
};

export default Users;