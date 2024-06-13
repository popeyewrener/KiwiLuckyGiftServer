const { generalSocketHandler } = require("../../handlers/generalSocketHandler");

class GeneralSocketEntryController{




constructor(io){
    this.io = io;

    io.on("connection", (socket)=>{
        console.log("General namespace user connected");
        generalSocketHandler(io, socket);
        socket.on('disconnect', () => {
            console.log('general namespace user disconnected');
        });
        

    })

}
}

module.exports = GeneralSocketEntryController;