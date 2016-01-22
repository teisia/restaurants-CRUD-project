module.exports = {
  nameIsNotBlank: function(input) {
    return !input.trim() ? 'Name cannot be blank' : '';
  },
  cityIsValid: function(input) {
    return !input.trim() ? 'City cannot be blank' : '';
  },
  imageIsValid: function(input) {
    return !input.trim() ? 'Image is invalid' : '';
  },
  bioIsValid: function(input) {
    return !input.trim() ? 'Bio cannot be blank' : '';
  }
}
