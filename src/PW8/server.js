const PROTO_PATH = "./tasks.proto";

var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

var tasksProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();

const tasks = [
    {
        id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        title: "Забрать заказ",
        time: "10:30"
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
        title: "Погулять с собакой",
        time: "11:00"
    }
];

server.addService(tasksProto.TaskService.service, {
    getAll: (_, callback) => {
        callback(null, { tasks });
    },

    get: (call, callback) => {
        let task = tasks.find(n => n.id == call.request.id);
        if (task) {
            callback(null, task);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Не найдено"
            });
        }
    },

    insert: (call, callback) => {
        let task = call.request;
        task.id = uuidv4();
        tasks.push(task);
        callback(null, task);
    },

    update: (call, callback) => {
        let existingTask = tasks.find(n => n.id == call.request.id);
        if (existingTask) {
            existingTask.title = call.request.title;
            existingTask.time = call.request.time;
            callback(null, existingTask);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Не найдено"
            });
        }
    },

    remove: (call, callback) => {
        let existingTaskIndex = tasks.findIndex(
            n => n.id == call.request.id
        );
        if (existingTaskIndex != -1) {
            tasks.splice(existingTaskIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(`Ошибка при запуске сервера: ${err}`);
    } else {
        console.log(`Сервер запущен по адресу http://127.0.0.1:${port}`);
        server.start();
    }
});

