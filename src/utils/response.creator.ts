import { Response } from "express";

const responseType: any = {
    200: {
        httpstatus: 200,
        message: "Successfully loaded data",
        type: "OK",
    },
    201: {
        httpstatus: 201,
        message: "Successfully created entry",
        type: "Created",
    },
    202: {
        httpstatus: 202,
        message: "Successfully accepted entry",
        type: "Accepted",
    },
    204: {
        httpstatus: 204,
        message: "There is no content available for the same",
        type: "No Content",
    },
    400: {
        httpstatus: 400,
        message: "Bad request",
        type: "Bad request",
    },
    401: {
        httpstatus: 401,
        message: "Unauthorized",
        type: "Unauthorized",
    },
    403: {
        httpstatus: 403,
        message: "Forbidden",
        type: "Forbidden",
    },
    404: {
        httpstatus: 404,
        message: "Request resource does not exist",
        type: "Not Found",
    },
    405: {
        httpstatus: 405,
        message: "Request method not allowed",
        type: "Method Not Allowed",
    },
    406: {
        httpstatus: 406,
        message: "Request resource is not acceptable",
        type: "Not Acceptable",
    },
    413: {
        httpstatus: 413,
        message: "File size limit exceeded",
        type: "Request entity too large",
    },
    500: {
        httpstatus: 500,
        message: "An unknown error occurred.",
        type: "Server Error",
    },
};

/**
 * GenerateResponse function returns a response from the express application in a templated form, filling with details passed as input params
 *
 * @param {Response} res Express Request object
 * @param {number} [code=200] Status code to be returned
 * @param {*} [result] Data to be passed in the response body
 * @param {string} [message=""] Addtional message to be passed in the response
 * @returns  {Response} Express Response object
 */
const GenerateResponse = (
    res: Response,
    code = 200,
    result: any = {},
    message = ""
): Response => {
    let newMessage = message;
    if (message === "") {
        newMessage = responseType[code].message;
    }
    return res.status(responseType[code].httpstatus).json({
        code,
        result,
        type: responseType[code].type,
        message: newMessage.toString(),
    });
};

export { GenerateResponse };
