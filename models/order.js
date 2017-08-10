const ObjectId = require('mongodb').ObjectID;
const COLLECTION_NAME = 'orders';

/**
 * Handels all database operations for the orders collection
 * @param {Db} db The mongodb database object
 */
function Order(db) {
    this.collection = db.collection(COLLECTION_NAME);
}

/**
 * Gets all orders for the specified company
 * @param {string} companyName The name of the company
 * @returns {Promise}
 */
Order.prototype.getOrdersForCompany = function(companyName) {
    return this.collection.find({ companyName: companyName })
        .project({ companyName: 1, customerAddress: 1, orderedItem: 1 })
        .toArray();
}

/**
 * Gets all orders to the specified address
 * @param {string} address The customer address
 * @returns {Promise}
 */
Order.prototype.getOrdersForAddress = function(address) {
    return this.collection.find({ customerAddress: address })
        .project({ companyName: 1, customerAddress: 1, orderedItem: 1 })
        .toArray();
}

/**
 * Deletes the order with the specified id
 * @param {string} id The order id
 * @returns {Promise}
 */
Order.prototype.deleteOrder = function(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
}

/**
 * Gets how many times an item was ordered
 * @returns {Promise}
 */
Order.prototype.getItemOrderCount = function() {
    return this.collection.aggregate([{
            $group: { _id: '$orderedItem', 'count': { $sum: 1 } }
        },
        {
            $project: { _id: 0, item: '$_id', count: '$count' }
        },
        {
            $sort: { count: -1 }
        }
    ]).toArray();
}

module.exports = Order;