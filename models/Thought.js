const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: Schema.Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        username: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now(),
          get: createdAtVal => dateFormat(createdAtVal)
      }
  },
  {
    toJSON: {
      getters: true
    },
     // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }, 

);
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      requierd: true,
      minlenght: 1,
      maxlenght: 280,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },

    username: {
      type: String,
      required: true,
      ref: "User",
    },
    reactions: [ReactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of reactions on retrieval
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//Create the Model for Thought
const Thought = model("Thought", ThoughtSchema);


module.exports = Thought;