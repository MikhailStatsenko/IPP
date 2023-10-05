const PROTO_PATH = "../tasks.proto"

const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const TaskService = grpc.loadPackageDefinition(packageDefinition).TaskService;

const client = new TaskService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

module.exports = client;


