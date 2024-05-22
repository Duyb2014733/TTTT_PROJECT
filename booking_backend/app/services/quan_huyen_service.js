const { ObjectId } = require("mongodb");

class QuanHuyenService {
  constructor(client) {
    this.QuanHuyen = client.db().collection("quanhuyen");
  }

  async createQuanHuyen(payload) {
    const quanHuyen = {
      tenquanhuyen: payload.tenquanhuyen,
    };

    const result = await this.QuanHuyen.insertOne(quanHuyen);
    return result;
  }

  async findQuanHuyen(filter) {
    const cursor = await this.QuanHuyen.find(filter);
    return await cursor.toArray();
  }

  async findQuanHuyenById(id) {
    return await this.QuanHuyen.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateQuanHuyen(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        tenquanhuyen: payload.tenquanhuyen,
      },
    };
    const result = await this.QuanHuyen.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteQuanHuyen(id) {
    const result = await this.QuanHuyen.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllQuanHuyen() {
    const result = await this.QuanHuyen.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = QuanHuyenService;
