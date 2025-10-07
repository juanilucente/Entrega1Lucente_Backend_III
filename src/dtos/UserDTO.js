
class UserDTO {
  constructor({ _id, firstName, lastName, email, role, createdAt }){
    this.id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }
}

module.exports = UserDTO;