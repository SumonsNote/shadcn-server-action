const { replaceMongoIdInArray } = require("@/lib/transform");
const { Subscriber } = require("../model/subs-model");

export async function getSubscribers() {
  try {
    const subscribers = await Subscriber.find({}).lean();
    return replaceMongoIdInArray(subscribers);
  } catch (error) {
    throw new Error(error.message);
  }
}
