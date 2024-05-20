const { ObjectId } = require("mongodb");

class ViTriGheService {
  constructor(client) {
    this.ViTriGhe = client.db().collection("vitrighe");
  }

  async createViTriGhe(payload) {
    const viTriGhe = {
      tenvitri: payload.tenvitri,
      trangthai: payload.trangthai,
    };

    const result = await this.ViTriGhe.insertOne(viTriGhe);
    return result;
  }

  async findViTriGhe(filter) {
    const cursor = await this.ViTriGhe.find(filter);
    return await cursor.toArray();
  }

  async findViTriGheById(id) {
    return await this.ViTriGhe.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async updateViTriGhe(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        tenvitri: payload.tenvitri,
        trangthai: payload.trangthai,
      },
    };
    const result = await this.ViTriGhe.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteViTriGhe(id) {
    const result = await this.ViTriGhe.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAllViTriGhe() {
    const result = await this.ViTriGhe.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = ViTriGheService;
