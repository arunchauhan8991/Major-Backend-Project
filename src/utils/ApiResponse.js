// This code defines a custom API response wrapper class called ApiResponse. 
// It's commonly used in REST APIs (like in Express.js) to ensure that every successful response has a consistent structure.

class ApiResponse {
    constructor (statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400  
    }
}