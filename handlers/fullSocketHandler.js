const sendGift = require("../services/lucky_gift_services/sendGift");



fullSocketHandler = (io, socket, userId)=>{
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("luckygiftTransaction", async (data, callback)=>{
       let data = await sendGift(data, io, socket);
        
    });
    

    
}

module.exports = {fullSocketHandler};