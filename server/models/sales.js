var mongoose = require('mongoose');

var schema = mongoose.Schema;

var salesSchema = new schema({
    date: {
        type: String,
        required: [true, "date field is missing"]
    },
    sum: {
        type: Number,
        required: [true, "sum field is missing"]
    },
})

var sales = mongoose.model('sales', salesSchema, 'sales');

module.exports = sales;