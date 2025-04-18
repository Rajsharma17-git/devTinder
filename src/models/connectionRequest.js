
const mongoose = require(`mongoose`);

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["ignored", "interested", "accepeted", "rejected"],
            message: `{VALUE} is incorrected status type`
        },
    },
},
{timestamps: true,}
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });



connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection to Yourself");
    }
    next();
});

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;