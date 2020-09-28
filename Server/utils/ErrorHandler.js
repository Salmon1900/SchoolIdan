
class ErrorHandle extends Error {
    add(errMessage){
        this.message = this.message.concat(`\n ${errMessage}`);
    }
}

module.exports = ErrorHandle;