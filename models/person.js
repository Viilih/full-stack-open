import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  phoneNumber: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: (number) => /^\d{2,3}-\d+$/.test(number),
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.number = returnedObject.phoneNumber;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.phoneNumber;
  },
});

export const Person = mongoose.model("Phonebook", personSchema);
