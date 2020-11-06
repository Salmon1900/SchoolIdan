class ErrorHandle extends Error {
  add(errMessage) {
    this.message = this.message.concat(`| ${errMessage} |`);
  }
}

module.exports = ErrorHandle;
