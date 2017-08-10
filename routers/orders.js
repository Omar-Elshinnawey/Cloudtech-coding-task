const Order = require('../models/order'),
    router = require('express').Router(),
    routes = require('../routes');

function orderRouter(db) {
    var order = new Order(db);

    router.get(routes.get_orders_for_company, (req, res) => {
        order.getOrdersForCompany(req.params.company)
            .then(docs => {
                res.json({ message: 'success', result: docs });
            });
    });

    router.get(routes.get_orders_for_address, (req, res) => {
        order.getOrdersForAddress(req.params.address)
            .then(docs => {
                res.json({ message: 'success', result: docs });
            });
    });

    router.delete(routes.delete_order, (req, res) => {
        order.deleteOrder(req.params.id)
            .then(result => {
                res.json({ message: 'success', result: [] });
            });
    });

    router.get(routes.item_ordered_count, (req, res) => {
        order.getItemOrderCount()
            .then(docs => {
                res.json({ message: 'success', result: docs });
            });
    });

    return router;
}

module.exports = orderRouter;