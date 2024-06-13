const { fullSocketHandler } = require("../../handlers/fullSocketHandler");


class FullSocketController{
    constructor(io, baseIO){
        this.io = io;
        this.baseIO = baseIO;
        io.on("connection", (socket)=>{
           if (!socket.handshake.query.userId || !socket.handshake.query.name || socket.handshake.query.userId === 'null' || socket.handshake.query.name === 'null'){

                socket.disconnect(true);
                return;
            }
            const userId = socket.handshake.query.userId;
            const name = socket.handshake.query.name;
            const profilePic = socket.handshake.query.profilePic || null;
            
            //associate the user with the socket
            socket.userId = userId;
            socket.name = name;
            socket.profilePic = profilePic;
            socket.join(userId);
            console.log("Full namespace user connected");
            
            fullSocketHandler(io, socket, userId, baseIO);
            


            socket.on('disconnect', () => {
                console.log('Full namespace user disconnected');
            });
        })
        
    }


}

module.exports = FullSocketController;