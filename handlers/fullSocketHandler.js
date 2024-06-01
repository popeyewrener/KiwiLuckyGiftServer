const sendGift = require("../services/lucky_gift_services/sendGift");



fullSocketHandler = (io, socket, userId, baseIO)=>{
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("lucky_gift", async(data, callback)=>{
        console.log(data);

        callback({"error":"error"});
        baseIO.of("/general").emit("lucky_gift", {"status":"success", 
        "win": true,
        "multiplier": 3, 
        "giftPrice": 100,
        "lotteryPrize": 100 * 3, 
        "giftName": "giftName",
        "giftUrl":"giftImageUrl",
        "roomId": "test",
        "roomOwner": 111,
        "type": "audio",
        "winnerId": 121});
    })

    socket.on("luckygiftTransaction", async (data, callback)=>{
       try{
        const response = await sendGift(data, io, socket, baseIO);

        callback(response);
       }
       catch(err){
           console.log(err);
           callback({status: "error", message: err.message});
       }
        
    });
    

    
}

module.exports = {fullSocketHandler};