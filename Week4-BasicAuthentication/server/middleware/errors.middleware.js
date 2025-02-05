// Handle 404 - Not Found
exports.error404 = function(req, res, next) {
    res.status(404).json({
      message: "Error 404: Route not found",
      status: 404
    });
  };
  
  // Handle 500 - Server Error
  exports.error500 = function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
      message: "Error 500: Internal server error",
      status: 500
    });
  };
  