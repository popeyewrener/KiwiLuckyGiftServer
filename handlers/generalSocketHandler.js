
generalSocketHandler = (io, socket)=>{
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    


}

module.exports = {generalSocketHandler};