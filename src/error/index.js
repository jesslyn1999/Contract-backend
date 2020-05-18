class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        Error.captureStackTrace(this, NotFoundError);
    }
}

const ErrorToResponseMapper = err => {
    if (err instanceof NotFoundError) {
        return {
            status: 400,
            payload: {
                success: false,
                message: err.message,
            },
        };
    } else {
        return {
            status: 500,
            payload: {
                success: false,
                message: 'Internal server error',
            },
        };
    }
};

export { NotFoundError, ErrorToResponseMapper };
