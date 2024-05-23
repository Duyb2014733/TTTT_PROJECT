const mongoose = require("mongoose");

const xeSchema = new mongoose.Schema({
  bienso: {
    type: String,
    required: true,
  },
  tenxe: {
    type: String,
    required: true,
  },
});

const Xe = mongoose.model("Xe", xeSchema);

class XeService {
  async createXe(payload) {
    const xe = new Xe({
      bienso: payload.bienso,
      tenxe: payload.tenxe,
    });

    const result = await xe.save();
    return result;
  }

  async findXe(filter) {
    const results = await Xe.find(filter).exec();
    return results;
  }

  async findXeById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const result = await Xe.findById(id).exec();
    return result;
  }

  async updateXe(id, payload) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const result = await Xe.findByIdAndUpdate(
      id,
      {
        bienso: payload.bienso,
        tenxe: payload.tenxe,
      },
      { new: true }
    ).exec();
    return result;
  }

  async deleteXe(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const result = await Xe.findByIdAndDelete(id).exec();
    return result;
  }

  async deleteAllXe() {
    const result = await Xe.deleteMany({}).exec();
    return result.deletedCount;
  }
}

module.exports = XeService;
