import mongoose from "mongoose";

const phonebookSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Phonebook = mongoose.model("Phonebook", phonebookSchema);
