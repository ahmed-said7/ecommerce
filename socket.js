let socket=(io)=>{

    let onlinUsers=[];
    
    io.on('connection',(socket)=>{


        socket.on('user-join',(data)=>{
            let {userId} = data;
            onlinUsers.push({ userId , socketId:socket.id });
        });



        socket.on('disconnect',()=>{
            onlinUsers=onlinUsers.filter( val => val.socketId != socket.id)
        });
        


        socket.on('client-message',(data)=>{
            let {recipient}=data;
            let online_recipient=onlinUsers.filter((val)=> recipient.includes(val.userId));
            online_recipient.forEach((recipient)=>{
                io.to(recipient.socketId).emit('server-message',data.message);
                io.to(recipient.socketId).emit('server-notification',data.message);
            });
        });
        


        socket.on('typing',(data)=>{
            let {recipient}=data;
            let online_recipient=onlinUsers.filter((val)=> recipient.includes(val.userId));
            online_recipient.forEach((recipient)=>{
                io.to(recipient.socketId).emit('typing', {event:'typing'} );
            });
        });

        

        socket.on('join-room',(data)=>{
            let {chatCode}=data;
            socket.join(chatCode);
            io.in(chatCode).emit('client-join-room',{event:"join-chat-room"})
        });


        socket.on('send-room-message',(data)=>{
            let {chatCode}=data;
            io.to(chatCode).emit('chat-room-message',data);
        });

    });
};


module.exports = socket;