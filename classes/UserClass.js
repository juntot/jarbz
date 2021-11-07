
class UserClass{
  // `findByEmail()` becomes a static
  static async findByEmail(email) {
    return this.findOne(email).lean();
  }
}
module.exports = UserClass;