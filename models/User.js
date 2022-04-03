const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    // set custom ID so there is no confusion with parent comment _id
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        //email regex for validation
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Valid email address required",
      ],
      trim: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicates of _id as `id`
    id: false,
  }
);


//Add virtual for the Friend Count
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});


//Create Model For The User
const User = model("User", UserSchema);

module.exports = User;