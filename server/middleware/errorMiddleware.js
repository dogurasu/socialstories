const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalURL}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    // set error to be 500 is response's status code is 200, else 'error' is set to 'res.statusCode'
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // set res.status to whatever the code is
    res.status(statusCode);
    res.json({message: err.message, stack: process.env.NODE_ENV === 'product' ? null : err.stack});
}

export { notFound, errorHandler }