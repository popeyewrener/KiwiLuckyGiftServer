

const clientio = require('socket.io-client');
const { getConfig, calculateRewardMultiplier } = require('../../utils/getConfig');
let socketclient = clientio('http://gamecoin.kiwishortvideo.com');

socketclient.on('connect', () => {
    console.log('Connected to Socket.IO server');
    
  });
  
  // Handle initial connection error
  socketclient.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });
  
  // Handle connection timeout
  socketclient.on('connect_timeout', () => {
    console.error('Connection timeout');
  });
  
const sendGift = async (data, io, socket, baseIO) => {
    const { roomId, giftName, giftImageUrl, giftPrice, recieverId, senderId, type , roomOwner } = data;
    if (!roomId || !giftName || !giftImageUrl || !giftPrice || !recieverId || !senderId || !type || !roomOwner) {
        const missingFields = [];
        if (!roomId) missingFields.push('roomId');
        if (!giftName) missingFields.push('giftName');
        if (!giftImageUrl) missingFields.push('giftImageUrl');
        if (!giftPrice) missingFields.push('giftPrice');
        if (!recieverId) missingFields.push('recieverId');
        if (!senderId) missingFields.push('senderId');
        if (!type) missingFields.push('type');
        if (!roomOwner) missingFields.push('roomOwner');

        console.error('Missing required fields:', missingFields);

        return { status: 'error', message: 'Missing required fields' };
    }

    const configdata  = await getConfig();
    const dealerProfitPercentage = configdata.dealerProfitPercentage;
    const dealerProfitratio = dealerProfitPercentage / 100;
    
    const response = new Promise(async (resolve, reject) => {

        const sid = senderId;
        const rid = recieverId;

        const datatosocket =  {"amount":giftPrice,
        "dealer_profit_percentage": dealerProfitPercentage,
         "senderId": sid,
          "recieverId":rid,
           "giftName": giftName,
            "giftUrl":giftImageUrl,
             "roomId": roomId,
              "roomOwner": roomOwner,
               "type": type};
              console.log(datatosocket);

             
                
        await socketclient.emit   ( 'luckygiftTransaction', datatosocket, function (ackData) {

             console.log('Acknowledgment from server:', ackData);
            // console.log('Acknowledgment from server:', ackData);
            if (ackData["success_id"]==undefined){
                reject(new Error("Insufficient balance"));
                return
            }


            configdata.totalDealerCommision += giftPrice * 0.7;
            configdata.totalStreamerCommision += giftPrice *0.3;
            configdata.totalSentGifts +=  giftPrice;
            configdata.save().then(() => {
                console.log('Config updated');

                const random_multiplier = calculateRewardMultiplier(configdata.multiplierProbabilities) // Random number between 1 and 10
                 
                const iseligibleforlottery = Math.floor(Math.random() * 100) < 25; //20 percent chance of winning lottery
                if (iseligibleforlottery) {
                    console.log("eligible for lottery");

                             if (((configdata.totalDealerCommision / configdata.totalSentGifts)*100)> (dealerProfitPercentage ) &&
                (configdata.totalDealerCommision > (dealerProfitratio*configdata.totalSentGifts + (giftPrice * random_multiplier)))){
                    console.log("eligible for lottery inside");

                    configdata.totalLotteryPrize += giftPrice * random_multiplier;
                    configdata.totalDealerCommision -= giftPrice * random_multiplier;
                    configdata.save().then(async () => {
                        console.log('Config updated');
                        const datatolotteryserver = { "amount": giftPrice * random_multiplier, "winner": senderId, "roomId": roomId, "roomOwner": roomOwner, "type": type, "giftName": giftName, "giftUrl": giftImageUrl};

                       await socketclient.emit('luckygift_lottery_transaction', datatolotteryserver, function (ackData){
                            if (ackData["success_id"]==undefined){
                                reject(new Error("Lottery failed"));
                                return
                            }
                            console.log('Acknowledgment from server:', ackData);
                            
                            resolve({ 
                                "status":"success", 
                                "win": true,
                                "multiplier": random_multiplier, 
                                "giftPrice": giftPrice,
                                "lotteryPrize": giftPrice * random_multiplier, 
                                "giftName": giftName,
                                "giftUrl":giftImageUrl,
                                "roomId": roomId,
                                "roomOwner": roomOwner,
                                "type": type,
                                "winnerId": senderId,
                                "senderName": socket.name
                               });

                               baseIO.of("/general").emit('lucky_gift_receive',
                                JSON.stringify( { 
                                    "status":"success", 
                                    "win": true,
                                    "multiplier": random_multiplier, 
                                    "giftPrice": giftPrice,
                                    "lotteryPrize": giftPrice * random_multiplier, 
                                    "giftName": giftName,
                                    "giftUrl":giftImageUrl,
                                    "roomId": roomId,
                                    "roomOwner": roomOwner,
                                    "type": type,
                                    "winnerId": senderId,
                                    "senderName": socket.name
                                   })
                               );


                        } );

                        
                        

                    }).catch((error) => {
                        console.error('Error updating config:', error);
                    });

                    }
                    else{
                        resolve({ 
                            "status":"success", 
                            "win": false,
                            "multiplier": random_multiplier, 
                            "lotteryPrize": 0, 
                            "giftPrice": giftPrice,
                            "giftName": giftName,
                            "giftUrl":giftImageUrl,
                            "roomId": roomId,
                            "roomOwner": roomOwner,
                            "type": type,
                            "winnerId": senderId,
                            "senderName": socket.name
                           });

                           baseIO.of("/general").emit('lucky_gift_receive',
                           JSON.stringify({ 
                            "status":"success", 
                            "win": false,
                            "multiplier": random_multiplier, 
                            "giftPrice": giftPrice,
                            "lotteryPrize": 0, 
                            "giftName": giftName,
                            "giftUrl":giftImageUrl,
                            "roomId": roomId,
                            "roomOwner": roomOwner,
                            "type": type,
                            "winnerId": senderId,
                            "senderName": socket.name
                           })

                           );
                    }
                }
                else{
                    resolve({ 
                        "status":"success", 
                        "win": false,
                        "multiplier": random_multiplier, 
                        "giftPrice": giftPrice,
                        "lotteryPrize": 0, 
                        "giftName": giftName,
                        "giftUrl":giftImageUrl,
                        "roomId": roomId,
                        "roomOwner": roomOwner,
                        "type": type,
                        "winnerId": senderId,
                        "senderName": socket.name
                       });
                       baseIO.of("/general").emit('lucky_gift_receive', 
                        JSON.stringify({ 
                            "status":"success", 
                            "win": false,
                            "multiplier": random_multiplier, 
                            "giftPrice": giftPrice,
                            "lotteryPrize": 0, 
                            "giftName": giftName,
                            "giftUrl":giftImageUrl,
                            "roomId": roomId,
                            "roomOwner": roomOwner,
                            "type": type,
                            "winnerId": senderId,
                            "senderName": socket.name
                           })
                       );
                }


            }).catch((error) => {
                console.error('Error updating config:', error);

            });




        
           })
       // io.to(roomId).emit('recieveGift', { giftName, giftImageUrl, giftPrice, recieverId, senderId });
       //resolve({ status: 'success' });
    });
    
    return response;






    
};

module.exports = sendGift;