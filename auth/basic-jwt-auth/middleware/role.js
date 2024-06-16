const role =
    (roles = []) =>
    async (req, res, next) => {
        let hasRole = false;

        roles.forEach((role) => {
            if (req.user.roles.indexOf(role) !== -1) {
                hasRole = true;
            }
        });

        if (hasRole) {
            next();
        } else {
            res.status(403).json({
                message: `Only ${roles.join(
                    ','
                )} is able to call this endpoint.`
            });
        }
    };

module.exports = role;
