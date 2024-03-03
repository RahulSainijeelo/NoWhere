class ExpressError extends Error {
    constructor(status, message, title) {
        super();
        this.status = status;
        this.message = message;
        this.title = title;
    }
};

module.exports = ExpressError;