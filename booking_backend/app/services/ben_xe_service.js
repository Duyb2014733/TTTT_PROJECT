const { ObjectId } = require("mongodb");

class BenXeService {
  constructor(client) {
    this.BenXe = client.db().collection("benxe");
  }

  async createBenXe(payload) {
    const benXe = {
      tenben: payload.tenben,
      diachi: payload.diachi,
      sdt_bx: payload.sdt_bx,
    };

    const result = await this.BenXe.insertOne(benXe);
    return result;
  }

  async findBenXe(filter) {
    const cursor = await this.BenXe.find(filter);
    return await cursor.toArray();
  }

  async findBenXeById(id) {
    return await this.BenXe.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateBenXe(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        tenben: payload.tenben,
        diachi: payload.diachi,
        sdt_bx: payload.sdt_bx,
      },
    };
    const result = await this.BenXe.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteBenXe(id) {
    const result = await this.BenXe.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllBenXe() {
    const result = await this.BenXe.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = BenXeService;
