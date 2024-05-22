const { ObjectId } = require("mongodb");

class TinhThanhService {
  constructor(client) {
    this.TinhThanh = client.db().collection("tinhthanh");
  }

  async createTinhThanh(payload) {
    const tinhThanh = {
      tentinh: payload.tentinh,
    };

    const result = await this.TinhThanh.insertOne(tinhThanh);
    return result;
  }

  async findTinhThanh(filter) {
    const cursor = await this.TinhThanh.find(filter);
    return await cursor.toArray();
  }

  async findTinhThanhById(id) {
    return await this.TinhThanh.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateTinhThanh(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        tentinh: payload.tentinh,
      },
    };
    const result = await this.TinhThanh.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteTinhThanh(id) {
    const result = await this.TinhThanh.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllTinhThanh() {
    const result = await this.TinhThanh.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = TinhThanhService;
