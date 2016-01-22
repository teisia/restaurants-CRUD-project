module.exports = {
  nameIsNotBlank: function(input) {
    return !input.trim() ? 'Name cannot be blank' : '';
  },
  cityIsNotBlank: function(input) {
    return !input.trim() ? 'City cannot be blank' : '';
  },
  imageIsNotBlank: function(input) {
    return !input.trim() ? 'Image cannot be blank' : '';
  },
  bioIsNotBlank: function(input) {
    return !input.trim() ? 'Bio cannot be blank' : '';
  },
  firstNameIsNotBlank: function(input) {
    return !input.trim() ? 'First name cannot be blank' : '';
  },
  lastNameIsNotBlank: function(input) {
    return !input.trim() ? 'Last name cannot be blank' : '';
  }
}
