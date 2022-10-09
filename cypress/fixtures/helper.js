class Request {
    static method = 'POST'
    constructor (options) {
        this.method = Request.method;
        this.url = options.url;
        this.headers = options.headers;
        this.body = options.body;
    }
}
class Wrongrequest extends Request {
    constructor (options) {
        super(options)
        this.failOnStatusCode = options.failOnStatusCode
    }
}
module.exports = { Request, Wrongrequest }