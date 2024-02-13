import Document from "../schema/documentSchema.js";

export const getDocument = async (id) => {
  if (id === null) return;

  let document = await Document.findById(id);

  if (!document) {
    document = await Document.create({ _id: id, data: {} }); // Corrected to use an object for data
  }

  return document;
};

export const updateDocument = async (id, data) => {
  return await Document.findByIdAndUpdate(id, { data }, { new: true });
};
