const { generalSocketHandler } = require("../../handlers/generalSocketHandler");

class GeneralSocketEntryController{




constructor(io){
    this.io = io;

    io.on("connection", (socket)=>{
        generalSocketHandler(io, socket);
        

    })
}
}

module.exports = GeneralSocketEntryController;