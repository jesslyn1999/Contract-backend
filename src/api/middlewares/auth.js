export const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send();
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send();
    }

    if (req.user.role !== 'admin') {
        return res.status(401).send();
    }
    next();
};
