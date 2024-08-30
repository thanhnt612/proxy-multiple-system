let io;

const socketService = {
  init(httpServer) {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: "*", // Cần bảo mật bằng cách thay thế * bằng domain cụ thể
        methods: ["GET", "POST"],
      },
      pingTimeout: 60000, // Thời gian chờ trước khi ngắt kết nối nếu không nhận được phản hồi từ client
      pingInterval: 25000, // Khoảng thời gian gửi tín hiệu ping từ server đến client
    });

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  },

  emitNewOrder(orderDetails) {
    io.emit("new_order", orderDetails);
  },

  emitConfigUpdated(configDetails) {
    io.emit("config_updated", configDetails);
  }
};

module.exports = socketService;
