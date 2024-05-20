const { ObjectId } = require("mongodb");

class VeXeService {
  constructor(client) {
    this.VeXe = client.db().collection("vexe");
  }

  async createVeXe(payload) {
    const veXe = {
      tenvexe: payload.tenvexe,
    };

    const result = await this.VeXe.insertOne(veXe);
    return result;
  }

  async findVeXe(filter) {
    const cursor = await this.VeXe.find(filter);
    return await cursor.toArray();
  }

  async findVeXeById(id) {
    return await this.VeXe.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateVeXe(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        tenvexe: payload.tenvexe,
      },
    };
    const result = await this.VeXe.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteVeXe(id) {
    const result = await this.VeXe.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllVeXe() {
    const result = await this.VeXe.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = VeXeService;
