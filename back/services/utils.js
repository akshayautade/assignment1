exports.createResponse = function (property, value, status, code, error) {
    var response = {};
    response.status = status;
    if (property)
        response[property] = value;
    else
        response['response'] = null;
    if (error) {

        response.error = error;

    } else {
        response.error = {}
        response.error.code = code != null ? code : 0;
        response.error.message = null;

    }

    return response;
}

exports.createErrorResponse = function (code, message) {
    var err = {};
    err.status ='Failed'
    err.response = null;
    err.error = {}
    err.error.code = code;
    err.error.message = message;
    return err;
}