import Invoices from '../models/invoice.model';
import joi from '@hapi/joi';

const invoices = [
  { _id: 'aaaa', item: 'Amazon Product', qty: 10 },
  { _id: 'bbbb', item: 'Google Product', qty: 10 },
  { _id: 'cccc', item: 'Linked In Product', qty: 10 }
];

export default {
  findAll(req, res) {
    Invoices.find()
      .then(docs => {
        res.status(200).json({ message: 'all invoices', data: docs });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },
  create(req, res) {
    let result = req.body;
    const schema = joi.object().keys({
      item: joi.string().required(),
      date: joi.date().required(),
      due: joi.number().required(),
      qty: joi.number().required(),
      tax: joi.number().optional(),
      rate: joi.number().optional()
    });
    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).json({ error: error });
    }
    Invoices.create(value)
      .then(invoice => {
        return res.status(200).json({ data: invoice });
      })
      .catch(err => {
        return res.status(500).json({ message: 'Internal Server Error' });
      });
  },
  update(req, res) {
    let result = req.body;
    const schema = joi.object().keys({
      item: joi.string().optional(),
      date: joi.date().optional(),
      due: joi.number().optional(),
      qty: joi.number().optional(),
      tax: joi.number().optional(),
      rate: joi.number().optional()
    });
    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).json({ error: error });
    }
    Invoices.findByIdAndUpdate({ _id: req.params.id }, value, { new: true })
      .then(invoice => {
        return res.status(200).json({ data: invoice });
      })
      .catch(err => {
        return res.status(500).json({ error: err });
      });
  },
  findId(req, res) {
    let id = req.params.id;
    console.log(id);
    Invoices.findById(id)
      .then(doc => {
        return res.status(200).json({ data: doc });
      })
      .catch(err => {
        return res.status(500).json({ error: err });
      });
  },
  deleteId(req, res) {
    let id = req.params.id;
    console.log(id);
    Invoices.findByIdAndDelete(id)
      .then(doc => {
        return res.status(200).json({ data: doc });
      })
      .catch(err => {
        return res.status(500).json({ error: err });
      });
  }
};
