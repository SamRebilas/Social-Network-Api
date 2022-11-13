const mongoose = require("mongoose");
const moment = require("moment")
const respondSchema = new Schema({
    respondName: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },

respondBody: {
    type: String,
    required: true,
},
username: {
    type: String,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
         moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
},
}
})

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, 
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (date) => {
            moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
          },
        },
        username: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        respond: [respondSchema],
      },
      { toJSON: { virtuals: true, getters: true }, id: false }
    );
    thoughtSchema.virtual("respondCount").get(function () {
      return this.respond.length;
    }
)



const thought = model("thought", thoughtSchema)
module.exports = thought