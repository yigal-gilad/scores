var mongoose = require('mongoose');

var schema = mongoose.Schema;

var tournamentSchema = new schema({
    publishDate: {
        type: String,
        required: [true, "missing field publishDate"]
    },
    title: {
        type: String,
        required: [true, "missing field title"]
    },
    description: {
        type: String,
        required: [true, "missing field description"]
    },
    mainImage: {
        type: String,
        required: [true, "missing field mainImage"]
    },
    images: {
        type: Array,
        required: [true, "missing field images"]
    },
    price: {
        type: Number,
        required: [true, "missing field price"]
    },
    oldPrice: {
        type: Number,
        required: [true, "missing field oldPrice"]
    },
    discountPresent: {
        type: Number,
        required: [true, "missing field discountPresent"]
    },
    shippingPrice: {
        type: Number,
        required: [true, "missing field shippingPrice"]
    },
    shippingTime: {
        type: Number,
        required: [true, "missing field shippingTime"]
    },
    shippingFrom: {
        type: String,
        required: [true, "missing field shippingFrom"]
    },
    shippingLimit: {
        type: Array,
        required: [true, "missing field shippingLimit"]
    },
    // paymentCurrency: {
    //     type: String,
    //     required: [true, "missing field paymentCurrency"]
    // },
    condition: {
        type: String,
        required: [true, "missing field condition"]
    },
    isEvedible: {
        type: Boolean,
        required: [true, "missing field isEvedible"]
    },
    keyWords: {
        type: String,
        required: [true, "missing field keyWords"]
    },
    stock: {
        type: Number,
        required: [true, "missing field stock"]
    },
    sold: {
        type: Number,
        required: [true, "missing field sold"]
    },
    unique: {
        type: Number,
        required: [true, "missing field unique"]
    },
})

var tournament = mongoose.model('products', tournamentSchema, 'products');

module.exports = tournament;
