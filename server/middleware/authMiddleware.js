const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log("Authorization header received:", Boolean(authorization));
console.log(
  "Bearer prefix valid:",
  Boolean(authorization?.startsWith("Bearer "))
);

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
  issuer: "shopnest-api",
  audience: "shopnest-client",
});

console.log("JWT verification successful");
console.log("User ID exists:", Boolean(decoded.userId));

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };
    console.log("Authenticated user exists:", Boolean(req.user.id));

    next();
  } catch (error) {
  console.error("JWT verification error:", error.message);

  return res.status(401).json({
    success: false,
    message: "Invalid or expired token",
    });
  }
};

module.exports = { protect };