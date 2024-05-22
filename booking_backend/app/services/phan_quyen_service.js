const { ObjectId } = require("mongodb");

class PhanQuyenService {
  constructor(client) {
    this.PhanQuyen = client.db().collection("phanquyen");
  }

  async createPhanQuyen(payload) {
    const phanQuyen = {
      phanquyen: payload.phanquyen,
    };

    const result = await this.PhanQuyen.insertOne(phanQuyen);
    return result;
  }

  async findPhanQuyen(filter) {
    const cursor = await this.PhanQuyen.find(filter);
    return await cursor.toArray();
  }

  async findPhanQuyenById(id) {
    return await this.PhanQuyen.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updatePhanQuyen(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        phanquyen: payload.phanquyen,
      },
    };
    const result = await this.PhanQuyen.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deletePhanQuyen(id) {
    const result = await this.PhanQuyen.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllPhanQuyen() {
    const result = await this.PhanQuyen.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = PhanQuyenService;
