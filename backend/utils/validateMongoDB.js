const asyncHandler = require("express-async-handler");
const getoneUser = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    validateMongoDbId(id); 
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    validateMongoDbId(id);
  
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    validateMongoDbId(id); 
    
});


