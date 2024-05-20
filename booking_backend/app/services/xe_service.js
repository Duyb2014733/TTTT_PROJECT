const { ObjectId } = require("mongodb");

class XeService {
  constructor(client) {
    this.Xe = client.db().collection("xe");
  }

  async createXe(payload) {
    const xe = {
      bienso: payload.bienso,
      tenxe: payload.tenxe,
    };

    const result = await this.Xe.insertOne(xe);
    return result;
  }

  async findXe(filter) {
    const cursor = await this.Xe.find(filter);
    return await cursor.toArray();
  }

  async findXeById(id) {
    return await this.Xe.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateXe(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        bienso: payload.bienso,
        tenxe: payload.tenxe,
      },
    };
    const result = await this.Xe.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteXe(id) {
    const result = await this.Xe.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllXe() {
    const result = await this.Xe.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = XeService;
